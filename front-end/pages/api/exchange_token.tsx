import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";
import { parse } from "url";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const CLIENT_ID = 83375;
  const CLIENT_SECRET = "738f6dd8e44e7e614fd22b96b4abf8acf85a9659";

  if (req.method == "GET") {
    const url = req.url;
    const parsedUrl = parse(url, true);
    const exchangeToken = parsedUrl.query.code;
    const scope = parsedUrl.query.scope;
    const accountAddress = parsedUrl.query.state;
    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: exchangeToken,
      grant_type: "authorization_code",
    };
    const queryString = querystring.stringify(params);
    const baseURL = "https://www.strava.com/oauth/token";
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const jsonResponse = await response.json();
    // Create supabase object
    const supabase = createClient(
      "https://kjktqtdknkmbkmoopedk.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqa3RxdGRrbmttYmttb29wZWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzOTEwOTYsImV4cCI6MTk5Mzk2NzA5Nn0.Ra6kaeHtAZAnRLi7uOEpaCiQcsp1WBIJCJvsxi0LcWE"
    );
    const { error } = await supabase.from("strava").insert({
      account_address: accountAddress,
      access_token: jsonResponse.access_token,
      refresh_token: jsonResponse.refresh_token,
      expiration_time: jsonResponse.expires_at,
    });
    res.redirect(302, "http://localhost:3000/");
  }
}
