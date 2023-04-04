const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const lists = [
    {
        id: '0000000001',
        title: 'First List',
        todos: [{
            name: 'First todo of first list!',
            status: false
        }],
    },
    {
        id: '0000000002',
        title: 'Second List',
        todos: [{
            name: 'First todo of first list!',
            status: false
        }],
    },

];

app.get('/lists', (req, res) => {
    if (!lists) {
        res.status(404).send('List not found');
        return;
    }

    res.send(lists);
});

app.put('/lists/:id', (req, res) => {
    const listId = req.params.id;
    const list = lists.find(list => list.id === listId);

    if (!list) {
        res.status(404).send('List not found');
        return;
    }

    list.todos = req.body.todos;

    res.send(list);

})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
