import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from 'firebase/auth';
import { firebase } from '../../firebase/config';


export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async({name, password, email, remember_me}, {cookies}) => {

    if(remember_me){
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/'
      })
    }else {
      cookies.delete('email', {
        path: '/'
      })
    }
       try {

      const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

      updateProfile(firebase.auth.currentUser!, {
        displayName: name
      })

      //VERIFICAR CORREO
      await sendEmailVerification(firebase.auth.currentUser!, {
        url: `${import.meta.env.WEBSITE_URL}/protected?verified=true`
      });

      //ACTUALIZAR EL NOMBRE (displayName)
      //VERIFICAR correo 
      console.log("UUSSEERR",user)
      //return user;
      


      
    } catch (error) {
      const firebaseError = error as AuthError;
      if(firebaseError.code === 'auth/email-already-in-use'){
        throw new Error('El correo ya se encuentra registrado')

      }
      const c = firebaseError.message
      throw new Error(`Auxiliooo... algo malió sal ${c}`, { cause: error })
      
    }


    //return { ok: true, msg: 'Usuario creado' }
  }
  
})
