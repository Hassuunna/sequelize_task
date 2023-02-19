import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import objects_routes from './api/handlers/data_objects.js'
import elements_routes from './api/handlers/elements.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors({
	'methods': 'GET,POST,PATCH,DELETE',
	'origin': '*',
}))

objects_routes(app)
elements_routes(app)
app.get('/', async (req, res) => {
	res.json({ msg: 'Hello World!' })
})

app.listen(port, () => {
	console.log(`Backend server is listening on port ${port}....`)
	console.log(`press CTRL+C to stop server`)
})
