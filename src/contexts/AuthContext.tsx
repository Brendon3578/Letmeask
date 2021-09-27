import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";
import noAvatarImg from '../assets/images/no-avatar.svg'
import { pushToast } from './../components/ToastComponent/index';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();

useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged(user => {
    if (user) {
      const { displayName, email , photoURL, uid } = user
      
      if (!displayName || !email ) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL || noAvatarImg,
        email: email
      })
    }

    return () => {
      unsubscribe();
    }
    
  })
}, [])

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await auth().signInWithPopup(provider).catch(error =>
      {
        console.log(`Ocorreu um erro: ${error.code}\n${error.message}`)
        pushToast('Login não efetuado', 'error')
        return null;
      }
    )

    // catch login error
    if (result === null){
      return;
    }



  if (result.user){
    const { displayName, email , photoURL, uid } = result.user
    
    if (!displayName || !photoURL || !email ) {
      throw new Error('Missing information from Google Account.')
    }

    setUser({
      id: uid,
      name: displayName,
      email: email,
      avatar: photoURL
    })
  }
}
  async function signOut() {
    await firebase.auth().signOut().then(() => {
    }).catch((error) => {
      throw new Error(error)
    });
    // set user state as undefined is essential to see the effect visually. 
    setUser(undefined)
  }


  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}