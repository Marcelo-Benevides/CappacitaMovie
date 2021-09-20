const express = require('express');
const bodyparser = require('body-parser')
const { db } = require('./public/js/db')
const path = require('path');
const initial_path = path.join(__dirname, "public");
const app = express();
const { databaseconnection } = require('./public/js/conexao');
const yup = require('yup');
const session = require('express-session');
const bcrypt = require('bcrypt');


app.use(session({
    secret: 'ABCDefg',
    resave: false,
    saveUninitialized : true
}));    






app.use(express.static(initial_path));

app.use(bodyparser.urlencoded ({extended: false}))



app.get('/', function(req, res, next) {   
   
    if(req.session.flag == 1){
        res.sendFile({ message : "email em uso" , flag : 1});
        
    }
    
    })


app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})



app.post('/tabela', async (req, res, next) => {

    var campo = req.body.campo;
    var email = req.body.email;
    var senha = req.body.senha;
    var csenha = req.body.csenha;

    if(csenha == senha){
        
        var sql = 'select * from tabela where email = ?;';

        db.query(sql,[email], function(err, result, fields){
            if(err) throw err;

            if(result.length > 0){
                req.session.flag = 1;
                res.redirect('/inicial.hml');
            }else{
                var hashpassword = bcrypt.hashSync(senha, 10);
                var sql = 'insert into tabela(campo,email,senha) values(?,?,?);';

                db.query(sql, [campo, email, hashpassword], function(err, result, fields){
                    if(err) throw err;
                    req.session.flag = 2;
                    res.redirect('/inicial.html');

                });
            }
        });
    }else{
        req.session.flag = 3;
        res.redirect('/inicial.html');
    }


     })


app.post('/login', function(req, res, next){

    var email = req.body.email;
    var senha = req.body.senha;

    var sql = 'select * from tabela where email = ?;';

    db.query(sql,[email], function(err,result, fields){
        if(err) throw err;

        if(result.length && bcrypt.compareSync(senha, result[0].senha)){
            req.session.email = email;
            res.redirect('/inicial.html');
        }else{
            req.session.flag = 4;
            res.redirect('/inicial.html')
        }
    })
})



app.listen(3000, () => {
    console.log('listening on port 3000......');

})