\c jessiezhao;
DROP DATABASE answers_photos;
CREATE DATABASE answers_photos;

\c answers_photos;

CREATE TABLE answers_photos (
  id serial PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR (2048)

);


COPY answers_photos
FROM '/Users/jessiezhao/Desktop/HackReactor/SEI/atelier-questions-api/raw_data/answers_photos.csv'
DELIMITER ','
CSV HEADER;
