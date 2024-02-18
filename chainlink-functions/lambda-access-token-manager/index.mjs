import fetch from 'node-fetch';
import { config } from 'dotenv';
config();
import { SecretsManager } from "@chainlink/functions-toolkit";
import { ethers } from "ethers";
import { createClient } from '@supabase/supabase-js'

// Strava constants
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Secrets constants
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL;

// Supabase constants
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;


// Gets a new access token from Strava using the refresh token
const requestNewAccessToken = async () => {
    const newAccessTokenPayload = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
    };

    const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAccessTokenPayload)
    });

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
    }

    const accessTokenData = await response.json();
    const accessToken = accessTokenData['access_token'];
    return accessToken;
}

// Uploads the new access token to Chainlink secrets
const uploadSecretsMumbai = async (accessToken) => {
    // hardcoded for Polygon Mumbai
    const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
    const donId = "fun-polygon-mumbai-1";
    const gatewayUrls = [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ];
  
    const secrets = { ACCESS_TOKEN: accessToken };
    const slotIdNumber = 0; // slot ID where to upload the secrets
    const expirationTimeMinutes = 240; // expiration time in minutes of the secrets
  
    // Initialize ethers signer and provider to interact with the contracts onchain
    const privateKey = PRIVATE_KEY; // fetch PRIVATE_KEY
    if (!privateKey)
      throw new Error(
        "private key not provided - check your environment variables"
      );
  
    const rpcUrl = POLYGON_MUMBAI_RPC_URL;
  
    if (!rpcUrl)
      throw new Error(`rpcUrl not provided  - check your environment variables`);
    
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    console.log("provider is", provider)
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);
  
    // First encrypt secrets and upload the encrypted secrets to the DON
    const secretsManager = new SecretsManager({
      signer: signer,
      functionsRouterAddress: routerAddress,
      donId: donId,
    });
    await secretsManager.initialize();
  
    // Encrypt secrets and upload to DON
    const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);
  
    console.log(
      `Upload encrypted secret to gateways ${gatewayUrls}. slotId ${slotIdNumber}. Expiration in minutes: ${expirationTimeMinutes}`
    );
  
    // Upload secrets
    const uploadResult = await secretsManager.uploadEncryptedSecretsToDON({
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
      gatewayUrls: gatewayUrls,
      slotId: slotIdNumber,
      minutesUntilExpiration: expirationTimeMinutes,
    });
  
    if (!uploadResult.success)
      throw new Error(`Encrypted secrets not uploaded to ${gatewayUrls}`);
  
    console.log(
      `\n✅ Secrets uploaded properly to gateways ${gatewayUrls}! Gateways response: `,
      uploadResult
    );

    return uploadResult.version;
  }
  
// Uploads a secret to a Supabase table
const uploadSecretsToSupabase = async (secretsId) => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  const { data, error } = await supabase
  .from('secrets')
  .update({ secrets_id: secretsId })
  .match({ account_address: process.env.ACCOUNT_ADDRESS });

  if (error) {
    console.error('Error updating secrets:', error);
  } else {
    console.log('Secrets updated:', data);
  }
};

export const handler = async (event) => {
  const accessToken = await requestNewAccessToken();
  const secretsId = await uploadSecretsMumbai(accessToken);
  await uploadSecretsToSupabase(secretsId);

  const response = {
    statusCode: 200,
    body: JSON.stringify('Secrets uploaded!'),
  };
  return response;
};
