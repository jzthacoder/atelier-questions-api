import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // const responses = http.batch([
  //   ['GET', 'http://localhost:3000/qa/questions/1'],
  //   ['GET', 'http://localhost:3000/qa/questions/1/answers']
  // ]);

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

  const responses = http.batch([
    ['PUT', `${API}/questions/${getRandomInt(1e3, 1e4)}/helpful`]
  ])
  console.log((responses[0]))
  check(responses[0], {
    'post question ok': (res) => res.status===201,
  });
}

