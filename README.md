## Technologies & Stack

<a href="https://opensourcecollage.com" target="_blank">opensourcecollage.com</a> is built on MERN stack (MongoDB, Express, React, NodeJS).

The client (static framework) is served on Netlify.

API Endpoint route is served on Vercel.

Firebase is used for user authentication.

MongoDB Atlas holds all document-based data on the cloud.

With speed & security concerns, our team is considering scaling the web app and hosting the entire stack on a Linux VM instance (EC2 or DigitalOcean).

## Front-End

`/client` is built with ReactJS `create-react-app` setup.

`/client/src/components` hold component for login system and uses styled-components.

`/client/src/containers` holds multiple .js files that each correspond to a component or a web page (still dynamically rendered).

To serve locally, run `npm start`. It will serve on `localhost:3000`.

## Back-End

`/server/models/message.js` defines the Schema of MongoDB document collection that gets stored and retrieved.

`/server/routes/api.js` outlines the API Endpoint and routes URL directory for GET and POST HTTP methods.

It is not required to start the server locally, because it initiates server connection with one served on the cloud (Vercel). To serve it locally and use the local server connection instead, modify `/client/src/containers/main.js` and replace current Vercel Endpoint URL to`localhost:5000`. Then, start the server by going to `/server` and running `nodemon server.js`. (While it is possible to run `npm start`, nodemon makes development much more efficient).
