"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/config"; // Adjust path as needed

export default function AuthTest() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setMessage(`User created: ${userCredential.user.email}`);
            console.log(`User created: ${userCredential.user.email}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.log(`Error: ${error.message}`);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setMessage(`Logged in as: ${userCredential.user.email}`);
            console.log(`Logged in as: ${userCredential.user.email}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.log(`Error: ${error.message}`);
        }   
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setMessage("Logged out successfully.");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Firebase Authentication Test</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <button onClick={handleSignUp}>Sign Up</button>
                <button onClick={handleLogin}>Log In</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <p>{message}</p>
        </div>
    );
}
