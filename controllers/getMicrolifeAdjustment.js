const fs = require('fs');
const path = require('path');

const getMicrolifeAdjustment = (req, res) => {
  const filePath = path.join(__dirname, 'user.json');
  fs.readFile(filePath, 'utf8', (userError, userJson) => {
    if (userError) throw userError;
    const activitiesJsonPath = path.join(__dirname, 'activities.json');
    fs.readFile(activitiesJsonPath, 'utf8', (activitiesError, activitiesJson) => {
      if (activitiesError) throw activitiesError;
      const user = JSON.parse(userJson);
      const activities = JSON.parse(activitiesJson).activities;
      const profileActivities = user.profile.activities.map((profileActivity) => {
        const getActivityById = activity => activity._id === profileActivity.activityId;
        const matchingActivity = activities.find(getActivityById);
        return Object.assign(matchingActivity, profileActivity);
      });
      const totalAdjustment = (total, activity) => total + (activity.effect * activity.quantity);
      const adjustment = profileActivities.reduce(totalAdjustment, 0);

      res.status(200).send({ dayTotal: 48 + adjustment });
    });
  });
};

module.exports = getMicrolifeAdjustment;
