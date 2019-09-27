const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));


app.get('/', (req, res) => {
  res.send('test');
});

app.post('/authenticate', (req,res) => {
  res.send(req.body.password);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
