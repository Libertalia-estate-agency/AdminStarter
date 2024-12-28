import { NextResponse } from "next/server";
import { user } from "../data";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";

//import { firestore, auth } from  "@/firebase/firebaseAdmin";
import { getAccessToken } from "./accessToken.js";
import axios from "axios";

import { db } from "@/firebase/index";
import { doc, setDoc } from "firebase/firestore";

import { auth } from  "@/firebase/index";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export async function POST(request, response) {
  try {

    let reqBody = await request.json();
    console.log("API USER REGISTER :::: REQ BODY :::: ", JSON.stringify(reqBody))
    //const body = JSON.parse(reqBody);
    //console.log("API USER REGISTER :::: PARSED BODY :::: ", body)
    
    const { email, name, password } = reqBody;
    console.log("API USER REGISTER :::: EMAIL, NAME, ROLE :::: ", email, name, password);
    
    //const foundUser = user.find((u) => u.email === reqBody.email);
    //console.log("API USER REGISTER :::: foundUser?| :::: " , foundUser);

    
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userObj) => {
        
        console.log("CREATE USER WITH EMAIL AND PASSWORD RESPONSE ::: " + JSON.stringify(userObj.user.uid));
        //objUser.uid = userObj.user.uid;
        //console.log("REG FORM ::: objUser ::: " + JSON.stringify(objUser));

      
        // Save user details to Firestore
        await setDoc(doc(db, "users", userObj.user.uid), {
          name,
          email,
          role: 'Agent',
          createdAt: new Date().toISOString(),
        });
        
        //const user = userCredential.user;
        //console.log("HANDLE REGISTER ::: CREATED USER ::: " + JSON.stringify(user));
        //router.push("/");
        //window.location.assign("/");
        //reset();

        /**
        // Save user details to Firestore
        await setDoc(doc(db, "users", userObj.user.uid), {
          fullName: data.name,
          email: data.email,
          role: "agent", // Default role
          createdAt: new Date().toISOString(),
        }).then(async (result) => {
          console.log("SET DOCUMENT RESULT ::: " + JSON.stringify(result));

          /**
           // Send email verification
            await sendEmailVerification(userObj.user).then(() => {
              console.log("Verification email sent to", userObj.user.email);
              reset();
              router.push("/login");
            }).catch((error) => {
              console.error("Error sending verification email:", error);
            });
        });
        */
        //console.log({ uid: userObj.user.uid, email: userObj.user.email });
        
      }).catch((error) => {
        console.error("Error creating user:", error);
        //toast.error(error.message);
      });

      const user = userCredential.user;
      console.log("HANDLE REGISTER ::: CREATED USER ::: " + JSON.stringify(user));
    
/**

    const registerResponse = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
      console.log("API USER REGISTER :::: userRecord :::: " + JSON.stringify(registerResponse));

      response.status(200 ).json(registerResponse.data);
    


    if (foundUser) {
      return NextResponse.json({
        status: "fail",
        message: "User already exists",
      });
    }

    reqBody.id = user.length + 1;

    reqBody.image = avatar3;
    user.push(reqBody);

    */

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
