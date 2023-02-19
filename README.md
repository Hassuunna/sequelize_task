# sequelize_task

solve backend joining task with sequelize nodejs


Routes:

`/objects/create` allows us to create a new data object, sending the object in req.body

`/objects/index` finds all data objects

`/objects/show?dataObjectName=[name]` finds one data object by name

`/objects/delete?dataObjectName=[name]` deletes one data object by name

`/elements/link?parent=[parent]&child=[child]` links two elements from different levels
