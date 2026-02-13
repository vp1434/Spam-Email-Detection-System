const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/spam-detection';

console.log('Testing connection to:', uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connection SUCCESS');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB Connection ERROR:', err.message);
    process.exit(1);
  });
