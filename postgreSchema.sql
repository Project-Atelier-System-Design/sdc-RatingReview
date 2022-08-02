DROP DATABASE IF EXISTS RatingReview;
CREATE DATABASE RatingReview;

\c ratingreview;

-- DROP TABLE IF EXISTS `product`;


CREATE TABLE products (
  productID SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  slogan VARCHAR(500),
  description VARCHAR(500) NOT NULL,
  category VARCHAR(500) NOT NULL,
  defaultPrice INTEGER NOT NULL
);


-- DROP TABLE IF EXISTS `review`;

CREATE TABLE reviews (
  reviewID SERIAL PRIMARY KEY,
  rating INTEGER DEFAULT 3,
  summary VARCHAR DEFAULT NULL,
  recommend BOOLEAN DEFAULT FALSE,
  response VARCHAR DEFAULT NULL,
  body VARCHAR DEFAULT NULL,
  date TEXT DEFAULT NULL,
  reviewer_name VARCHAR DEFAULT NULL,
  reviewer_email VARCHAR DEFAULT NULL,
  helpfulness INTEGER DEFAULT 0,
  reported BOOLEAN DEFAULT FALSE,
  product_id INTEGER DEFAULT NULL,
  FOREIGN KEY (product_id) REFERENCES products (productID)
);


CREATE TABLE photos (
  photoID SERIAL PRIMARY KEY,
  url TEXT,
  review_id INTEGER,
  FOREIGN KEY (review_id) REFERENCES reviews (reviewID)
);


CREATE TABLE characteristics (
  charID SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT Null,
  product_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES products (productID)
);


CREATE TABLE characteristic_reviews (
  charRevID SERIAL PRIMARY KEY,
  value INTEGER DEFAULT 3,
  review_id INTEGER,
  char_id INTEGER,
  FOREIGN KEY (review_id) REFERENCES reviews (reviewID),
  FOREIGN KEY (char_id) REFERENCES characteristics (charID)
);



copy products from '/Users/admin/Downloads/product.csv' delimiter ',' csv header;

copy reviews (reviewID,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) from '/Users/admin/Downloads/reviews.csv' delimiter ',' csv header;



copy photos (photoID,review_id,url) from '/Users/admin/Downloads/reviews_photos.csv' delimiter ',' csv header;

copy characteristics (charID,product_id,name) from '/Users/admin/Downloads/characteristics.csv' delimiter ',' csv header;

copy characteristic_reviews (charRevID,char_id,review_id,value) from '/Users/admin/Downloads/characteristic_reviews.csv' delimiter ',' csv header;


SELECT setval(pg_get_serial_sequence('reviews', 'reviewid'), (SELECT MAX(reviewid) FROM reviews)+1);
SELECT setval(pg_get_serial_sequence('photos', 'photoid'), (SELECT MAX(photoID) FROM photos)+1);
SELECT setval(pg_get_serial_sequence('characteristics', 'charid'), (SELECT MAX(charid) FROM characteristics)+1);
SELECT setval(pg_get_serial_sequence('characteristic_reviews', 'charrevid'), (SELECT MAX(charrevid) FROM characteristic_reviews)+1);
SELECT setval(pg_get_serial_sequence('products', 'productid'), (SELECT MAX(productid) FROM products)+1);


create index reviews_product_idx on reviews (product_id);

create index photos_review_idx on photos (review_id);

create index char_product_idx on characteristics (product_id);

create index charRev_char_idx on characteristic_reviews (char_id);

