const {databaseconnection} = require ('./conexao')

async function cadastrar(registration){
    const insertdados = {
        campo: registration.campo,
        email: registration.email,
        senha: registration.senha,
        
        
    }

    const result = await databaseconnection('tabela').insert(insertdados)

    if(result) {
        return {
            
            campo: registration.campo,
            email: registration.email,
            senha: registration.senha,
            
            id: result[0],
        }
    }else {
        console.log("deu erro")
    }
}

module.exports = {cadastrar}