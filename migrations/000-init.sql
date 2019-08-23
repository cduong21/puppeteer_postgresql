CREATE TABLE posts (
 id SERIAL PRIMARY KEY,
 url TEXT NOT NULL,
 numComments TEXT NOT NULL,
 body TEXT NOT NULL,
 votes TEXT NOT NULL,
 author TEXT NOT NULL,
 other jsonb
);

