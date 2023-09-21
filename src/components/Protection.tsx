import React from 'react'
import { getAuth } from "firebase/auth";
import { app } from '../firebase/config';

const Protection = (children: React.ReactNode) => {

    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user !== null) {
        console.log(user)

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        // const uid = user.uid;
    }
    return (
        <div>{children}</div>
    )
}

export default Protection