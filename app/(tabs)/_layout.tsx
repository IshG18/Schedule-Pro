import { Tabs } from "expo-router";

export default function RootLayout(){
    return (
      <Tabs screenOptions={{
        headerShadowVisible: false,
        headerTintColor: "#bfc734",
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
        }}/>

        <Tabs.Screen name="settings" options={{
            title: "Settings",
        }}/>
      </Tabs>
    );
}