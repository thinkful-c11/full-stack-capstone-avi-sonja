# Cohort of Thrones with Rabbits in Wonderland 

Our project allows administrators and project managers the ability to easily add and update student information while tracking student pairings. We aim to simplify the task of managing students to administrators, project managers, mentors,and so on, by various dashboards and splash pages for students to view their daily pairing.

## What is this?

This is a full-stack web app created by two former full-time Thinkful students, Sonja and Avi, made with love for our project managers to simplify their life when it comes to creating and showing daily pairs. 

Students can view their daily pair for the day on one page. Administrators and project managers can add, remove, or update student information. Mentors and TA's are able to add comments and notes to each daily pairing.

## What runs Cohort of Thrones with Rabbits in Wonderland?
* [PostgreSQL](https://www.postgresql.org/) - A SQL database
* [Express](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
* [Node.js](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to easily build scalable network applications
* [js-combinatorics](https://github.com/dankogai/js-combinatorics) - Simple combinatorics like power set, combination, and permutation in JavaScript

## Known issues & plans for the future
* SQL injection honeypot (joking it's not) joy!
* Need to fully implement our actual randomising algorithm in
* Include a login for administrators, project managers, mentors, and TA's, with distinct separation of privilege and accessibility to access dashboards

## Getting started
```
# Clone the most recent repo
https://github.com/Avizc/cohort-of-thrones-with-rabbits-in-wonderland.git

# Open our repo on your local machine!
cd cohort-of-thrones-with-rabbits-in-wonderland

# Install all of our dependencies, this does require a pre-req of having Node.js installed
npm install

# Now you're going to want to create a .env file for our database URLs
export DATABASE_URL=''
export TEST_DATABASE_URL=''

# Huzzah now lets run this cuteness!
npm start
```
## Useful links

[Home page with pairings](https://pacific-scrubland-37773.herokuapp.com/index.html)
[Dashboards demo](https://pacific-scrubland-37773.herokuapp.com/dashboard/dashboard.html)
