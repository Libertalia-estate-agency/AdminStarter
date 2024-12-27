import { NextResponse } from "next/server";
import { user } from "../data";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";

import { firestore, auth } from  "@/firebase/firebaseAdmin";
import { getAccessToken } from "./accessToken.js";
import axios from "axios";

export async function POST(request, response) {
  try {

    let reqBody = await request.json();
    console.log("API USER REGISTER :::: REQ BODY :::: ", JSON.stringify(reqBody))
    //const body = JSON.parse(reqBody);
    //console.log("API USER REGISTER :::: PARSED BODY :::: ", body)
    
    const { email, name, uid, password } = reqBody;
    console.log("API USER REGISTER :::: EMAIL, NAME, ROLE :::: ", email, name, password,uid);
    
    const foundUser = user.find((u) => u.email === reqBody.email);
    console.log("API USER REGISTER :::: foundUser?| :::: " , foundUser);
    
    /**
    // Create a new user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      name,
      role,
    });
    */

    
    try {
      const token = await getAccessToken();
      const registerResponse = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
        { email, password, returnSecureToken: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("API USER REGISTER :::: userRecord :::: " + JSON.stringify(registerResponse));

      response.status(200).json(registerResponse.data);
    } catch (error) {
      res.status(400).json({ error: error.registerResponse.data });
    }

    // Save user details in Firestore
    await firestore.collection("users").doc(uid).set({
      email,
      name,
      role: 'Agent',
      createdAt: new Date().toISOString(),
    }).then(() => console.log("User added successfully"));

    if (foundUser) {
      return NextResponse.json({
        status: "fail",
        message: "User already exists",
      });
    }

    reqBody.id = user.length + 1;

    reqBody.image = avatar3;
    user.push(reqBody);

    
    return NextResponse.json({
      uid: userRecord.uid,
      status: "success",
      message: "User created successfully",
      data: reqBody,
    });



  } catch (e) {
    console.log("An error occurred:", e);
    return NextResponse.json({
      status: "fail",
      message: "Something went wrong",
      data: e,
    });
  }
}
