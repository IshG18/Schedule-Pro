import { Tabs } from "expo-router";

export default function RootLayout(){
    return (
      <Tabs screenOptions={{
        headerShadowVisible: false,
        headerTintColor: "#bfc734",
        headerStyle: {backgroundColor: "#1C1D1D"},
        tabBarStyle: {backgroundColor: "#1C1D1D"},
      }}>

        <Tabs.Screen name="index" options={{
            title: "My Calendar",
        }}/>

        <Tabs.Screen name="settings" options={{
            title: "Settings",
        }}/>
      </Tabs>
    );
}