import { TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import useTailwind from '~/hooks/useTailwind';
import Rainbow from '~/lib/rainbow';
import { StackerNews } from '~/services/api';

const getColor = (meSats) => {
  if (!meSats) {
    return '#a5a5a5';
  }

  const idx = Math.min(Math.floor((Math.log(meSats) / Math.log(10000)) * (Rainbow.length - 1)), Rainbow.length - 1);
  return Rainbow[idx];
};

export default function UpvoteButton({ id, meSats = 0, size = 24, style, updateSats }) {
  const { tw } = useTailwind();
  const toast = useToast();

  // TODO change to useStore
  const onTip = async (postId, sats) => {
    const data = await StackerNews.tip({ id: postId, sats });
    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
    } else {
      updateSats(sats);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => onTip(id, 1)}
      style={style}
      onLongPress={() => {
        console.log('onLongPress');
      }}>
      <FontAwesome size={size} name="bolt" color={getColor(meSats)} />
    </TouchableOpacity>
  );
}
