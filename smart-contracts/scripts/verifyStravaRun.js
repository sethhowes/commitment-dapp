const accessToken = secrets.ACCESS_TOKEN;

const stravaActivityUrl = 'https://www.strava.com/api/v3/athlete/activities';

const completionDate = args[0];

const activityQueryParams = {
  before: completionDate,
  after: completionDate - 60*24*60,
  page: 1,
  per_page: 1
};

const headers = { Authorization: `Bearer ${accessToken}` };

const apiResponse = await Functions.makeHttpRequest({
  url: stravaActivityUrl,
  params: activityQueryParams,
  headers: headers
});

if (apiResponse.error) {
  console.log(apiResponse);
  throw Error('Request failed');
};

// Return if run was completed
if (apiResponse['data'] == '') {
  return Functions.encodeString('false');
};

// Check to see if run was recorded on Garmin
if (!apiResponse['data'][0]['external_id'].includes('garmin')) {
  return Functions.encodeString('false');
};

return Functions.encodeString('true');