import { useState, useRef } from 'react'
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
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


export default function Home() {
  const [communities, setCommunities] = useState( [{
    id: '4343439u3',
    title: "Eu odeio acordar cedo",
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }] )
  const githubUser = 'bryanmaraujo544'
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [seeMore, setSeeMore] = useState(false)
    
    
  
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

              const community = {
                id: new Date().toISOString(),
                title: formData.get('title').trim(),
                image: formData.get('image').trim(),
              }

              if(community.title !== "" && community.image !== ""){
                setCommunities([...communities, community])
              } else {
                alert("Não deixe nenhum campo vazio")
              }
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
        <div style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            
            <ul>
              { 
                
                communities.map((community, i) => {
                  console.log(community.image)
                
                  if(i <= 5 && seeMore == false){
                    return (
                      <li key={community.id}>
                        <a href={`/user/${community.name}`}>
                          <img src={community.image} />
                          <span> 
                            {community.title}
                          </span>
                        </a>
                      </li>
                      
                    )
                  } else if(seeMore){
                    return (
                      <li key={community.id} style={{zIndex: '1'}}>
                        <a href={`/user/${community.name}`}>
                          <img src={community.image} />
                          <span> 
                            {community.title}
                          </span>
                        </a>
                      </li>
                      
                    )
                  }
                  
                
                }) 
              
              }
            </ul>
            
            {communities.length > 6 && seeMore == false && <p onClick={() => setSeeMore(true)} className="seemore">Ver mais</p>}
            {seeMore == true && <p onClick={() => setSeeMore(false)} className="seemore" >Ver menos</p>}

            
      </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({pessoasFavoritas.length})
              </h2>

              <ul>
                { pessoasFavoritas.map((pessoa) => {
                  return (
                    <li key={pessoa}>
                      <a href={`/user/${pessoa}`} >
                        <img src={`https://github.com/${pessoa}.png`} />
                        <span> 
                          {pessoa}
                        </span>
                      </a>
                    </li>
                    
                  )
                }) }
              </ul>
            </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
