const parkingSchema = require('./schema')

const all = async (req, res) => {
  const parkings = await parkingSchema.find()
  return res.json(parkings)
}

const findById = async (req, res) => {
  const { id } = req.params
  const model = await parkingSchema.findById(id)
  if(!model) {return res.status(404).send('Parking not found')}
  else {return res.json(model)}
}

const save = async (req, res) => {
  const { id } = req.params
  const { body } = req

  if (id) {
    await parkingSchema.updateOne({ _id: id }, { $set: body })
    const updated = await parkingSchema.findById(id)
    return res.status(202).send(updated)
  }
  else {
    const parking = new parkingSchema(body)
    await parking.save()
    return res.status(201).send(parking)
  }
}

const remove = async (req, res) => {
  const { id } = req.params
  await parkingSchema.deleteOne({ _id: id })
  return res.status(204).send('Parking Removed')
}

module.exports = {
  all,
  findById,
  save,
  remove
}
