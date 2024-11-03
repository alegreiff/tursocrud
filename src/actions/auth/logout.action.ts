import { defineAction } from "astro:actions";

import { firebase } from "../../firebase/config";
import { signOut } from "firebase/auth";


export const logout = defineAction({
  accept: 'json',
  handler: async () => {
    //return await signOut(firebase.auth);
    //await firebase.auth.signOut();

    return await signOut(firebase.auth);
    
  }

})