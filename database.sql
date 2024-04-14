-- DROP TABLE IF EXISTS "todos";

-- CREATE TABLE "todos" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"text" TEXT,
-- 	"isComplete" BOOLEAN DEFAULT FALSE
-- );

-- INSERT INTO "todos"
--   ("text","isComplete")
--   VALUES 
--   ('Build a CRUD app','false'),
--   ('Make my app look nice','false');
--   -- ('Make my bed on wednesday','false'),
--   -- ('learn how to in a new language','false'),
--   -- ('Go on a vacation','false'),
--   -- ('Friday is picnic day','false');


DROP TABLE IF EXISTS "todos";

CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos"
  ("text")
  VALUES 
  ('Build a CRUD app'),
  ('Make my app look nice');