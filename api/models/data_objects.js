import models from '../../models/index.js'
const { data_objects, levels, elements } = models

export class DataObjectModel {
	async create(DataObject) {
		const DataObj = await data_objects.create({
			dataobject_name: DataObject.name,
			createdAt: new Date(),
			updatedAt: new Date()
		})
		for (const level of DataObject?.levels) {
			const lvl = await levels.create({
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
		return ({ status: 200, message: 'Successfully added' })
	}

	async index() {
		let dataObjs = await data_objects.findAll({
			order: [['dataobject_name', 'ASC'], [levels, 'level_name', 'ASC'], [levels, elements, 'element_name', 'ASC'],],
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
		return (dataObjs)
	}

	async show(dataObjName) {
		let dataObj = await data_objects.findOne({
			where: { dataobject_name: dataObjName },
			order: [['dataobject_name', 'ASC'], [levels, 'level_name', 'ASC'], [levels, elements, 'element_name', 'ASC'],],
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
		return (dataObj)
	}

	async delete(dataObjName) {
		let dataObj = await data_objects.destroy({
			where: { dataobject_name: dataObjName },
		})
		return (dataObj)
	}
}