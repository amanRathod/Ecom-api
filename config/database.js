const mongoose = require('mongoose');

const ConnectDB = async () => {
  try {
   
    const connect = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
   
    console.log('MongoDB Connected: ', connect.connection.host);

  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = ConnectDB;