const express = require('express');
const path = require('path');

const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
var Users = require('./serverBuild/modules/users/routes/userRouter');
var Society = require('./serverBuild/modules/society/routes/societyRouter');
const port = process.env.PORT || 5000;

// API calls

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/users',Users);
app.use('/society',Society)
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express great  ' });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));