## Demo
https://done-first-interview.herokuapp.com/

## Fullstack instructions

To run this app in fullstack mode, development mode, the easiest way is going to be to through using docker. 
This compose file is already setup to volume in the src for both the client and server for real time editing.
The server running on port 8080 using `nodemon` to watch for changes and bounce when needed, and the client is using the react-dev server on port 3000
```
cp docker-compose.dev.yml docker-compose.yml
docker-compose up -d --build
```

For a production build
```
cp docker-compose.prod.yml docker-compose.yml
docker-compose up -d --build
```

For either, you can connect the contains bash and navigate to `/app/server` and execute `yarn seed` and it will
populate the database with 50 entries if the collection is empty.

### Client and Server stand alone instuctions can be found in their respective readme.
