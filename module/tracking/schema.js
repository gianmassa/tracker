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
  local: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: false
  },
  userId: {
    type: Number,
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('tracking', trackingSchema)
