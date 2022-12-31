# Terminal Chat Frontend

This is the Frontend for our project Terminal Chat \
It was made using React and Tailwind

## Commands

- npm build = Builds the app for production to the build folder 
- npm start = Runs in development mode
- npm install = Used to install all dependencies
- npm lint = Runs the linter
- npm lint:fix = Fix all file for the linter

## How to deploy the project

To deploy the project we used [vercel](https://vercel.com)
But you can use any other hosting service for react based projects.


### Environment variables

The projects needs a few environment variables to work

REACT_APP_SERVER_URL = Should be http:// + the server url
REACT_APP_SOCKETS_URL = Should be ws:// + the server url

#### How to connect

Connect to the project using the url given by your deployment service or use http://127.0.0.1:3000 locally
