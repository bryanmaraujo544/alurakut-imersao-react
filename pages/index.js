import { useState, useEffect, useReducer } from 'react'
import { MainGrid } from '../src/components/MainGrid'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import { Box } from '../src/components/Box'
import { RelationsBox } from '../src/components/RelationsBox'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `
function ProfileSidebar({githubUser}) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}



const seeMores = (state, action) => {
  switch(action.wichButton) {
    case 'community':
      return {
        community: !state.community,
        followers: state.followers,
        favoritePeople: state.favoritePeople
      };
    case 'followers': 
      return{
        community: state.community,
        followers: !state.followers,
        favoritePeople: state.favoritePeople

      }
    case 'favoritePeople': 
      return {
      community: state.community,
      followers: state.followers,
      favoritePeople: !state.favoritePeople
    }
  }
}

const initialValues = {
  community: false,
  followers: false,
  favoritePeople: false
}




export default function Home(props) {
  const [communities, setCommunities] = useState( [] )
  const githubUser = props.githubUser
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'kauan777'
  ]

  // Boolean para checar se o botão "Ver mais das comunidades foi apertado"
  const [seeMoree, dispatch] = useReducer(seeMores, initialValues)

  const [seguidores, setSeguidores] = useState([])
  useEffect(() => {
    // GET
    fetch('https://api.github.com/users/bryanmaraujo544/followers')
    .then(respostaDoServidor => {
      return respostaDoServidor.json();
    })
    .then(respostaCompleta => {
      setSeguidores(respostaCompleta)
    })

    // API GraphQl
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      // Onde é provida informações de requests e responses
      headers: {
        'Authorization': 'd8fa78f6e4ed042d3c94fb2965cf19',
        // Documentação Dato
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Corpo da nossa requisição
      body: JSON.stringify({"query": `
        query {
          allCommunities {
            title
            id 
            imageUrl
            creatorSlug
          }
        }
      ` })
    })
    .then(response => response.json())
    .then(responseJson => {
      const communitiesDatoApi = responseJson.data.allCommunities
      setCommunities(communitiesDatoApi)
      console.log("Comunidade:", communities)
      console.log("DadosApi", communitiesDatoApi)
    })
  }, [])

  

    
    
  
  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid >
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={ function handleCriaComunidade(event) {
              event.preventDefault()
              const formData = new FormData(event.target)

              // Objeto que será mandado para a API, com os mesmo nomes de props do modelo criado no DATO
              const community = {
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                creatorSlug: "uSER"
              }

              fetch('/api/communities', {
                method: 'POST',
                // Digo para o servidor que tipo de data estou enviando
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const dados = await response.json()
                const newCommunities = [...communities, dados.registerCreated]
                setCommunities(newCommunities)
              })
              

              // if(community.title !== "" && community.image !== ""){
              //   setCommunities([...communities, community])
              // } else {
              //   alert("Não deixe nenhum campo vazio")
              // }
            } }>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
              
              
              
              
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <RelationsBox title="Seguidores" items={seguidores} seeMoree={seeMoree} dispatch={dispatch} wichButton="followers"/>
          <RelationsBox title="Comunidades" items={communities} seeMoree={seeMoree} dispatch={dispatch} wichButton="community"/>
          <RelationsBox title="Pessoas da comunidade" items={pessoasFavoritas} seeMoree={seeMoree} dispatch={dispatch} wichButton="favoritePeople"/>
        </div>
      </MainGrid>
    </>
  )
}

// Está rodando no servidor do Next, e antes da página carregar ele será acionado
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  console.log('cookies', cookies)
  const token = cookies.USER_TOKEN
  console.log('token', token)
  
  console.log(token)
  
  // // Desestrutro a propriedade que é rotornada do objeto da promise
  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then(resposta => resposta.json())
  
  

  
  if(!isAuthenticated){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
    
  }
  
  const {githubUser} = jwt.decode(token)
  console.log("User", githubUser)

  // Faço o decode do token para acessar suas informaçoes
  return {
    props: {
      // Se o nome da propriedade e valor for o mesmo  posso deixar só um
      // githubUser: githubUser
      githubUser
    }, // will be passsed to the page component as props
  }
}
