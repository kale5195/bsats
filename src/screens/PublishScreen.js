import { View, Button, Text, TouchableOpacity, TextInput } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';

export default PublishScreen = ({ navigation, route }) => {
  const { tw } = useTailwind();

  const {
    params: { type },
  } = route;

  const onReply = async () => {};

  return (
    <View style={tw`p-2`}>
      <Text style={tw`text-xl mx-4`}>title</Text>
      <TextInput style={tw`mt-1 border border-gray-300 rounded-md p-2 mx-4`} />
      <Text style={tw`mt-4 text-xl mx-4`}>url</Text>
      <TextInput style={tw`mt-1 border border-gray-300 rounded-md p-2 mx-4`} />
      <View style={tw`mt-8 flex flex-row justify-center`}>
        <TouchableOpacity style={tw`bg-yellow-400 rounded-md`}>
          <Text style={tw`text-white text-xl px-3 py-1`}>submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
