
import express from 'express';

const app = express();
app.use(express.json);

const users = [
    'Diego',
    'Kleyton',
    'Amanda',
    'Au'
]

app.get('/users', (request, response) => {
    const search = String(request.query.search);
    const filtered = search ? users.filter( user => user.includes(search)) : users;
    return response.json(filtered);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    return response.json(users[id]);
});

app.post('/users', (request, response) => {

    const data = request.body;

    console.log(data);

    const user = {
        name: 'Teste',
        email: 'teste@teste.com.br'
    };

    return response.json(user);

});

app.listen(8081);
