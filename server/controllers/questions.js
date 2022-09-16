const {questions, answers, answersPhotos} = require('../models');

module.exports = {
  get: (req, res) => {
    questions.getQuestionsModel([1])
      .then((data) => {
        console.log('data: ', data.rows);
        res.status(200).send(data.rows);
      })
      .catch((err) => console.error(err));
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