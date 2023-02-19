import models from '../../models/index.js'
const { elements } = models

export class ElementModel {
	async setLink(parent, child) {
		let parentObj = await elements.findOne({
			where: { element_name: parent },
			attributes: ['levelId', 'element_name',],
		})
		if (!parentObj) return ({ message: 'parent does not exist' })

		let childObj = await elements.findOne({
			where: { element_name: child },
			attributes: ['levelId'],
		})
		if (!childObj) return ({ message: 'child does not exist' })
		
		if (parentObj?.dataValues?.levelId == childObj?.dataValues?.levelId)
			return ({ message: 'elements are in the same level' })

		await elements.update(
			{ parent: parentObj.dataValues.element_name },
			{ where: { element_name: child } }
		)
		return ({ message: "elements linked successfully" })
	}
}
