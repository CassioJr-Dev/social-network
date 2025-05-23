import express from 'express'
import userRoutes from './user/routes/routes'
import postRoutes from './post/routes/routes'
import friendShipRoutes from './friendShip/routes/routes'
import likeRoutes from './like/routes/routes'
import { ErrorHandlerMiddleware } from '@/shared/middlewares/errorHandler.middleware'
const app = express()

app.use(express.json())

app.use('/', userRoutes)
app.use('/', postRoutes)
app.use('/', friendShipRoutes)
app.use('/', likeRoutes)
app.get('/', (req, res) => {
  res.send('Olá, mundo!')
})

app.use(ErrorHandlerMiddleware.errorHandler)

export default app
