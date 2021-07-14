import styled from 'styled-components'
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `
function ProfileSidebar({imgProfile}) {
  return (
    <Box>
      <img src={`https://github.com/${imgProfile}.png`} style={{borderRadius: '8px'}}/>
    </Box>
  )
}


export default function Home() {
  const imgProfile = 'bryanmaraujo544'
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
    ]
  return (
    <>
      <AlurakutMenu/>
      <MainGrid >
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar imgProfile={imgProfile}/>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet/>
          </Box>
        </div>
        <div style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({pessoasFavoritas.length})
              </h2>

              <ul>
                { pessoasFavoritas.map((pessoa) => {
                  return (
                    <li>
                      <a href={`/user/${pessoa}`} key={itemAtual}>
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
