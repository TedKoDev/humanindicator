import { StyleSheet, Text, View, Pressable, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";
import Avatar from "../../components/Avatar";
import { hp, wp } from "../../helpers/common";

const InfoScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    // Fetch info data here and update the state
    // Example: setInfoData(fetchedData);
  }, []);

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Pressable>
            <Text style={styles.title}>정보</Text>
          </Pressable>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("profile")}>
              <Avatar uri={user?.image} size={hp(4.3)} rounded={theme.radius.sm} style={{ borderWidth: 2 }} />
            </Pressable>
          </View>
        </View>

        {/* info content */}
        <FlatList
          data={infoData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
  },
  infoCard: {
    padding: 15,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.grayLight,
    marginBottom: 10,
  },
  infoText: {
    fontSize: hp(2),
    color: theme.colors.text,
  },
});

export default InfoScreen;
