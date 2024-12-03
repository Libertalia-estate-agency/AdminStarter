//import { firestore, auth } from "../../../firebaseAdmin";

import { firestore, auth } from  "@/firebase/firebaseAdmin";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId) {
      // Fetch specific user details
      const userDoc = await firestore.collection("users").doc(userId).get();
      if (!userDoc.exists) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(userDoc.data()), { status: 200 });
    }

    // Fetch all users
    const usersSnapshot = await firestore.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, displayName, role } = body;

    if (!email || !displayName || !role) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Create a new user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      displayName,
    });

    // Save user details in Firestore
    await firestore.collection("users").doc(userRecord.uid).set({
      email,
      displayName,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ uid: userRecord.uid }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID required" }), {
        status: 400,
      });
    }

    // Delete user from Firebase Auth
    await auth.deleteUser(userId);

    // Delete user from Firestore
    await firestore.collection("users").doc(userId).delete();

    return new Response(JSON.stringify({ message: "User deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
