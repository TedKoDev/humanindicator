import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";
import { LogBox } from "react-native";

// 특정 경고 로그 메시지를 무시하도록 설정
LogBox.ignoreLogs(["Warning: TNodeChildrenRenderer", "Warning: MemoizedTNodeRenderer", "Warning: TRenderEngineProvider"]);

// _layout 컴포넌트는 AuthProvider를 사용하여 인증 상태를 관리하고 MainLayout을 렌더링합니다.
const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

// MainLayout 컴포넌트는 애플리케이션의 메인 레이아웃을 정의하고, 인증 상태 변경에 따라 화면을 전환합니다.
const MainLayout = () => {
  const { setAuth, setUserData } = useAuth(); // 인증 상태를 설정하는 훅
  const router = useRouter(); // 라우터 훅을 사용하여 화면 전환

  useEffect(() => {
    // 인증 상태가 변경될 때 자동으로 트리거됩니다.
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("session: ", session?.user?.id);
      if (session) {
        setAuth(session?.user); // 사용자 인증 정보 설정
        updateUserData(session?.user); // 사용자 데이터를 업데이트 (이미지, 전화번호, 바이오 등)

        // console.log("session:!@@@@@@ ", session.user);
        router.replace("/home"); // 인증된 사용자는 홈 화면으로 이동
      } else {
        setAuth(null); // 인증 정보가 없으면 null로 설정
        router.replace("/welcome"); // 인증되지 않은 사용자는 환영 화면으로 이동
      }
    });
  }, []);

  // 사용자 데이터를 업데이트하는 비동기 함수
  const updateUserData = async (user) => {
    let res = await getUserData(user.id);
    console.log("res: ", res);
    if (res.success) setUserData(res.data); // 사용자 데이터를 성공적으로 가져오면 상태를 업데이트
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false, // 헤더를 숨깁니다.
      }}
    ></Stack>
  );
};

export default _layout;
