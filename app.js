const express = require('express');

const bodyParser = require('body-parser');

const createActivity = require('./controllers/createActivity');
const getActivities = require('./controllers/getActivities');
const updateActivity = require('./controllers/updateActivity');

const app = express();

app.use(bodyParser.json());

app.post('/profile/activities', createActivity);
app.get('/profile/activities', getActivities);
app.put('/profile/activities/:profileActivityId', updateActivity);

app.listen(3000, () => console.log('Example App listening on port 3000!'));
