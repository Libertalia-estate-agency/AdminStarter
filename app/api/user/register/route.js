import { NextResponse } from "next/server";
import { user } from "../data";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";

//import { firestore, auth } from  "@/firebase/firebaseAdmin";
import axios from "axios";

import { db } from "@/firebase/index";
import { doc, setDoc } from "firebase/firestore";

import { auth } from  "@/firebase/index";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

//import admin from "firebase-admin";
import { firestore, auth as authy, admin } from  "@/firebase/firebaseAdmin";
/***
 * 
 * 
 * 
 *
 * 
 * 
 */

export async function POST(request, response) {

  try {


    let reqBody = await request.json();
    console.log("API USER REGISTER :::: REQ BODY :::: ", JSON.stringify(reqBody))
    //const body = JSON.parse(reqBody);
    //console.log("API USER REGISTER :::: PARSED BODY :::: ", body)
    
    const { email, name, password } = reqBody;
    console.log("API USER REGISTER :::: EMAIL, NAME, ROLE :::: ", email, name, password);
    
    
    let userId = '';
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userObj) => {
  
      //console.log("REG FORM ::: userObj ::: " + JSON.stringify(userObj));
  
      console.log("CREATE USER WITH EMAIL AND PASSWORD RESPONSE ::: " + JSON.stringify(userObj.user.uid));
      userId = userObj.user.uid;
      
      //const user = userCredential.user;
      //console.log("HANDLE REGISTER ::: CREATED USER ::: " + JSON.stringify(user));
      //router.push("/");
      //window.location.assign("/");
      //reset();
  
      /** 
      // Save user details to Firestore
      await setDoc(doc(db, "users", userObj.user.uid), {
        name: name,
        email: email,
        role: "agent", // Default role
        createdAt: new Date().toISOString(),
      }).then(async (result) => {
        console.log("SET DOCUMENT RESULT ::: " + JSON.stringify(result));
      })  */

        
    return new Response(JSON.stringify(userId), { status: 200 });
  
    });
  
    return new Response({ status: 200 });


  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }

}

/**
 * 
 * 
export async function POST(request, response) {
  try {
/**
 * 
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(require("./serviceAccount.json")),
      });
    }

    const database = admin.firestore(); */

   
    //const foundUser = user.find((u) => u.email === reqBody.email);
    //console.log("API USER REGISTER :::: foundUser?| :::: " , foundUser);



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
  
        //console.log({ uid: userObj.user.uid, email: userObj.user.email });
        
      }).then(async () => {

        //const user = userCredential.user;
        //console.log("HANDLE REGISTER ::: CREATED USER ::: " + JSON.stringify(user));
        //objUser.uid = userObj.user.uid;
          //console.log("REG FORM ::: objUser ::: " + JSON.stringify(objUser));

         

      }).catch((error) => {
        console.error("Error creating user:", error);
        //toast.error(error.message);
      });

      /**
        // Save user details to Firestore      
        await firestore.collection("users").doc(userId).set({
          name,
          email,
          role: 'Agent',
          createdAt: new Date().toISOString(),
        }).then(() => {
          console.log("User details saved to Firestore");
        });
 */

      
        
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

    *

    return response.json({
      status: "success",
      message: "User created successfully"
    });



  } catch (e) {
    console.log("An error occurred:", e);
    return response.json({
      status: "fail",
      message: "Something went wrong",
      data: e,
    });
  }
}

*/


 