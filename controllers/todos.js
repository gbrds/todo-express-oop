import { filemanager } from '../files.js'
import { Todo } from '../models/todo.js'

class todoController {
    constructor() {
        // try to get data form file and init tasks array
        this.initTodos = []
    }
    
    async createTodo(req, res){
        //get data from post request
        const task = req.body.task
        //create new object via Todo model
        //model constructor uses uniq id and task name as parameter
        const newTodo = new Todo(Math.random().toString(), task)
        //add new todo to todos array
        this.TODOS.push(newTodo)
        // save data to file
        await filemanager.writeFile('./data/todos.json', this.TODOS)
        //create a correct response
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    async initTodos(){
        const todosData = await fileManager.readfile('./data/todos.json')
        // if data is ok - add file content to array
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = [] // if we do not get data form file create an empty array
        }
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }

    updateTodo(req, res){
        // get id from url params
        const todoId = req.params.id
        // get the updated task name from requested body (like from data)
        const updatedTask = req.body.task
        // get the array element index if todo id is equal with url params id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        // if url params id is not correct - send error message
        if (todoIndex < 0){
            res.json({
                message: 'Could not find todo with such index'
            })
            throw new Error('Could not find todo')
        }
        // if id is ok - update todo
        // for update create element with the same id and new task
        // and save it in the same array element by this index
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        // show updated info
        res.json({
            message: 'Updated todo',
            updateTask: this.TODOS[todoIndex]
        })
    }

    deleteTodo(req, res){
        const todoId = req.params.id;
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
        if (todoIndex < 0) {
            return res.status(404).json({
                message: 'Todo not found'
            });
        }
        const deletedTodo = this.TODOS.splice(todoIndex, 1)[0];
        res.json({
            message: 'Deleted todo',
            deletedTask: deletedTodo,
        })
    }
}

export const TodoController = new todoController();