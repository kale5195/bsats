import { View, Button, Text, TouchableOpacity } from 'react-native';
import { useStores } from '~/stores';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import { useToast } from 'react-native-toast-notifications';

export default ReplyScreen = ({ navigation, route }) => {
  const { tw } = useTailwind();
  const { itemId, text } = route.params;
  const { postStore } = useStores();
  const toast = useToast();

  const onReply = async () => {
    const data = await StackerNews.createComment({ parentId: itemId, text: 'welcome' });
    console.log(data);
    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
    } else {
      toast.show('success');
    }
  };

  return (
    <View style={tw`p-2`}>
      <Text style={tw`dark:text-neutral-200`}>{text}</Text>
      <TouchableOpacity onPress={onReply}>
        <Text style={tw`dark:text-neutral-200`}>ss</Text>
      </TouchableOpacity>
    </View>
  );
};
