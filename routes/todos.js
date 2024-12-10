import express, { Router } from 'express'
import { TodoController } from '../controllers/todos'

const router = Router()

router.post('/new-todo', (req, res) => TodoController.createTodo(req, res))

export default router