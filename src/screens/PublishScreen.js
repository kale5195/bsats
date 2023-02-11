import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextInput from '~/components/common/TextInput';
import Text from '~/components/common/Text';
import useTailwind from '~/hooks/useTailwind';
import { useToast } from 'react-native-toast-notifications';
import { StackerNews } from '~/services/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default PublishScreen = ({ navigation, route }) => {
  const { tw } = useTailwind();
  const toast = useToast();
  const {
    params: { type },
  } = route;

  const onSumbit = async () => {
    if (!title) {
      toast.show('Title should not be empty', { type: 'danger' });
      return;
    }
    if (type === 'link') {
      if (!url) {
        toast.show('URL should not be empty', { type: 'danger' });
        return;
      }
      const data = await StackerNews.createLink({ title: title.trim(), url: url.trim() });
      if (data?.errno === -1) {
        toast.show(data.msg, { type: 'danger' });
      } else {
        navigation.push('PostScreen', {
          id: data.upsertLink.id,
        });
      }
    } else if (type === 'discussion') {
      const data = await StackerNews.createDiscussion({ title: title.trim(), text: text.trim() });
      if (data?.errno === -1) {
        toast.show(data.msg, { type: 'danger' });
      } else {
        navigation.push('PostScreen', {
          id: data.upsertDiscussion.id,
        });
      }
    }
  };
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [text, setText] = React.useState('');
  return (
    <KeyboardAwareScrollView extraScrollHeight={65} enableOnAndroid={true}>
      <View style={tw`mt-4 p-2`}>
        <Text style={tw`text-xl mx-4`}>Title</Text>
        <TextInput onChangeText={setTitle} value={title} style={tw`mt-1 mx-4`} />
        {type === 'link' ? (
          <>
            <Text style={tw`mt-4 text-xl mx-4`}>URL</Text>
            <TextInput onChangeText={setUrl} value={url} style={tw`mt-1 mx-4`} />
          </>
        ) : (
          <>
            <View style={tw`mt-4 flex flex-row items-baseline`}>
              <Text style={tw`text-xl ml-4`}>Text</Text>
              <Text style={tw`ml-2 text-sm font-extralight`}>optional</Text>
            </View>
            <TextInput onChangeText={setText} value={text} style={tw`mt-1 mx-4 min-h-[150px]`} />
          </>
        )}

        <View style={tw`mt-8 flex flex-row justify-center`}>
          <TouchableOpacity style={tw`bg-yellow-400 rounded-md`} onPress={onSumbit}>
            <Text style={tw`text-white text-xl px-3 py-1`}>submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
