const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v5');

const createActivity = (req, res) => {
  const filePath = path.join(__dirname, './user.json');

  fs.readFile(filePath, 'utf8', (readError, userJson) => {
    if (readError) throw readError;

    const user = JSON.parse(userJson);
    // console.log(user);
    const activityId = uuid();
    // console.log(activityId);
    const activity = Object.assign({}, req.body, { _id: activityId });
    // console.log(activity);
    user.profile.activities.push(activity);

    fs.writeFile(filePath, JSON.stringify(user), (writeError) => {
      if (writeError) throw writeError;

      res.status(200).send({ profileActivityId: activityId });
    });
  });
};

module.exports = createActivity;
