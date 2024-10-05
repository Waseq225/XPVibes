## Before running the application for the first time:
-   Install yarn `npm install --global yarn`
-   Install nodemon globally `npm install -g --force nodemon`
-   Create an .env file from [example.env](https://github.com/Waseq225/XPVibes/blob/main/backend-api/.example.env) and ask Waseq for credentials. This will eventually  be added to a password manager.
-   Visit MongoDB by accepting invite and connect to the database. Whitelist your IP address when connecting. 

## To run the application

** Always yarn in both the `backend-api` and `frontend-react-app` directories after pulling changes **


### To run the backend server:

-   In one terminal window run `cd backend-api` and then `nodemon index.js` 
-   Inspect network tab in browser for any error.

### To run the frontend:

-   Open a different terminal window.
-   Run `cd frontend-react-app` and then `yarn dev`
-   Visit localhost link to view app.
-   Check console tab in browser for any error.
