import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const Gettoken = Cookies.get('token');
    const GetuserId = Cookies.get('userId');
    const Getname = Cookies.get('name');
    const Getemail = Cookies.get('email');
    const GetprofileImage = Cookies.get('profileImage');
    const GetAuthentication = Cookies.get('Authentication');

    if (GetAuthentication === 'true') {
      setIsAuthentication(true);
    } else {
      setIsAuthentication(false);
    }

    
    if (Gettoken) setToken(Gettoken);
    if (GetuserId) setUserId(GetuserId);
    if (Getname) setName(Getname);
    if (Getemail) setEmail(Getemail);
    if (GetprofileImage) setProfileImage(GetprofileImage);
  }, []);

  const value = {
    isAuthentication,
    setToken,
    token,
    setIsAuthentication,
    userId,
    setUserId,
    name,
    setName,
    email,
    setEmail,
    profileImage,
    setProfileImage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
