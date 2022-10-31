import React, { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { TouchableOpacity, Text, useColorScheme, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { observer } from 'mobx-react-lite';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontistoIcons from '@expo/vector-icons/Fontisto';

import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppColorScheme } from 'twrnc';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExternalLinkScreen from '~/screens/ExternalLinkScreen';
import HomeScreen from '~/screens/HomeScreen';
import PostScreen from '~/screens/PostScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import SettingScreen from '~/screens/SettingScreen';
import SearchScreen from '~/screens/SearchScreen';
import useTailwind from '~/hooks/useTailwind';
import HistoryScreen from '~/screens/HistoryScreen';
import FavScreen from '~/screens/FavScreen';
import { useStores } from '~/stores';
import QRcodeScreen from '~/screens/QRcodeScreen';
import LoginScreen from '~/screens/LoginScreen';

const Stack = createStackNavigator();

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#F8D44C',
    card: 'black',
    background: 'black',
  },
};

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F8D44C',
    card: '#EFEFEF',
    background: '#EFEFEF',
  },
};

export default AppNavigator = observer(({}) => {
  const { tw, isDark } = useTailwind();
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const { uiStore } = useStores();
  const systemColor = useColorScheme();

  // // restart app
  useEffect(() => {
    uiStore.setSystemColor(systemColor);
    setColorScheme(uiStore.themeColor);
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(uiStore.themeColor == 'dark' ? 'black' : '#EFEFEF');
    }
  }, [systemColor]);

  return (
    <NavigationContainer
      theme={isDark ? MyDarkTheme : MyDefaultTheme}
      onStateChange={(state) => {
        // console.log(state);
      }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: ' ',
          headerLeft: ({ onPress }) => {
            return (
              <TouchableOpacity onPress={onPress}>
                <Ionicons size={28} style={tw`pl-2 text-gray-600 dark:text-neutral-300`} name="arrow-back-outline" />
              </TouchableOpacity>
            );
          },
        }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="ExternalLinkScreen"
          component={ExternalLinkScreen}
          options={({ route }) => ({
            title: '',
            headerRight: (props) => {
              return (
                <TouchableOpacity
                  style={tw`pr-4`}
                  onPress={() => {
                    Linking.openURL(route.params.url);
                  }}>
                  <FontistoIcons size={18} name="world-o" color={isDark ? 'white' : 'black'} />
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={({ route }) => ({
            title: 'Post',
            headerShown: false,
            headerRight: (props) => {
              return (
                <TouchableOpacity
                  style={tw`pr-4`}
                  onPress={() => {
                    WebBrowser.openBrowserAsync(`https://stacker.news/items/${route.params.id}`);
                  }}>
                  <FontistoIcons size={18} name="world-o" color={isDark ? 'white' : 'black'} />
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: 'ReadHistory' }} />
        <Stack.Screen name="FavScreen" component={FavScreen} options={{ title: 'Favorite' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="QRcodeScreen" component={QRcodeScreen} options={{ title: 'QRcode' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={25} style={tw`-mb-1`} name="lightning-bolt-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerShown: true,
          tabBarIcon: ({ color }) => <Ionicons size={30} style={tw`-mb-1`} name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons size={30} style={tw`-mb-1`} name="person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
