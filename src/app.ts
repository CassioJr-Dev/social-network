import express from 'express'
import 'dotenv/config'
import userRoutes from './user/routes/routes'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use('/', userRoutes)

app.get('/', (req, res) => {
  res.send('Olá, mundo!')
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
