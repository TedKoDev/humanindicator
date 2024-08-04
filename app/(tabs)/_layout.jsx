import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "info") {
            iconName = focused ? "information-circle" : "information-circle-outline";
          } else if (route.name === "ad") {
            iconName = focused ? "megaphone" : "megaphone-outline";
          } else if (route.name === "settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name="info" options={{ title: "Info", headerShown: false }} />
      <Tabs.Screen name="ad" options={{ title: "Ad", headerShown: false }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
