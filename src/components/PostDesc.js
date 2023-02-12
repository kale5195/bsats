import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { Text, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import { abbrNum, shortName } from '~/lib/format';
import { timeSince } from '~/lib/time';
import { useStores } from '~/stores';
import UpvoteButton from './UpvoteButton';

function PostDesc({ item, term = 'comments', isOp = false, hiddenStatus = undefined, hideComment = undefined }) {
  const { tw, isDark } = useTailwind();
  const navigation = useNavigation();
  const { postStore } = useStores();

  const storeMeSats = postStore.upvotedPosts[item.id] || 0;
  const itemMeSats = item.mine ? 0 : item.meSats;
  const updateSats = (voteSats) => {
    postStore.setUpvotedPosts(item.id, voteSats);
  };
  return (
    <View style={tw`relative mt-1 pr-1`}>
      <View style={tw`flex-row items-center flex-wrap pr-2`}>
        <UpvoteButton
          id={item.id}
          meSats={itemMeSats || storeMeSats}
          totalSats={abbrNum(itemMeSats > 0 ? item.sats : item.sats + storeMeSats)}
          size={16}
          updateSats={updateSats}
        />
        <Text style={tw`mr-1 text-xs text-neutral-500`}>
          {item.ncomments} {term} \
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('ProfileScreen', { name: item.user.name });
          }}>
          <Text style={tw`mr-1 text-xs text-sky-600`}>@{shortName(item.user.name)}</Text>
        </TouchableOpacity>
        {isOp && <Text style={tw`text-xs text-purple-600 font-bold mr-1`}>OP</Text>}
        <Text style={tw`text-xs text-neutral-500`}>{timeSince(new Date(item.createdAt))}</Text>
      </View>
      {!_.isNil(hiddenStatus) && (
        <TouchableOpacity onPress={hideComment} style={tw`absolute right-0 -top-2 p-2`}>
          <MaterialCommunityIcons
            size={12}
            name={hiddenStatus ? 'chevron-down' : 'chevron-up'}
            color={isDark ? 'white' : 'black'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default observer(PostDesc);
