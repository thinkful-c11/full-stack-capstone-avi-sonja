
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
cohort_id integer NOT NULL cohorts,
comment TEXT);

create table cohorts(
  id serial PRIMARY KEY,
  name text,
  date_start DATE NOT NULL DEFAULT CURRENT_DATE
);

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

insert into cohorts (name) values ('Westeros');


insert into cohort_members (first_name, last_name, cohort_id, location) 
values ('Cersei', 'Lannister', 1, 'Kings Landing');
insert into cohort_members (first_name, last_name, cohort_id, location) 
values ('Jon', 'Snow', 1, 'Winterfell');
insert into cohort_members (first_name, last_name, cohort_id, location) 
values ('Sansa', 'Stark', 1, 'Winterfell');
insert into cohort_members (first_name, last_name, cohort_id, location) 
values ('Tyrion', 'Lannister', 1, 'Meereen');
insert into cohort_members (first_name, last_name, cohort_id, location) 
values ('Daenerys', 'Targaryen', 1, 'Meereen');
insert into cohort_members (first_name, last_name, cohort_id, location) 
values ('Petyr', 'Baelish', 1, 'Meereen');

insert into cycles (cohort_id, comment) values (1, 'this is going to get interesting');

insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (4, 5, 1, 3, 'no comments');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (4, 2, 1, 5, 'mutual enemies');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (5, 2, 1, 2, 'he likes her, she hates him');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (4, 1, 1, 3, 'no comments');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (5, 1, 1, 1, 'hate eachother');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (2, 1, 1, 4, 'she needs him');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (4, 0, 1, 1, 'hate eachother');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (5, 0, 1, 3, 'will work together but not like it');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (2, 0, 1, 1, 'loathe eachother');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (1, 0, 1, 1, 'loathe eachother');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (4, 3, 1, 4, 'good working relationship');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (5, 3, 1, 3, 'ok with working together');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (2, 3, 1, 5, 'will work together');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (1, 3, 1, 5, 'mutual respect');
insert into pairings (person1, person2, cycles_id, rating, rating_comment) values (0, 3, 1, 1, 'will kill eachother given the opportunity');
insert into pairings (person1, cycles_id, rating, rating_comment) values (4, 1, 3, 'ok working alone');
insert into pairings (person1, cycles_id, rating, rating_comment) values (5, 1, 1, 'needs to work with others');
insert into pairings (person1, cycles_id, rating, rating_comment) values (2, 1, 1, 'damsel in distress');
insert into pairings (person1, cycles_id, rating, rating_comment) values (1, 1, 5, 'sometimes better off alone');
insert into pairings (person1, cycles_id, rating, rating_comment) values (0, 1, 5, 'wants to work alone');
insert into pairings (person1, cycles_id, rating, rating_comment) values (3, 1, 2, 'needs someone to advise');


