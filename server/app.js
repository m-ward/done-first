import express from 'express';
import { resolve } from 'path';
import appointmentController from './appointments/appointment.controller';
import usersController from './users/users.controller';

// Create the express application
const app = express();

// Assign controllers to routes
app.use('/api/appointments', appointmentController);
app.use('/api/users', usersController);

// Declare the path to frontend's static assets
app.use(express.static(resolve('..', 'build')));

// Intercept requests to return the frontend's static entry point
app.get('*', (_, response) => {
  response.sendFile(resolve('..', 'build', 'index.html'));
});

export default app;
