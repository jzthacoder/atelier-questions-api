const {questions, answers, answersPhotos} = require ('../models');

module.exports = {
  get: (req, res) => {
    res.status(200).send('successfully got answers')
  },

  post: (req, res) => {
    res.status(201).send('sucessfully posted in answers')
  },

  helpful: (req, res) => {
    const params = {id: req.url.split('/')[2]};
    console.log('this is params: ', params)
    answers.helpfulAnswersModel(params)
      .then((data) => {
        res.status(201).send('successfully marked answer as helpful')
      })
      .catch((e) => console.error(e.stack));

  },

  report: (req, res) => {
    const params = {id: req.url.split('/')[2]};
    console.log('this is params: ', params)
    answers.reportAnswersModel(params)
      .then((data) => {
        res.status(201).send('successfully reported answer')
      })
      .catch((e) => console.error(e.stack));
  }

}