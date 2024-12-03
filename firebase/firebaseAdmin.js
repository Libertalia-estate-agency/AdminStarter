import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://libertalia-properties-623a9-default-rtdb.firebaseio.com", // Update with your database URL
  });
}

export const firestore = admin.firestore();
export const auth = admin.auth();
export default admin;
