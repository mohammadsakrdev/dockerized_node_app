const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 3001;

const app = express();

let connection = null;

let Todo = require('./todo.model');
app.use(bodyParser.json());

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

todoRoutes.route('/:id').get((req, res) => {
    Todo.find((err, result) => {
        let id = req.params.id;
        Todo.findBuId(id, (err, result) => {
            res.json(result);
        });
    })
});

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.find((err, result) => {
        Todo.findBuId(req.params.id, (err, result) => {
            if (!result) {
                res.status(404).send('data is not found')
            } else {
                result.todo_description = req.body.todo_description;
                result.todo_responsible = req.body.todo_responsible;
                result.todo_priority = req.body.todo_priority;
                result.todo_completed = req.body.todo_completed;

                result.save().then(todo => {
                    res.json(todo);
                }).catch(err => {
                    res.status(400).json('Not updated');
                })
            }

        });
    })
});

app.use('/todos', todoRoutes);

mongoose.connect('mongodb://mongodb:27018/todos', {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})