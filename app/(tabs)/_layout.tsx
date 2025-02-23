import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabsLayout() {
  return (
    <>
      <Redirect href="/list" /> {/* Ensures default navigation to list */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#D9D9D9",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#000000",
            borderTopColor: "#000000",
            borderTopWidth: 2,
            justifyContent: "space-around", // Ensures equal spacing
            paddingHorizontal: 20, // Optional: Adjust spacing
          },
          tabBarShowLabel: false, // Hide labels
        }}
      >
        <Tabs.Screen
          name="list"
          options={{
            title: "List",
            headerShown: false,
            tabBarIcon: () => (
              <MaterialIcons name="checklist-rtl" size={24} color="white" />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome5 name="calendar-alt" size={24} color="white" />
            ),
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: "Chatbot",
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome6 name="hand-holding-medical" size={18} color="white" />
            ),
          }}
        />
        <Tabs.Screen 
           name="explore" 
          options={{ headerShown: false, tabBarButton: () => null }} 
        />
      </Tabs>
    </>
  );
}
