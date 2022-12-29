import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import useTailwind from '~/hooks/useTailwind';
import Rainbow from '~/lib/rainbow';
import { StackerNews } from '~/services/api';
import React from 'react';

const getColor = (meSats) => {
  if (!meSats) {
    return '#a5a5a5';
  }

  const idx = Math.min(Math.floor((Math.log(meSats) / Math.log(10000)) * (Rainbow.length - 1)), Rainbow.length - 1);
  return Rainbow[idx];
};

export default function UpvoteButton({ id, meSats = 0, size = 24, style, updateSats }) {
  const { tw } = useTailwind();
  const [visible, setVisible] = React.useState(false);
  const toast = useToast();

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
    <TouchableOpacity
      onPress={() => onTip(id, 1)}
      style={style}
      onLongPress={() => {
        setVisible(true);
      }}>
      <FontAwesome size={size} name="bolt" color={getColor(meSats)} />
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <Pressable
          style={tw`flex-1 justify-center items-center bg-gray-100/50 dark:bg-transparent`}
          onPress={(event) => event.target == event.currentTarget && setVisible(false)}>
          <View style={tw`bg-white dark:bg-gray-100 p-4 rounded w-[80%]`}>
            <Text style={tw`text-sm font-bold mb-2`}>amount</Text>
            <TextInput />
            <View style={tw`flex flex-row justify-between`}>
              <Text>1</Text>
              <Text>10</Text>
              <Text>100</Text>
              <Text>1000</Text>
              <Text>10000</Text>
            </View>
            <TouchableOpacity>
              <Text>tip</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
}
