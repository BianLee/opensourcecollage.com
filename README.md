![image](https://github.com/BianLee/opensourcecollage.com/assets/62369269/8f69971b-df3d-4de5-8253-24f527816d88)
![image](https://github.com/BianLee/opensourcecollage.com/assets/62369269/ee659b47-f14f-46a4-978e-048316211026)
![image](https://github.com/BianLee/opensourcecollage.com/assets/62369269/77ff2711-9404-4ffa-9691-a0a8396af17a)


## Technologies & Architecture

<a href="https://opensourcecollage.com" target="_blank">opensourcecollage.com</a> is a web application built on MERN stack (MongoDB, Express, React, NodeJS). The backend code is hosted serverless, on Vercel (It is also where API Endpoint route exists, handling all API requests real time). The front-end client (static framework) is served entirely on Netlify. Firebase is used for authentication (Login system is still work in progress, however. I am considering possibly integrating OAuth instead). MongoDB Atlas is used as database. The only data stored in the database is the collection of opportunities. Everything else, such as blog articles, quiz problems, organizations, etc are fed through using JSON. (There really is no reason for migrating them to cloud database since they aren't meant to be changed by users, anyways). Finally, there are two separate Java programs that I wrote to interact with the app and more easily manage components (one for converting CSV data to JSON, and another for handling MongoDB).

## Developers

Bian Lee (Founder; Handling everything, from technology to business),
Pranav Rajpal (Contributor; Wrote code for the first generation of the app).
