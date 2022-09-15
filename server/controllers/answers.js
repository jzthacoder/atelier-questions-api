const models = require ('../models');

module.exports = {
  get: (req, res) => {
    res.status(200).send('successfully got answers')
  },

  post: (req, res) => {
    res.status(201).send('sucessfully posted in answers')
  },

  helpful: (req, res) => {
    res.status(201).send('successfully marked answer as helpful')
  },

  report: (req, res) => {
    res.status(201).send('successfully reported answer')
  }

}