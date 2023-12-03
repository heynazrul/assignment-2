import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);
    app.listen(config.port, () => {
      console.log(`Awesome Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
