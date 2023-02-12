import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';
import Rainbow from '~/lib/rainbow';
import { StackerNews } from '~/services/api';

const getColor = (meSats) => {
  if (!meSats) {
    return '#a5a5a5';
  }

  const idx = Math.min(Math.floor((Math.log(meSats) / Math.log(10000)) * (Rainbow.length - 1)), Rainbow.length - 1);
  return Rainbow[idx];
};

const presets = [1, 10, 100, 1000];
export default function UpvoteButton({ id, meSats = 0, totalSats, size = 24, updateSats }) {
  const { tw } = useTailwind();
  const [visible, setVisible] = React.useState(false);
  const { data: meData } = StackerNews.me();
  const [customSats, setCustomSats] = React.useState(10);

  const toast = useToast();

  useEffect(() => {
    if (meData?.me?.tipDefault) {
      setCustomSats(meData.me.tipDefault);
    }
  }, [meData]);

  // TODO change to useStore
  const onTip = async (postId, sats) => {
    const data = await StackerNews.tip({ id: postId, sats });
    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
    } else {
      updateSats(sats);
    }
  };
  return (
    <TouchableOpacity onPress={() => setVisible(true)} style={tw`flex-row items-center mr-1`}>
      <FontAwesome size={size} name="bolt" color={getColor(meSats)} />
      <Text style={tw`ml-1 text-xs text-neutral-500`}>{totalSats} sats \</Text>
      <Modal
        visible={visible}
        transparent={true}
        style={tw`rounded-lg `}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <Pressable
          style={tw`flex-1 justify-center items-center bg-gray-100/40 dark:bg-transparent`}
          onPress={(event) => event.target === event.currentTarget && setVisible(false)}>
          <View style={tw`bg-white dark:bg-gray-800 p-4 rounded h-[200px] w-[85%]`}>
            <Text style={tw`text-sm font-bold text-neutral-500 dark:text-neutral-200`}>Tip Amount</Text>
            <View style={tw`mt-4 flex flex-row items-center`}>
              <TextInput
                keyboardType="numeric"
                value={customSats.toString()}
                onChangeText={(text) => {
                  setCustomSats(Number(text) || 0);
                }}
                placeholderTextColor="#999"
                style={tw`bg-white flex-1 dark:bg-gray-800 dark:text-gray-200 py-2 px-2 rounded border border-gray-300 dark:border-gray-600`}
              />
              <Text style={tw`text-sm font-bold ml-2 text-neutral-500 dark:text-neutral-200`}>sats</Text>
            </View>
            <View style={tw`flex flex-row justify-between mt-4 items-center`}>
              {presets.map((it) => {
                return (
                  <TouchableOpacity
                    key={it}
                    onPress={() => {
                      setCustomSats(it);
                    }}
                    style={tw`bg-yellow-200 px-3 py-1 mr-2 rounded flex flex-row items-center`}>
                    <MaterialCommunityIcons size={14} name="lightning-bolt-outline" color="black" />
                    <Text style={tw`text-xs font-bold text-neutral-800`}>{it}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={tw`flex flex-row justify-end`}>
              <TouchableOpacity
                style={tw`mt-4 rounded-md bg-green-600`}
                onPress={() => {
                  onTip(id, customSats);
                  setVisible(false);
                }}>
                <Text style={tw`px-6 py-2 text-white font-bold`}>tip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
}
