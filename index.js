import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import models from './models/index.js'
import objects_routes from './api/handlers/data_objects.js'
const { data_objects, levels, elements } = models

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
// We set the CORS origin to * so that we don't need to worry about the complexities of CORS.
app.use(cors({
	'allowedHeaders': [
		'Origin', 'X-Requested-With',
		'Content-Type', 'Accept',
		'X-Access-Token', 'Authorization', 'Access-Control-Allow-Origin',
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Methods'
	],
	'methods': 'GET,POST,PATCH,DELETE',
	'preflightContinue': true,
	'origin': '*',
}))

objects_routes(app)

app.get('/link/:parent/:child', async (req, res) => {
	const { parent, child } = req.params
	let parentObj = await elements.findOne({
		where: { element_name: parent },
		attributes: ['levelId', 'element_name',],
	})
	let childObj = await elements.findOne({
		where: { element_name: child },
		attributes: ['levelId'],
	})
	if (parentObj?.dataValues?.levelId == childObj?.dataValues?.levelId) {
		res.json({ message: 'failed to set the link' })
		return
	}

	await elements.update(
		{
			parent: parentObj.dataValues.element_name
		},
		{
			where: { element_name: child }
		}
	)
	res.json({ message: "parent linked successfully" })
})

// Root URI call
app.get('/', async (req, res) => {
	res.json({ msg: 'Hello World!' })
})

// Start the Server
app.listen(port, () => {
	console.log(`Backend server is listening on port ${port}....`)
	console.log(`press CTRL+C to stop server`)
})
