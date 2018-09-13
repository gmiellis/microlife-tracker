const express = require('express');

const bodyParser = require('body-parser');

const createActivity = require('./controllers/createActivity');
const getActivities = require('./controllers/getActivities');

const app = express();

app.use(bodyParser.json());

app.post('/profile/activities', createActivity);
app.get('/profile/activities', getActivities);

app.listen(3000, () => console.log('Example App listening on port 3000!'));
