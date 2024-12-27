import { GoogleAuth } from "google-auth-library";

export const getAccessToken = async () => {
  const auth = new GoogleAuth({
    keyFile: "@/firebase/serviceAccount.json",
    scopes: ["https://www.googleapis.com/auth/firebase"],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
};
