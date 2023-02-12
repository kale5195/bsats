import { dateToUnix, useNostrEvents } from 'nostr-react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';

export default function NostrScreen({ navigation, route }) {
  const { tw } = useTailwind();
  const toast = useToast();

  // const { events } = useNostrEvents({
  //   filter: {
  //     since: 1675475367, // all new events from now
  //     kinds: [1],
  //   },
  // });
  return (
    <View style={tw`p-2`}>
      <TouchableOpacity>
        <Text style={tw`dark:text-neutral-200`}>ss</Text>
      </TouchableOpacity>
    </View>
  );
}
