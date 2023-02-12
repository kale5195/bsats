import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';

export default function SatModal({
  visible,
  setVisible,
  onConfim,
  presets = [1, 10, 100, 1000],
  title = 'Tip Amount',
  buttonText = 'Tip',
}) {
  const [customSats, setCustomSats] = React.useState(10);
  const { tw } = useTailwind();

  return (
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
          <Text style={tw`text-sm font-bold text-neutral-500 dark:text-neutral-200`}>{title}</Text>
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
              onPress={async () => {
                const status = await onConfim(customSats);
                if (status) {
                  setVisible(false);
                }
              }}>
              <Text style={tw`px-6 py-2 text-white font-bold`}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
