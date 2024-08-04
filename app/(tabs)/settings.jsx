import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";

const SettingsScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        {/* 설정 화면에 필요한 내용을 추가합니다 */}
      </View>
    </ScreenWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
