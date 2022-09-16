const {questions, answers, answersPhotos} = require('../models');

module.exports = {
  get: (req, res) => {
    const params = req.params;
    questions.getQuestionsModel(params)
      .then((data) => {
        let dataForClient = {
          product_id: params.product_id,
          results: data.rows
        }
        res.status(200).json(dataForClient);
      })
      .catch((e) => console.error(e.stack));
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