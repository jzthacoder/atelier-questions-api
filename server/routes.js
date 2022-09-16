// TODO: set up routes with express Router and connect to controllers

const controller = require('./controllers');
const router = require('express').Router();

// Connect controller methods to corresponding routes
// TODO NEED TO FIX THE /QUESTIONS controller bc needs product id
router.get('/questions/:product_id', controller.questions.get);
router.post('/questions/:product_id', controller.questions.post);
router.put('/questions/:question_id/helpful', controller.questions.helpful);
router.put('/qa/questions/:question_id/report', controller.questions.report);

router.get('/questions/:question_id/answers', controller.answers.get);
router.post('/questions/:question_id/answers', controller.answers.post);
router.put('/qa/answers/:answer_id/helpful', controller.answers.helpful);
router.put('/qa/answers/:answer_id/report', controller.answers.report);


module.exports = router;



