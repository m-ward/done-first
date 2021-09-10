import bodyParser from 'body-parser';
import { Router } from 'express';
import Appointment from './appointment.model';

const router = Router();

router.route('/').get(async (_, response) => {
  const appointments = await Appointment.find();
  return response.status(200).json(appointments);
});

router.route('/').post(bodyParser.json(), async (request, response) => {
  try {
    const appointment = new Appointment(request.body);
    await appointment.save();
    return response.status(200).json('Appointment saved!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default router;
