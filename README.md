# Node / Express API
#### This serves up a DB for our ( [Kyle](https://github.com/kheppenstall) and I ) pre-existing JS project

## Project Scope
We were challenged with creating a server and database less webpage that mimicked what we had been doing with Ruby, Rails and Postgres for the last 5 months. That project lives here [Quantified Self](https://kheppenstall.github.io/quantified_self/)

### This API was our second challenge of ripping out what we were using localStorage for and replacing it with an API.

## Main Tools used:

* ### Node.js
  * Node and npm packages for our code to live in

* ### Express.js
  * Express used to receive GET, POST, PUT and DELETE and be our CRUD interaction

* ### Knex
  * together with pg serves up our actual relational DB

* ### JQuery
  * JQuery used as our entry level crutch into JavaScript

## What it does at this point
### This API offers up a resource for Foods
* ### Routes include:
  * GET to /api/foods
    * will reetrieve the index, and all foods in JSON
  * POST to /api/foods
    * allows creating a food with parameters of { name: "string", calories: integer }
  * GET /api/foods/:id
    * will reetrieve the specified food in JSON
  * PUT to /api/foods/:id
    * allows updating a food items name or calories ( will be immediately reflected on page, and update asynchronousy to the database )
  * DELETE to /api/foods/:id
    * allows deleting a food from the database ( immediately reflected on page )
### Current Status
  Project at this point is an almost perfect split between using a Node/Express server and mimicked router to serve CRUD functions to Foods.html.
  Split down the center is Index.html, which still survives with full functions serving and storing data in localStorage.
  This was a fun stopping point to compare what is do-able from either side.
  
### Future additions may include:
  * adding seperate resource route for storying diary meal tables
  * adding log in / log out functionality
  * and O Auth if the time and price is right? 
  * more opportunities for refactoring and seeing what exactly is possible in JS as a back-end