import express from 'express'
import contentRoutes from './routes/contentRoutes.js'

const app = express()
const port = process.env.PORT || 3000

app.use('/services', contentRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
