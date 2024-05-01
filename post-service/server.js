import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import Routes from './routes/index.js'
const app = express()

const PORT = process.env.PORT || 5002

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//Routes
app.use(Routes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
