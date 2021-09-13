import { connect } from 'mongoose';
import app from './app';
import {mongo_url, port} from './config';

(async () => {
  await connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
