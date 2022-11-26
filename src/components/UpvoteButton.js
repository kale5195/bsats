import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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

export default function UpvoteButton({ id, meSats = 0, refetch }) {
  const { tw } = useTailwind();
  const toast = useToast();

  const onTip = async (postId, sats) => {
    const data = await StackerNews.tip({ id: postId, sats });
    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
    } else {
      refetch();
    }
  };
  return (
    <TouchableOpacity onPress={() => onTip(id, 1)}>
      <MaterialCommunityIcons size={25} style={tw`-mb-1`} name="lightning-bolt" color={getColor(meSats)} />
    </TouchableOpacity>
  );
}
