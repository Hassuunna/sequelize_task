import { ElementModel } from "../models/elements.js"

const Elements = new ElementModel()

const link = async (req, res) => {
	try {
		const { parent, child } = req.query
		const link = await Elements.setLink(parent, child)
		res.status(200).send(link)
	}
	catch (e) {
		res.status(404).json(e.message)
	}
}

const elements_routes = (app) => {
	app.get('/elements/link', link)
}

export default elements_routes