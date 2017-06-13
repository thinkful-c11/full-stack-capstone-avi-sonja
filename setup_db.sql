
CREATE TABLE users(
id serial PRIMARY KEY,
user_name text NOT NULL,
password text NOT NULL,
first_name TEXT,
last_name TEXT NOT NULL,
privilege TEXT NOT NULL);

CREATE TABLE cohort_members(
id serial PRIMARY KEY,
first_name TEXT,
last_name TEXT NOT NULL,
cohort_id int NOT NULL,
location TEXT);

CREATE TABLE privileges(
id serial PRIMARY KEY,
privilege_level text NOT NULL,
comment TEXT);

CREATE TABLE cycles(
id serial PRIMARY KEY,
date_start DATE NOT NULL DEFAULT CURRENT_DATE,
cohort_id integer NOT NULL,
comment TEXT);

CREATE TABLE ratings(
    id serial PRIMARY KEY,
    description text NOT NULL
);

CREATE TABLE pairings(
    id serial PRIMARY KEY,
    person1 integer NOT NULL,
    person2 integer,
    cycles_id integer REFERENCES cycles,
    rating integer,
    rating_comment text,
    comment text
);

CREATE TABLE set_of_pairs(
    id serial PRIMARY KEY,
    pair1 integer REFERENCES pairings,
    pair2 integer REFERENCES pairings,
    pair3 integer REFERENCES pairings,
    pair4 integer REFERENCES pairings,
    pair5 integer REFERENCES pairings,
    pair6 integer REFERENCES pairings,
    pair7 integer REFERENCES pairings,
    pair8 integer REFERENCES pairings,
    cycles_id integer REFERENCES cycles,
    expected_rating NUMERIC(4, 2),
    actual_rating integer,
    frozen bool default 'false',
    comment text
);


