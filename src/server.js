require("dotenv").config();
const express = require("express");
const axios = require('axios');

const port = process.env.PORT || 80;
const url_protocol = process.env.PROTOCOL || 'http';
const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJjNmE1ZmQ2ZjliYTk0ZGM3ZTIyMDRlIiwiZW1haWwiOiJhYSIsImlhdCI6MTY1NzM3OTQyNCwiZXhwIjoxNjU3Mzg2NjI0fQ.-CObV__IiGF59cSE6_CSR7d2vD3Hwss8t9lFpUxqmr8";
    let response_users = await axios.get('https://hetic-vroom-api.one-website.com/users/get', {
        headers: {
            "x-access-token": token,
            "content-type": "application/json"
        }
    });
    console.log(response_users.data);
    res.render("index", { 
        url: url_protocol + '://' + req.get('host'), 
    data_users: response_users.data 
    });
});

app.get("/connexion", async (req, res) => {
    res.render("connexion", {
        url: url_protocol + '://' + req.get('host')
    });
});

app.post("/connexion", async (req, res) => {
    let response = await axios.post('https://hetic-vroom-api.one-website.com/authentication/login', {
        email: req.body.email,
        password: req.body.password
    });
    console.log(response.data);
    res.redirect('/connexion');
});

app.get("/inscription", async (req, res) => {
    res.render("inscription", {
        url: url_protocol + '://' + req.get('host')
    });
});

app.post("/inscription", async (req, res) => {
    let response = await axios.post('https://hetic-vroom-api.one-website.com/authentication/register', {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        lastname: req.body.lastname
    });
    console.log(response.data);
    res.redirect('/inscription');
});

app.post("/supprimer-user/:id", async (req, res) => {
    const { id } = req.params;
    await axios.delete('https://hetic-vroom-api.one-website.com/users/delete/' + id);
    res.redirect('/');
});

app.get("/liste-questions", async (req, res) => {
    let response_questions = await axios.get('https://hetic-vroom-api.one-website.com/questions/get');

    res.render("liste-questions", {
        url: url_protocol + '://' + req.get('host'),
        data_questions: response_questions.data
    });
});

app.get("/ajouter-question", async (req, res) => {
    res.render("ajouter-question", {
        url: url_protocol + '://' + req.get('host')
    });
});

app.post("/ajouter-question", async (req, res) => {
    let response = await axios.post('https://hetic-vroom-api.one-website.com/questions/create', {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        mail: req.body.mail,
        profil: req.body.profil,
        text: req.body.text
    });
    console.log(response.data);
    res.redirect('/liste-questions');
});

app.get("/modifier-question/:id", async (req, res) => {
    const { id } = req.params;
    let response_conducteur = await axios.get('https://hetic-vroom-api.one-website.com/questions/get/' + id);

    res.render("modifier-question", {
        url: url_protocol + '://' + req.get('host'),
        data_user: response_conducteur.data
    });
});

app.post("/modifier-question/:id", async (req, res) => {
    const { id } = req.params;
    let response = await axios.put('https://hetic-vroom-api.one-website.com/questions/update/' + id, {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        mail: req.body.mail,
        profil: req.body.profil,
        text: req.body.text
    });
    console.log(response.data);
    res.redirect('/liste-questions');
});

app.post("/supprimer-question/:id", async (req, res) => {
    const { id } = req.params;
    await axios.delete('https://hetic-vroom-api.one-website.com/questions/delete/' + id);
    res.redirect('/liste-questions');
});

app.listen(port, () => console.log("Server listening to", port));