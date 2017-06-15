CREATE TABLE cohort_members(id serial PRIMARY KEY, first_name TEXT NOT NULL, 
            last_name TEXT NOT NULL,cohort_id int NOT NULL,location TEXT); 
            CREATE TABLE pairings(id serial PRIMARY KEY, id1 integer NOT NULL, 
            name1 text NOT NULL, id2 integer,name2 text, cycles_id integer, rating integer,
            rating_comment text, comment text); CREATE TABLE set_of_pairs(id serial PRIMARY KEY,
            pair1 integer, pair2 integer, pair3 integer, cycles_id integer, expected_rating NUMERIC(4, 2),
            actual_rating integer,frozen bool default 'false', comment text);



DROP TABLE IF EXISTS set_of_pairs; 
            DROP TABLE IF EXISTS pairings; DROP TABLE IF EXISTS cohort_members;