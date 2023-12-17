import React, { FC, createContext, useState, useEffect } from "react";

import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { 
  auth, 
  db, 
  getById, 
  googleAuthProvider 
} from "../services";
import { User } from '../models/user';
import { API_BASE_URL, fetchApi } from "../utils";

interface UserProps extends User {
  accessToken?: string;
};



const defaultUser: UserProps = {
  id: "",
  uid: "",
  name: "",
  email: "",
  displayName: "",
  photoURL: "",
  token: "",
}

const defaultReturn = async () => {};

interface AuthProps { 
  loading: boolean,
  user: UserProps,
  userId: string,
  login: any,
  logout: any,
}

export const defaultContext : AuthProps = {
    loading: false,
    user: defaultUser,
    userId: '',
    login: defaultReturn,
    logout: () => {},
}

const mockUser = {
  id: "0730ffac-d039-4194-9571-01aa2aa0efbd",
  email: "Triston53@hotmail.com",
  name: "Rachael Satterfield",
  password: "1e1e3180-99ee-49ee-9d66-4d9a0b6ad125",
  token: "1e1e3180-99ee-49ee-9d66-4d9a0b6ad125",
  photoURL: "http://placeimg.com/640/480",
  createdAt: "2023-12-17T18:26:25.999Z",
  updatedAt: "2023-12-17T18:26:25.999Z"
};


const fetchUserByEmail = async (email : string): Promise<User> => {
  try {
    const url = `${API_BASE_URL}/users?email=${email}`;
    const response = await fetchApi<any, User>({
      method: 'GET',
      url,
    });
    return response as User;
  } catch (error) {
    throw error;
  }
};

const fetchCreateUser = async (userInput : User): Promise<User> => {
  try {
    const url = `${API_BASE_URL}/users`;
    const response = await fetchApi<any, User>({
      method: 'POST',
      url,
      body: userInput
    });
    return response as User;
  } catch (error) {
    throw error;
  }
};

const handleLoginOrSignUp = async (userInput : UserProps) => { 
  try {
    if(!userInput || !userInput.email) return;

    const userResponse = await fetchUserByEmail(userInput?.email);
    if(userResponse) {
      console.log('[handleLoginOrSignUp]: userResponse, by email: ok => ', userResponse.id);
      return userResponse
    }
    const newUserResponse = await fetchCreateUser({
      uid: userInput.uid,
      name: userInput.name,
      email: userInput.email,
      token: userInput.accessToken || '',
      photoURL: userInput.photoURL,
      password: userInput.accessToken || '',
      id: userInput.uid,
      displayName:  userInput.name
    });
    console.log('[handleLoginOrSignUp]: userResponse, by email: not found created => ', newUserResponse.id);
    return newUserResponse;
  } catch {
    throw new Error('Erro ao criar usuário');
  }
 
}


const AuthContext = createContext(defaultContext);
const AuthProvider : FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserProps | undefined>();
  const [loading, setLoading] = useState(true);
  const USER_COLLECTION_NAME = 'users';
  // TODO : social login precisa ter com apple tbm, usando platform

  const getUser = async () => {
    setLoading(true);
    await onAuthStateChanged(auth, async (user : any) => {
      try {
        if (user) {
          // Google request
          const userResponse = await getById({
            collectionName: USER_COLLECTION_NAME,
            ...user,
            id: user?.uid,           
          });
  
          const userInput = {
            ...user, 
            ...userResponse,
            id: user.id,
            uid: user.id,
          }
  
          // Merge google user with system user
          const useSystemResponse = await handleLoginOrSignUp(userInput);
          setUser((prevState : any) => ({
            ...prevState, 
            ...useSystemResponse
          }));
          setLoading(false);
          console.log('[GetUser]: response => ', useSystemResponse, ' user: ', user);
        } else {
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
     
    });
  };

  useEffect(() => {
    if(!user?.uid || !user) {
      console.log('[AuthContext] :  start');
      (async () => {
          await getUser();
      })();
    }
  }, [user?.uid]);

  const handleLogin = async () : Promise<any> => {
    console.log('[Init][handleLogin] : User ');
    await signInWithPopup(auth, googleAuthProvider)
    .then((response : any) => {
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential?.accessToken;
      const user = response.user;
      setUser((prevState : any) => ({
        ...prevState, 
        ...user,
        accessToken: token,
      }));
      console.log('[Success][handleLogin] : User ', user, ' Token: ', token);
      return user;
    })
    .catch((error: any) => {       
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('[Error][handleLogin]:', error, ' credential: ', credential);
    }).finally(() => console.log('[Finally] : handleLogin'))
    
  };

  const fakeLogin = () => {
    setLoading(true);
    setUser((prevState : any) => ({
      ...prevState, 
      ...mockUser
    }));
    setLoading(false); 
  }


  const handleLogout = async () => {
    signOut(auth);
    setUser(undefined);
    return user;
  };

  return (
    <AuthContext.Provider value={{ 
        loading,
        user: user ?? defaultUser,
        userId: user?.id as string,
        login: fakeLogin,
        logout: handleLogout
    }}>
      {loading || children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };