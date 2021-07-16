// Código BFF - Backend for Fron End
// Código para baixar dato yarn add datocms-client
import { SiteClient } from 'datocms-client'

// Quando alguém acessar essa URL (api/communities), o response mandará um json
export default async function recebedorDeRequest(request, response) {

    // Vejo se quando a página de api for acessada tiver com método POST, 
    // Assim será possível realizar modificações
    if(request.method === 'POST'){
        const TOKEN = 'cb027e07dcf0a25d3bd99767f065b4'
        console.log(TOKEN) // Não aparecerá no navegador, somente no servidor(next)

        const client = new SiteClient(TOKEN)

        const registerCreated = await client.items.create({
            // Id do modelo no Dato (Community)
            itemType: "971831",
            // Pego o request do usuário e acesso o body, que são as informações que ele deseja enviar
            ...request.body
        })
        response.json({
            dados: 'Algum dado qualquer',
            registerCreated: registerCreated
        })

        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET< mas no POST tem!"
    })

    
}