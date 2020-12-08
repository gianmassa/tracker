const userSchema = require('./schema')

const all = async (req, res) => {
  const users = await userSchema.find()
  return res.json(users)
}

const findById = async (req, res) => {
  const { id } = req.params
  const model = await userSchema.findById(id)
  if(!model) {return res.status(404).send('User not found')}
  else {return res.json(model)}
}

const save = async (req, res) => {
  const { id } = req.params
  const { body } = req

  if (id) {
    await userSchema.updateOne({ _id: id }, { $set: body })
    const updated = await userSchema.findById(id)
    return res.status(202).send(updated)
  }
  else {
    const user = new userSchema(body)
    await user.save()
    return res.status(201).send(user)
  }
}

const remove = async (req, res) => {
  const { id } = req.params
  const model = await userSchema.findById(id)
  if(!model) {return res.status(404).send('User not found')}
  else {
    await userSchema.deleteOne({ _id: id })
    return res.status(204).send('User Removed')
  }
}

const verifyUser = async (req, res) => {
  let response = await userSchema.findOne({ name: req.body.name, password: req.body.password })
  if (response === null) {
    res.send(JSON.stringify('error'))
  }
  else {
    res.send(response)
  }
}

module.exports = {
  all,
  findById,
  save,
  remove,
  verifyUser
}
