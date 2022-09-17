const {questions, answers, answersPhotos} = require('../models');

module.exports = {
  get: (req, res) => {
    const params = req.params;
    console.log('in get here are params', params)
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
    const params = {question_id: req.url.split('/')[2]};
    console.log('this is params: ', params)
    questions.helpfulQuestionsModel(params)
      .then((data) => {
        res.status(201).send('successfully marked question as helpful')
      })
      .catch((e) => console.error(e.stack));
  },

  report: (req, res) => {
    const params = {question_id: req.url.split('/')[2]};
    questions.reportQuestionsModel(params)
      .then((data) => {
        res.status(201).send('successfully reported question')
      })
      .catch((e) => console.error(e.stack));
  }
}