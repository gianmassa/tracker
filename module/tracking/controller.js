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

const createOrder = async (req, res) => {
  let response= await trackingSchema.findOne( { $or: [{ sapCode: req.body.sapCode }, { zoeyCode: req.body.zoeyCode}] })
  if (response !== null) {
    res.send(JSON.stringify('O Código SAP ou o código ZOEY já está cadastrado'))
  }
  else if(req.body.sapCode && req.body.zoeyCode) {
    const tracking = new trackingSchema(req.body)
    await tracking.save()
    res.send(JSON.stringify('Pedido Criado com Sucesso'))
  }
  else {
    res.send(JSON.stringify('Código SAP e código ZOEY são obrigatórios'))
  }

}

const updateOrder = async (req, res) => {
  let response = req.body.codeSystem === 'SAP' ?
  await trackingSchema.findOne({ sapCode: req.body.code }) :
  await trackingSchema.findOne({ zoeyCode: req.body.code })

  if (response !== null) {
    response.status = req.body.status
    await response.save()
    res.send(JSON.stringify('Status do Pedido Atualizado'))
  }

  else {
    res.send(JSON.stringify('Pedido não encontrado'))
  }
}

const track = async (req, res) => {
  console.log(req.body)
  let response = req.body.codeSystem === 'SAP' ?
  await trackingSchema.findOne({ sapCode: req.body.code }) :
  await trackingSchema.findOne({ zoeyCode: req.body.code })

  if (response !== null) {
    res.send(JSON.stringify(response.status))
  }
  else {
    res.send(JSON.stringify('Pedido Não Encontrado'))
  }
}

module.exports = {
  all,
  findById,
  save,
  remove,
  createOrder,
  updateOrder,
  track
}
