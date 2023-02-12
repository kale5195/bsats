import { useRef } from 'react';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { Text, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';

export default function PublishButton({ navigation }) {
  const { tw, isDark } = useTailwind();
  const actionSheetRef = useRef();

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={showActionSheet}
        style={tw`absolute right-[20px] bottom-[130px] rounded-full bg-yellow-400 w-[48px] h-[48px] flex flex-row items-center justify-center`}>
        <Text style={tw`text-white text-4xl`}>+</Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        title={'What do you want to post ?'}
        options={['Link', 'Discussion', 'cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        userInterfaceStyle={isDark ? 'dark' : 'light'}
        onPress={(index) => {
          if (index === 0) {
            navigation.navigate('PublishScreen', { type: 'link' });
          } else if (index === 1) {
            navigation.navigate('PublishScreen', { type: 'discussion' });
          }
        }}
      />
    </View>
  );
}
