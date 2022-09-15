const models = require ('../models');

module.exports = {
  get: (req, res) => {
    res.status(200).send('successfully got questions')
  },

  post: (req, res) => {
    res.status(201).send('sucessfully posted in questions')
  },

  helpful: (req, res) => {
    res.status(201).send('successfully marked question as helpful')
  },

  report: (req, res) => {
    res.status(201).send('successfully reported question')
  }
}