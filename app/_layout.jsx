//_layout.jsx 파일이 Expo Router를 사용하여 애플리케이션의 전반적인 레이아웃 구조를 정의하기 때문입니다. _layout.jsx 파일이 없으면 각 화면은 자체적으로 렌더링되어 레이아웃 구조가 깨질 수 있습니다. _layout.jsx 파일을 사용하면 전체 애플리케이션의 일관된 레이아웃을 유지할 수 있습니다.

import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default _layout;
