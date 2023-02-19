import { DataObjectModel } from "../models/data_objects.js"

const DataObjects = new DataObjectModel()

const index = async (req, res) => {
	try {
		const currentObjects = await DataObjects.index()
		res.send(currentObjects)
	} catch (e) {
		res.status(404).json(e.message)
	}
}

const show = async (req, res) => {
	try {
		const dataObjName = req.query.dataObjectName
		const currentObject = await DataObjects.show(dataObjName)
		res.status(200).send(currentObject)
	} catch (e) {
		res.status(404).json(e.message)
	}
}

const create = async (req, res) => {
	try {
		const DataObject = req.body
		if (!'name' in DataObject) {
			res.status(400).send({ message: 'name of the dataObject is not specified' })
		}
		const reply = await DataObjects.create(DataObject)
		res.status(201).send(reply)
	} catch (e) {
		res.status(404).json(e.message)
	}
}

const destroy = async (req, res) => {
	try {
		const dataObjName = req.query.dataObjectName
		const deletedObj = await DataObjects.delete(dataObjName)
		res.status(204).json(deletedObj)
	} catch (e) {
		res.status(404).json(e.message)
	}
}

const objects_routes = (app) => {
	app.get('/objects/index', index)
	app.get('/objects/show', show)
	app.post('/objects/create', create)
	app.delete('/objects/delete', destroy)
}

export default objects_routes