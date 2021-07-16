import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

export function RelationsBox({title, items, seeMoree, dispatch, wichButton}){
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitlefdf">
          {title} ({items.length})
        </h2>
  
        
        <ul>
          { 
            
            items.map((seguidor, i) => {
              
            
              if(i <= 5 && seeMoree[wichButton] == false){
                return (
                  <li key={seguidor.id}>
                    <a href={`/${title}/${seguidor.id}`}>
                      <img src={seguidor.avatar_url || seguidor.imageUrl || `https://github.com/${seguidor}.png`} />
                      <span> 
                        {seguidor.login || seguidor.title || seguidor}
                      </span>
                    </a>
                  </li>
                  
                )
              } else if(seeMoree[wichButton]){
                 return (
                   <li key={seguidor.id} style={{zIndex: '1'}}>
                     <a href={`/user/${seguidor.name}`}>
                       <img src={seguidor.avatar_url || seguidor.imageUrl || `https://github.com/${seguidor}.png`} />
                       <span> 
                         {seguidor.login || seguidor.title || seguidor}
                       </span>
                     </a>
                   </li>
                  
                 )
              }
              
            
            }) 
          
          }
        </ul>
        
        {items.length > 6 && !seeMoree[wichButton] && <p onClick={() => dispatch({wichButton: wichButton})} className="seemore">Ver mais</p>}
        {/* && seeMore == false && <p onClick={() => setSeeMore(true)}  */}
        {seeMoree[wichButton] == true && <p onClick={() => dispatch({wichButton: wichButton})} className="seemore" >Ver menos</p>}
  
      
      </ProfileRelationsBoxWrapper>
    )
}