const trackingSchema = require('./schema')

const all = async (req, res) => {
  const trackings = await trackingSchema.find()
  return res.json(trackings)
}

const findById = async (req, res) => {
  const { id } = req.params
  const model = await trackingSchema.findById(id)
  if(!model) {return res.status(404).send('Tracking not found')}
  else {return res.json(model)}
}

const save = async (req, res) => {
  const { id } = req.params
  const { body } = req

  if (id) {
    await trackingSchema.updateOne({ _id: id }, { $set: body })
    const updated = await trackingSchema.findById(id)
    return res.status(202).send(updated)
  }
  else {
    const tracking = new trackingSchema(body)
    await tracking.save()
    return res.status(201).send(tracking)
  }
}

const remove = async (req, res) => {
  const { id } = req.params
  await trackingSchema.deleteOne({ _id: id })
  return res.status(204).send('Tracking Removed')
}

module.exports = {
  all,
  findById,
  save,
  remove
}
