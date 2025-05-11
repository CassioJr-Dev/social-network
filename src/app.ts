import express from 'express'
import userRoutes from './user/routes/routes'
import postRoutes from './post/routes/routes'
import { ErrorHandlerMiddleware } from '@/shared/middlewares/errorHandler.middleware'

const app = express()

app.use(express.json())

app.use('/', userRoutes)
app.use('/', postRoutes)
app.get('/', (req, res) => {
  res.send('Olá, mundo!')
})

app.use(ErrorHandlerMiddleware.errorHandler)

export default app
