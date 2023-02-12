import CookieManager from '@react-native-cookies/cookies';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import * as WebBrowser from 'expo-web-browser';
import * as NavigationBar from 'expo-navigation-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { useAppColorScheme } from 'twrnc';
import Text from '~/components/common/Text';
import { useStores } from '~/stores';
import useTailwind from '~/hooks/useTailwind';
import ProfileHeader from '~/components/ProfileHeader';
import Container from '~/components/Container';
import { StackerNews } from '~/services/api';

export default SettingScreen = observer(({ navigation }) => {
  const SettingItem = ({ icon, name, onPress, hasNotification }) => {
    return (
      <TouchableOpacity
        style={tw`mx-4 py-4 border-t border-gray-200 dark:border-gray-900 flex-row items-center justify-between`}
        onPress={onPress}>
        <View style={tw`flex-row items-center`}>
          {hasNotification ? (
            <MaterialCommunityIcons name="bell-badge" style={tw`text-xl text-red-500`} />
          ) : (
            <Feather name={icon} style={tw`text-xl dark:text-neutral-100`} />
          )}

          <Text style={tw`ml-2`}>{name}</Text>
        </View>
        <Feather name="arrow-right" style={tw`text-xl dark:text-neutral-100`} />
      </TouchableOpacity>
    );
  };
  const ThemeItem = observer(({ icon, name }) => {
    const onChangeTheme = (name) => {
      uiStore.setAppearanceMode(name);
      setColorScheme(uiStore.themeColor);
      if (Platform.OS === 'android') {
        setTimeout(
          () => NavigationBar.setBackgroundColorAsync(uiStore.themeColor == 'dark' ? 'black' : '#EFEFEF'),
          200
        );
      }
    };

    return (
      <View
        style={tw`mx-4 pb-2 pt-4 border-t border-gray-200 dark:border-gray-900 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Feather name={icon} style={tw`text-xl dark:text-neutral-100`} />
          <Text style={tw`ml-2`}>{name}</Text>
        </View>
        <View style={tw`flex-row`}>
          {['dark', 'light', 'auto'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => onChangeTheme(item)}
              style={tw`ml-4 p-2 rounded-md  ${
                item === uiStore.appearance ? 'dark:bg-gray-700 bg-neutral-200' : 'dark:bg-gray-900 bg-neutral-100'
              }`}>
              <Text style={tw`text-xs`}>{_.capitalize(item)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  });
  const { tw } = useTailwind();
  const { uiStore, profileStore, postStore } = useStores();
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const { data: meData } = StackerNews.me();
  const openLoginPage = () => {
    navigation.push('LoginScreen');
  };

  const onShare = async () => {
    const result = await Share.share({
      title: 'Bsats is a simple Stacker News client for iOS and Android',
      message: 'Bsats is a simple Stacker News client for iOS and Android',
    });
  };

  const onSignOut = () => {
    CookieManager.clearAll(true);
    // remove cookie
    const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
    RCTNetworking.clearCookies(() => {});
    profileStore.logout();
  };
  return (
    <Container>
      <ScrollView style={tw`mt-6 flex-col flex-1 `}>
        {profileStore.isLogin ? (
          <ProfileHeader name={profileStore.username} />
        ) : (
          <TouchableOpacity style={tw`flex-col items-center justify-center py-8 px-4`} onPress={openLoginPage}>
            <Ionicons name="person-circle-outline" style={tw`text-6xl text-gray-500 dark:text-neutral-100`} />
            <Text>Login in</Text>
          </TouchableOpacity>
        )}

        <View style={tw`mt-2`}>
          {profileStore.isLogin && (
            <>
              <SettingItem
                icon="user"
                name="My Profile"
                onPress={() => {
                  navigation.push('ProfileScreen', {
                    name: profileStore.username,
                  });
                }}
              />
              <SettingItem
                icon="credit-card"
                name="Wallet"
                onPress={() => {
                  navigation.push('WalletScreen');
                }}
              />
              <SettingItem
                icon="bell"
                name="Notifications"
                hasNotification={profileStore.shouldNotify && meData?.hasNewNotes}
                onPress={() => {
                  profileStore.checkedNotifcation();
                  navigation.push('ExternalLinkScreen', {
                    url: `https://stacker.news/notifications`,
                  });
                }}
              />
            </>
          )}
          <SettingItem
            icon="star"
            name="Favorites"
            onPress={() => {
              navigation.navigate('FavScreen');
            }}
          />
          <ThemeItem icon="sun" name="Dark Mode" />
        </View>

        <View style={tw`mt-2`}>
          <SettingItem
            icon="activity"
            name="Clear Cache"
            onPress={() => {
              Alert.alert('Clear Cache?', 'All favorite posts will be deleted.', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => postStore.clearHistoryPosts() },
              ]);
            }}
          />
          <SettingItem icon="share-2" name="Share Bsats" onPress={onShare} />
          <SettingItem
            icon="alert-circle"
            name="About Bsats"
            onPress={() => {
              WebBrowser.openBrowserAsync(`https://github.com/kale5195/bsats`);
            }}
          />
        </View>

        {profileStore.isLogin && (
          <TouchableOpacity style={tw`mt-4 py-4`} onPress={onSignOut}>
            <Text style={tw`text-center`}>Logout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Container>
  );
});
