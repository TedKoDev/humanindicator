import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import LottieView from "lottie-react-native";

const WelcomePage = () => {
  const router = useRouter(); // 이 코드는 Expo Router의 useRouter 훅을 사용하여 라우터 객체를 가져오는 코드입니다. 이 라우터 객체를 사용하면 사용자가 화면을 이동할 수 있습니다.
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* welcome image */}
        <LottieView
          source={require("../assets/animations/welcomani.json")} // Lottie JSON 파일 경로
          autoPlay
          loop
          style={styles.welcomeAnimation}
        />
        {/* title */}
        <View style={{ gap: 20, marginTop: hp(5) }}>
          <Text style={styles.title}>인간지표</Text>
          <Text style={styles.punchline}>당신의 인간지표력을 보여주세요.</Text>
        </View>

        <View style={styles.footer}>
          <Button title="시작하기" buttonStyle={{ marginHorizontal: wp(3) }} onPress={() => router.push("signUp")} />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>이미 계정이 있습니다.!</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={[styles.loginText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: wp(5),
  },
  welcomeAnimation: {
    height: hp(40),
    width: wp(100),
    // backgroundColor: "black",
    alignSelf: "center",
  },

  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
  },
  footer: {
    marginTop: hp(15),
    gap: 30,
    width: "100%",
  },

  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(2),
  },
});

export default WelcomePage;
