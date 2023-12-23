import React, { FC, createContext, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';

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

const defaultReturn = async () => { };

interface AuthProps {
  loading: boolean,
  user: UserProps,
  userId: string,
  login: any,
  logout: any,
}

export const defaultContext: AuthProps = {
  loading: false,
  user: defaultUser,
  userId: '',
  login: defaultReturn,
  logout: () => { },
}

const mockUser = {
  id: "0730ffac-d039-4194-9571-01aa2aa0efbd",
  email: "lemon@lemon.dev.br",
  name: "Lemon.dev",
  password: "123456",
  token: "0730ffac-d039-4194-9571-01aa2aa0efbd",
  photoURL: "https://avatars.githubusercontent.com/u/15092575?s=48&amp;v=4",
  createdAt: "2023-12-17T18:26:25.999Z",
  updatedAt: "2023-12-17T18:26:25.999Z"
};


const fetchUserByEmail = async (email: string): Promise<User> => {
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

const fetchCreateUser = async (userInput: User): Promise<User> => {
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


const handleLoginOrSignUp = async (userInput: UserProps) => {
  try {
    if (!userInput || !userInput.email) return;

    const userResponse = await fetchUserByEmail(userInput?.email);
    if (userResponse) {
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
      displayName: userInput.name
    });
    console.log('[handleLoginOrSignUp]: userResponse, by email: not found created => ', newUserResponse.id);
    return newUserResponse;
  } catch {
    throw new Error('Erro ao criar usuário');
  }

}

const AuthContext = createContext(defaultContext);
const AuthProvider: FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserProps | undefined>();
  const [userToken, setUserToken] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid || !user) {

      (async () => {
        // await handleLoginOrSignUp(user as UserProps);
      })();
    }
    console.log('[AuthContext] :  start : user chagend => ', user);
    setLoading(false);
  }, [user?.uid, userToken]);



  const fakeLogin = () => {
    setLoading(true);
    setUser((prevState: any) => ({
      ...prevState,
      ...mockUser
    }));
    setUserToken(mockUser.token);
    setLoading(false);
  }


  const handleLogout = async () => {
    setUser(undefined);
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