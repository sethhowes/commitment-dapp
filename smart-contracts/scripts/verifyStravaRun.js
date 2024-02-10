const new_access_token_payload = {
  client_id: 83375,
  client_secret: '738f6dd8e44e7e614fd22b96b4abf8acf85a9659',
  grant_type: 'refresh_token',
  refresh_token: secrets.REFRESH_TOKEN,
};

const tokenData = await Functions.makeHttpRequest({
  method: 'POST',
  url: 'https://www.strava.com/oauth/token',
  data: new_access_token_payload
});



return Functions.encodeString(tokenData['data']['access_token']);

// const accessToken = tokenData['data']['access_token'];

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