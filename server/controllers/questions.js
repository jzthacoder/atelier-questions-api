const {questions, answers, answersPhotos} = require('../models');

module.exports = {
  get: (req, res) => {
    let product_id = [req.params.product_id]
    questions.getQuestionsModel(product_id)
      .then((data) => {
        console.log('data: ', data.rows);
        res.status(200).send(data.rows);
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