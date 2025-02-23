import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFonts } from 'expo-font'
import { useEffect } from 'react'


const TabsLayout = () => {
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D9D9D9",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#000000",
          borderTopWidth: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarShowLabel: false, // Hide labels
    }}>

      <Tabs.Screen
      name="list"
      options={{
          title: "list",
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="checklist-rtl" size={24} color="white" />
          ),
        }}
        />
        <Tabs.Screen
        name="calendar"
        options={{
            title: "calendar",
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="calendar-alt" size={24} color="white" />
            ),
        }}
        />
        <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="search1" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout