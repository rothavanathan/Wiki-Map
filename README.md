# Wiki-Maps
A single page web app for generating, storing and sharing maps that mean something to you. Favourite maps made by other users so you can re-visit them without any hassle.

<img src="./Wiki-Map_demo.gif">
<img src="./Wiki-Map_demo_lowres.gif">

## Stack and Technologies used
- Google Maps API
- Javascript
- JQuery
- Bootstrap
- SASS
- NodeJS
- Express
- PostgresQL

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
