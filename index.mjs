import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import models from '../models/index.js'
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

// Access the parse results as request.body
app.post('/create', async (req, res) => {
	const DataObject = req.body
	if (!'name' in DataObject) {
		res.status(400).send({ message: 'name of the dataObject is not specified' })
	}
	await data_objects.create({
		dataobject_name: DataObject.name,
		createdAt: new Date(),
		updatedAt: new Date()
	})
	for (const level of DataObject?.levels) {
		await levels.create({
			level_name: level.levelName,
			level_id: level.levelID,
			data_objectId: DataObj.id,
			createdAt: new Date(),
			updatedAt: new Date()
		})
		for (const element of level?.elements) {
			await elements.create({
				element_name: element.name,
				levelId: lvl.id,
				createdAt: new Date(),
				updatedAt: new Date()
			})
		}
	}
	res.json({ status: 200, message: 'Successfully added' })
})

app.get('/all', async (req, res) => {
	let dataObjs = await data_objects.findAll({
		order: [['dataobject_name', 'ASC'], [models.levels, 'level_name', 'ASC'],],
		attributes: ['dataobject_name'],
		include: [{
			model: levels,
			as: levels,
			attributes: [['level_id', 'level_name',]],
			include: [{
				model: elements,
				as: elements,
				attributes: ['element_name',],
			}],
		}],
	})
	res.json(dataObjs)
})

app.get('/search/:dataObjectName', async (req, res) => {
	const dataObjName = req.params.dataObjectName
	console.log(dataObjName)
	let dataObj = await data_objects.findOne({
		where: { dataobject_name: dataObjName },
		order: [['dataobject_name', 'ASC'], [models.levels, 'level_name', 'ASC'],],
		attributes: ['dataobject_name'],
		include: [{
			model: levels,
			as: levels,
			attributes: [['level_id', 'level_name',]],
			include: [{
				model: elements,
				as: elements,
				attributes: ['element_name',],
			}],
		}],
	})
	res.json(dataObj)
})

app.get('/delete/:dataObjectName', async (req, res) => {
	const dataObjName = req.params.dataObjectName
	console.log(dataObjName)
	let dataObj = await data_objects.destroy({
		where: { dataobject_name: dataObjName },
	})
	res.json(dataObj)
})

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
