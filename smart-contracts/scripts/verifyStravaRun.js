const accessToken = secrets.ACCESS_TOKEN;

const strava_activity_url = 'https://www.strava.com/api/v3/athlete/activities';

const start_timestamp = args[0];
const end_timestamp = args[1];

const activity_query_params = {
  before: end_timestamp,
  after: start_timestamp,
  page: 1,
  per_page: 1
};

const headers = { Authorization: `Bearer ${accessToken}` };

const apiResponse = await Functions.makeHttpRequest({
  url: strava_activity_url,
  params: activity_query_params,
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