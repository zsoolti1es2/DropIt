import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import RouteScreen from '../screens/RouteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddRouteScreen from '../screens/AddRouteScreen';
import EditRouteScreen from '../screens/EditRouteScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="Route"
      component={RouteScreen}
      options={{
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        title: 'Route Details',
      }}
    />
    <HomeStack.Screen
      name="AddRoute"
      component={AddRouteScreen}
      options={{
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        title: 'Add Route',
      }}
    />
    <HomeStack.Screen
      name="EditRoute"
      component={EditRouteScreen}
      options={{
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        title: 'Edit Route',
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </ProfileStack.Navigator>
);

const Tab = createBottomTabNavigator();

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#e91e63',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Profile" component={ProfileStackScreen} />
  </Tab.Navigator>
);

export default AppStack;
