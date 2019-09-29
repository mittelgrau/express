const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookie = require('cookie-parser');
const argon2 = require('argon2');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use()


app.get('/', (req, res) => {
  res.send('test');
});

app.post('/authenticate', (req,res) => {
  res.send(req.body);
});



const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
