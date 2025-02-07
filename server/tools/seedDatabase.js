import { connect, disconnect } from "mongoose";
import chalk from "chalk";
import Appointment from "../src/appointments/appointment.model";
import { mongo_url } from "../src/config";

(async () => {
  let faker = require("faker");
  faker.locale = "en";
  try {
    await connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const items = await Appointment.find({});
    const generateAppointment = () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const time = faker.date.future();
      const photo = faker.image.imageUrl(50, 50, null, true, false);
      const dob = faker.date.past();
      const phone = faker.phone.phoneNumber();
      const address = faker.address.streetAddress(true);
      const city = faker.address.city();
      const state = faker.address.state();
      const zip = faker.address.zipCode();
      return new Appointment({
        firstName,
        lastName,
        email,
        time,
        photo,
        phone,
        dob,
        address,
        city,
        state,
        zip,
      });
    };

    if (items.length === 0) {
      console.log(
        chalk.yellow(
          "No users or appointments in the database, creating sample data..."
        )
      );
      const newAppointments = [];
      for (let i = 0; i < 50; i++) {
        const appointment = generateAppointment();
        newAppointments.push(appointment);
      }
      await Appointment.insertMany(newAppointments);
      console.log(
        chalk.green(`${newAppointments.length} item(s) successfuly created!`)
      );
    } else {
      console.log(
        chalk.yellow("Database already initiated, skipping populating script")
      );
    }
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    await disconnect();
  }
})();
