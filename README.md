# Cohort of Thrones with Rabbits in Wonderland 

A student pairings tool

## API Documentation

//GET all students from the cohort table
* '/cohort_members'

//GET all active students from the cohort table
* '/cohort_members/active'

//GET all active students in a cohort by cohort id
* '/cohort_members/:cid'

//GET an individual student by ID
* '/cohort_members/indiv/:id'

//GET the set of pairings for today's pairing
* '/todays_pairs'

//GET the pairing by ID of set of pairs
* /todays_pairs/:id'

//GET the current day's pairing with all info in the database
* '/admin/todays_pairs/'

//GET the pairing by ID of set of pairs with all data in the database
* '/admin/todays_pairs/:id'

//POST a new member to the cohort table 
//curently has the cohort ID hardcoded to be part
//of the current cohort test data
* '/cohort_members'

//Can update the location of a cohort member by id
* '/cohort_members/:id'

// DELETE - softly
* '/cohort_members/:id'

## Summary

Allows you to look at daily pairings as a regular user. For instructors/TAs/mentors be able to view daily pairings with meta data. For admins and project managers add, update, and delete users.

## Technology Used

Front-end technologies
* Custom grid.css format, jQuery

Server technologies
* NodeJS (Express, Mocha/Chai, js-combinatorics)

Data Persistence
* PostgreSQL with Knex

CICD
* Travis CI & Heroku

Development Environment
* Visual Studio Code, Google Chrome, Postman

## Links

Heroku deployment
* Home page with pairings (<a href="https://pacific-scrubland-37773.herokuapp.com/index.html">here</a>)
* Dashboard with links to other dashboards (<a href="https://pacific-scrubland-37773.herokuapp.com/dashboard/dashboard.html">here</a>)
