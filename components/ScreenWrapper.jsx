import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({ children, bg }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  return <View style={{ flex: 1, paddingTop, backgroundColor: bg }}>{children}</View>;
}; // 이 컴포넌트는 화면의 상단에 안전한 영역을 만들어주는 컴포넌트입니다. 이것은 화면의 상단에 있는 상태바와 겹치지 않도록 해줍니다. ios에서는 상태바가 있고 안드로이드에서는 없기 때문에 이 컴포넌트를 사용하면 안드로이드에서도 상태바와 겹치지 않도록 해줍니다.

export default ScreenWrapper;
