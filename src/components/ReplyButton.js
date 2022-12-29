import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '~/stores';
import { StackerNews } from '~/services/api';
import { useToast } from 'react-native-toast-notifications';
import { queryClient } from '~/services/queryClient';

export default ReplyButton = observer(({ item }) => {
  const { tw } = useTailwind();
  const { postStore } = useStores();
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const toast = useToast();
  const itemId = item.id;
  const onReply = async () => {
    if (!text) return;
    const data = await StackerNews.createComment({ parentId: itemId, text: text });
    // console.log(data);
    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
    } else {
      queryClient.invalidateQueries({ queryKey: ['single-posts', item.root?.id || item.id] });
      toast.show('success');
    }
    setText('');
    postStore.toggleReplyInput(itemId);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        postStore.toggleReplyInput(itemId);
      }}>
      <Text style={tw`text-xs mb-1 font-bold text-neutral-500 dark:text-neutral-400`}>reply</Text>
      {postStore.openedReplyID === itemId && (
        <View>
          <TextInput
            style={tw`bg-white dark:bg-gray-800 dark:text-gray-200 flex-1 p-2 mr-2 my-2 rounded border border-gray-300 dark:border-gray-600 min-h-[100px]`}
            placeholderTextColor="#999"
            multiline
            onChange={(e) => setText(e.nativeEvent.text)}
            placeholder="Please input content"
            clearButtonMode="always"
          />
          <TouchableOpacity onPress={onReply}>
            <Text style={tw`dark:text-neutral-200`}>Reply</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
});
