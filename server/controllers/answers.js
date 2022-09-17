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
    const params = req.body;
    console.log('this is req body: ', req.body)

    answers.postAnswersModel(params)
      .then((data) => {
        // console.log('here is data after post answer: ', data.rows)
        const answer_id = data.rows[0].id;
        params.url.map((url) =>
        answers.postAnswersPhotosModel([url, answer_id]))
      })
      .then((data) => {
        res.status(201).send('successfully posted an answer')
      })
      .catch((e) => console.error(e.stack))
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