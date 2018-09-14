const fs = require('fs');
const path = require('path');
const events = require('events');
const httpMocks = require('node-mocks-http');
const getMicrolifeAdjustment = require('../controllers/getMicrolifeAdjustment');

describe('get Microlife adjustment', () => {
  it('get the microlife adjustment', (done) => {
    expect.assertions(2);
    const user = {
      profile: {
        activities: [{
          activityId: 'walk',
          quantity: 1,
        }, {
          activityId: 'meat',
          quantity: 2,
        }, {
          activityId: 'tv',
          quantity: 1,
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
      getMicrolifeAdjustment(request, response);
      response.on('end', () => {
        expect(response.statusCode).toEqual(200);
        expect(response._getData()).toEqual({ dayTotal: 47 });
        done();
      });
    });
    afterEach(() => {
      path.join(__dirname, filePath);
      fs.writeFileSync(filePath, '{"profile":{"activities":[]}}');
    });
  });
});
