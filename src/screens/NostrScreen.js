import { View, Button, Text, TouchableOpacity } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { useToast } from 'react-native-toast-notifications';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { useRef } from 'react';
import { FlashList } from '@shopify/flash-list/dist';
export default NostrScreen = ({ navigation, route }) => {
  const { tw } = useTailwind();
  const toast = useToast();
  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  const { events } = useNostrEvents({
    filter: {
      authors: [
        '2ba70cee092f030ffc30e902815b3bb9a0a15f47385c96ec2f311ad7c5ed7338',
        '05933d8782d155d10cf8a06f37962f329855188063903d332714fbd881bac46e',
      ],
      since: 0,
      kinds: [1],
    },
  });
  return (
    <View style={tw`p-2 flex-1`}>
      <FlashList
        renderItem={({ item }) => {
          return (
            <View style={tw`p-2 my-2 border-2 border-gray-300 rounded-md`} key={item.id}>
              <Text style={tw`text-gray-600`}>{item.pubkey}</Text>
              <Text style={tw`text-gray-600`}>{item.content}</Text>
            </View>
          );
        }}
        estimatedItemSize={50}
        data={events}
      />
    </View>
  );
};
