import React, { useEffect } from 'react';
import * as Linking from 'expo-linking';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import FontistoIcons from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { Platform, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useAppColorScheme } from 'twrnc';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import { useStores } from '~/stores';
import ExternalLinkScreen from '~/screens/ExternalLinkScreen';
import FavScreen from '~/screens/FavScreen';
import HistoryScreen from '~/screens/HistoryScreen';
import HomeScreen from '~/screens/HomeScreen';
import LoginScreen from '~/screens/LoginScreen';
import PostScreen from '~/screens/PostScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import PublishScreen from '~/screens/PublishScreen';
import QRcodeScreen from '~/screens/QRcodeScreen';
import SearchScreen from '~/screens/SearchScreen';
import SettingScreen from '~/screens/SettingScreen';
import WalletReceiveScreen from '~/screens/WalletReceiveScreen';
import WalletScreen from '~/screens/WalletScreen';

// import WalletSendScreen from '~/screens/WalletSendScreen';

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
        <Stack.Screen name="PublishScreen" component={PublishScreen} options={{ title: 'Publish' }} />
        <Stack.Screen name="FavScreen" component={FavScreen} options={{ title: 'Favorite' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="QRcodeScreen" component={QRcodeScreen} options={{ title: 'QRcode' }} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} options={{ title: 'Wallet' }} />
        <Stack.Screen name="WalletReceiveScreen" component={WalletReceiveScreen} options={{ title: 'Receive' }} />
        {/* <Stack.Screen name="WalletSendScreen" component={WalletSendScreen} options={{ title: 'Send' }} /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  const { profileStore } = useStores();
  const { data: meData } = StackerNews.me();

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
          tabBarIcon: ({ color }) => (
            <View style={tw`relative`}>
              {profileStore.shouldNotify && meData?.hasNewNotes && (
                <View style={tw`bg-red-500 absolute top-0 right-0 rounded-full w-2 h-2`} />
              )}
              <Ionicons size={30} style={tw`-mb-1`} name="person-outline" color={color} />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
