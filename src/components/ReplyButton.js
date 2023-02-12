import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import { queryClient } from '~/services/queryClient';
import { useStores } from '~/stores';
import TextInput from './common/TextInput';

function ReplyButton({ item }) {
  const { tw } = useTailwind();
  const { postStore } = useStores();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const itemId = item.id;
  const onReply = async () => {
    if (!text) {
      toast.show('Please input content', { type: 'danger' });
      return;
    }
    setLoading(true);
    const data = await StackerNews.createComment({ parentId: itemId, text: text });
    // console.log(data);
    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
    } else {
      await queryClient.invalidateQueries({ queryKey: ['single-posts', item.root?.id || item.id] });
      postStore.toggleReplyInput(itemId);
      setText('');
      toast.show('success', { type: 'success' });
    }
    setLoading(false);
  };
  const isExpanded = postStore.openedReplyID === itemId;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          postStore.toggleReplyInput(itemId);
        }}>
        <Text style={tw`text-xs mb-1 font-bold text-neutral-500 dark:text-neutral-400`}>
          {isExpanded ? 'cancel' : 'reply'}
        </Text>
      </TouchableOpacity>
      {isExpanded &&
        (loading ? (
          <View style={tw`my-2`}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={tw`mr-2 mb-4`}>
            <TextInput style={tw`flex-1 my-2`} onChangeText={setText} value={text} placeholder="Please input content" />
            <View style={tw`flex flex-row justify-end mt-2`}>
              <TouchableOpacity onPress={onReply} style={tw`rounded bg-yellow-500 w-[60px] mr-2`}>
                <Text style={tw`text-white text-center py-1 font-semibold`}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => postStore.cancelReplyInput()} style={tw`rounded bg-white w-[60px]`}>
                <Text style={tw`text-gray-800 text-center py-1 font-medium`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </View>
  );
}

export default observer(ReplyButton);
