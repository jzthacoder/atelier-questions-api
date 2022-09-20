import http from 'k6/http';
import { check, sleep } from 'k6';

// TODO: FIX ALL OF THIS TO WORK WITH MY CODE I DIRECTLY COPIED THIS FROM THE DOCS!!!!!!!!!

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '4m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '5m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 }
  ],
  // stages: [
  //   { duration: '10s', target: 100 },
  //   { duration: '2m', target: 1000 },
  //   { duration: '2m', target: 1000 },
  //   { duration: '2m', target: 0 }
  // ],
  thresholds: {
    http_req_duration: ["p(95)<50"]
  }
  // stages: [
  //   { duration: '2m', target: 100 },
  //   { duration: '2m', target: 1000 },
  //   { duration: '5m', target: 1000 }
  // ]
}

export default function () {
  const API = 'http://localhost:3000/qa';

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const posta = {
    method: 'POST',
    url: `${API}/questions/8/answers`,
    body: JSON.stringify({
      body: "ALRIGHT DOES THIS WORK OR NOT W FAKE URLS?",
      name: "random",
      email: "testemail@gmail.com",
      question_id: 8,
      url: ["www.fakeurl.com", "www.fakeurl2.com"]
    }),
    params: {
      headers: { 'Content-Type': 'application/json'}
    }
  }

  const postb = {
    method: 'POST',
    url: `${API}/questions/8`,
    body: JSON.stringify({
      body: "test question does this work?",
      name: "random",
      email: "testemail@gmail.com",
      product_id: 8,
    }),
    params: {
      headers: { 'Content-Type': 'application/json'}
    }
  }


  const res = http.batch([
    ['GET', `${API}/questions/${getRandomInt(1e3, 1e4)}`],
    ['GET', `${API}/questions/${getRandomInt(1e3, 1e4)}/answers`],
    // posta,
    // postb,
    // ['PUT', `${API}/questions/${getRandomInt(1e3, 1e4)}/helpful`],
    // ['PUT',`${API}/questions/${getRandomInt(1e3, 1e4)}/report`],
    // ['PUT', `${API}/answers/${getRandomInt(1e3, 1e4)}/helpful`],
    // ['PUT', `${API}/answers/${getRandomInt(1e3, 1e4)}/report`]
  ])
  check(res[0], { 'status was 200': (res) => res.status === 200 });
  check(res[1], { 'status was 200': (res) => res.status === 200 });
  // check(res[2], {'post question ok': (res) => res.status === 201});
  // check(res[3], {'post question ok': (res) => res.status === 201});

  sleep(1);
};


// router.get('/questions/:product_id', controller.questions.get);
// router.post('/questions/:product_id', controller.questions.post);
// router.put('/questions/:question_id/helpful', controller.questions.helpful);
// router.put('/questions/:question_id/report', controller.questions.report);

// router.get('/questions/:question_id/answers', controller.answers.get);
// router.post('/questions/:question_id/answers', controller.answers.post);
// router.put('/answers/:id/helpful', controller.answers.helpful);
// router.put('/answers/:id/report', controller.answers.report);