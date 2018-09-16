const fs = require('fs');
const path = require('path');
const events = require('events');
const httpMocks = require('node-mocks-http');
const getActivities = require('../controllers/getActivities');

describe('user activities', () => {
  it('gets a list of the users activities', (done) => {
    expect.assertions(2);
    const user = {
      profile: {
        activities: [{
          activityId: 'short-walk',
          quantity: 1,
        }, {
          activityId: 'red-meat',
          quantity: 2,
        }],
      },
    };
    const filePath = path.join(__dirname, '../controllers', 'user.json');
    fs.writeFile(filePath, JSON.stringify(user), () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/profile/activities',
      });
      const response = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });
      getActivities(request, response);
      response.on('end', () => {
        expect(response.statusCode).toEqual(200);
        expect(response._getData()).toEqual(user.profile.activities);
        done();
      });
    });
  });
  afterEach(() => {
    const filePath = path.join(__dirname, '../controllers', 'user.json');
    fs.writeFileSync(filePath, '{"profile":{"activities":[]}}');
  });
});
