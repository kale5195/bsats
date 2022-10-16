import React, { useState, useMemo, useRef, useCallback } from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import * as WebBrowser from 'expo-web-browser';
import * as NavigationBar from 'expo-navigation-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

import { BottomSheetTextInput, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { View, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { useAppColorScheme } from 'twrnc';
import Text from '~/components/common/Text';
import { useStores } from '~/stores';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import ProfileHeader from '~/components/ProfileHeader';
import { useToast } from 'react-native-toast-notifications';
import Container from '~/components/Container';

export default SettingScreen = observer(({ navigation }) => {
  const SettingItem = ({ icon, name, onPress }) => {
    return (
      <TouchableOpacity
        style={tw`mx-4 py-4 border-t border-gray-200 dark:border-gray-900 flex-row items-center justify-between`}
        onPress={onPress}>
        <View style={tw`flex-row items-center`}>
          <Feather name={icon} style={tw`text-xl dark:text-neutral-100`} />
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
  const toast = useToast();
  const [inputUsernanme, setUsername] = useState('');
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  // ref
  const bottomSheetModalRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['50%', '30%'], []);
  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleConfirmInput = async () => {
    const t = await StackerNews.getUser(inputUsernanme);
    if (t?.user) {
      profileStore.setUsername(inputUsernanme);
      bottomSheetModalRef.current?.close();
    } else {
      toast.show(`Can not find username: ${inputUsernanme}`, {
        type: 'warning',
        placement: 'top',
        style: {
          marginTop: 100,
        },
      });
    }
  };

  const onShare = async () => {
    const result = await Share.share({
      title: 'Bsats is a simple Stacker News client for iOS and Android',
      message: 'Bsats is a simple Stacker News client for iOS and Android',
    });
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );

  const onSignOut = () => {
    profileStore.logout();
  };
  return (
    <Container>
      <ScrollView style={tw`mt-6 flex-col flex-1 `}>
        {profileStore.hasUsername ? (
          <ProfileHeader name={profileStore.username} />
        ) : (
          <TouchableOpacity
            style={tw`flex-col items-center justify-center py-8 px-4`}
            onPress={handlePresentModalPress}>
            <Ionicons name="person-circle-outline" style={tw`text-6xl text-gray-500 dark:text-neutral-100`} />
            <Text>Set Username</Text>
          </TouchableOpacity>
        )}

        <View style={tw`mt-2`}>
          {profileStore.hasUsername && (
            <SettingItem
              icon="user"
              name="My Profile"
              onPress={() => {
                navigation.push('ProfileScreen', {
                  name: profileStore.username,
                });
              }}
            />
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
          {/* <SettingItem
            icon="thumbs-up"
            name="Rate Bsats"
            onPress={() => {
              toast.show('To Be Implemented');
            }}
          /> */}
          <SettingItem icon="share-2" name="Share Bsats" onPress={onShare} />
          <SettingItem
            icon="alert-circle"
            name="About Bsats"
            onPress={() => {
              WebBrowser.openBrowserAsync(`https://github.com/kale5195/bsats`);
            }}
          />
        </View>

        {profileStore.hasUsername && (
          <TouchableOpacity style={tw`mt-4 py-4`} onPress={onSignOut}>
            <Text style={tw`text-center`}>Logout</Text>
          </TouchableOpacity>
        )}
        <View style={tw`flex-1 absolute`}>
          <BottomSheetModal
            enablePanDownToClose
            android_keyboardInputMode="adjustPan"
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            style={tw`flex-1`}
            backgroundStyle={tw`dark:bg-gray-800`}
            handleIndicatorStyle={tw`dark:bg-white`}
            backdropComponent={renderBackdrop}>
            <View style={tw`flex-1 items-center`}>
              <BottomSheetTextInput
                value={inputUsernanme}
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Stacker.News Username"
                onChangeText={setUsername}
                placeholderTextColor="#9ca3af"
                style={tw`mt-8 mb-3 rounded-lg bg-gray-200 p-2 w-[250px]`}
              />
              <TouchableOpacity
                style={tw`mt-4 bg-amber-300 w-[100px] self-center rounded-md`}
                onPress={handleConfirmInput}>
                <Text style={tw`p-2 font-bold text-center text-white`}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </View>
      </ScrollView>
    </Container>
  );
});
