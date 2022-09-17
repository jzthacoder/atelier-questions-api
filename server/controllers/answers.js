const {questions, answers, answersPhotos} = require ('../models');

module.exports = {
  get: (req, res) => {
    console.log('this is req.params: ', req.params)
    const params = req.params
    answers.getAnswersModel(params)
      .then((data) => {
        let dataForClient = {
          question: params.question_id,
          page: 1,
          count: data.rows.length,
          results: data.rows
        }
        res.status(200).json(dataForClient);
      })
      .catch((e) => console.error(e.stack));
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