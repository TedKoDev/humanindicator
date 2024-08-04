import React, { createContext, useState, useContext } from "react";

// 사용자 인증 정보를 관리하기 위한 컨텍스트를 생성합니다.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보를 저장하는 상태

  const setAuth = (authUser) => {
    setUser(authUser); // 인증된 사용자 정보를 설정
  };

  const setUserData = (userData) => {
    setUser({ ...userData }); // 사용자 데이터를 업데이트
  };

  return <AuthContext.Provider value={{ user, setAuth, setUserData }}>{children}</AuthContext.Provider>;
};

// AuthContext를 쉽게 사용할 수 있도록 하는 훅
export const useAuth = () => useContext(AuthContext);
