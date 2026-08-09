import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout(){
    return (
      <Tabs screenOptions={{
        headerShadowVisible: false,
        headerTintColor: "#acd54b",
        headerStyle: {
          backgroundColor: "#161717",
          height: 80,
          borderTopWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: "#161717",
          height: 58,
        },
      }}>

        <Tabs.Screen name="index" options={{
            title: "Schedule Pro",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
            ),
        }}/>

        <Tabs.Screen name="calendar" options={{
            title: "Calendar",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "calendar" : "calendar-outline"} size={size} color={color} />
            ),
        }}/>

        <Tabs.Screen name="settings" options={{
            title: "Settings",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />
            ),
        }}/>

      </Tabs>
    );
}