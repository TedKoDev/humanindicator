import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import BackButton from "../components/BackButton";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";
import Icon from "../assets/icons";
import Input from "../components/Input";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields!");
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Login", error.message);
    setLoading(false);

    // setLoading(true);
  };
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* back button */}
        <View>
          <BackButton router={router} />
        </View>

        {/* welcome */}
        <View>
          <Text style={styles.welcomeText}>인간지표여</Text>
          <Text style={styles.welcomeText}>잘 돌아왔소.</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>로그인 해주세요.</Text>
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="이메일을 입력해 주세요."
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            secureTextEntry
            placeholder="비밀번호를 입력해 주세요."
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (passwordRef.current = value)}
          />
          <Text style={styles.forgotPassword}>비밀번호를 잊으셨나요?</Text>

          {/* button */}
          <Button title="로그인" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>계정이 없으신가요?</Text>
          <Pressable onPress={() => router.navigate("/signUp")}>
            <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});

export default Login;
