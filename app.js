const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
 
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running')
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
console.log(process.env.PORT)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});