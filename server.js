
const express = require('express');
const bodyparser = require('body-parser')
//const mysql = require("mysql")
const path = require('path');
//const cadastro = require('./models/db');
/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Marcelo83',
    database: 'login',
})*/
const initial_path = path.join(__dirname, "public");
const app = express();
const db = require('./public/js/db');
const { databaseconnection } = require('./public/js/conexao');
const yup = require('yup');

app.use(express.static(initial_path));

app.use(bodyparser.urlencoded ({extended: false}))

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})



app.post('/tabela', async (req, res) => {
   /*const cadastrando = await db.cadastrar ({
        campo: req.body.campo,
        email: req.body.email,
        senha: req.body.senha,
        
    })/*.then(function(){
        // res.redirect('/')*/
     //})

    //res.send(cadastrando) 
    const testing = yup.object().shape({
        campo: yup.string("erro: prencher o campo nome")
        .required("erro: necessario prencher o campo nome"),
        email: yup.string("Erro: necessario prencher o campo email")
        .required("Erro: necessario prenche o campo email")
        .email("Erro: necessario preencher o campo com email valido"),
        senha: yup.string("Erro: necessario prencher o campo senha")
        .required("Erro: necessario prencher o campo senha")
        .min(6, "Erro: a senha deve ter no minimo 6 caracteres")
    });

    try{
        await testing.validate(req.body);
    }catch(err){

        return res.status(400).json({   
            erro: true,
            mensagem: err.errors
        })
    } 
   if (erro = false){
       res.redirect('/')
    }
    })






//res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>")

/*app.use((req, res) => {
    res.json("404");
})*/

app.listen(3000, () => {
    console.log('listening on port 3000......');
})