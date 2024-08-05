'use client'
import { useState, createContext, Dispatch } from 'react';

const UserContext = createContext({ user:null, setUser:(() => undefined) as Dispatch<any>, notifi:{message:null,type:null}, setNotifi:(() => undefined) as Dispatch<any>});

const UserProvider = ({ children }:any) => {
  const [user, setUser] = useState(null);
  const [notifi, setNotifi] = useState({message:null,type: null});

  return <UserContext.Provider value={{ user, setUser, notifi, setNotifi }}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };