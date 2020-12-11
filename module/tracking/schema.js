const mongoose = require('mongoose')
const moment = require(`moment`)

const trackingSchema = mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  sapCode: {
    type: String,
    required: false
  },
  zoeyCode: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: false
  },
  codeSystem: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('tracking', trackingSchema)
