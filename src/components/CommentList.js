import { View } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import CommonList from './CommonList';
import CommentListItem from './CommentListItem';

export default function CommentList({ v }) {
  const { tw } = useTailwind();
  const queryRes = StackerNews.comments({ ...v });

  return (
    <View style={tw`flex-1`}>
      <CommonList queryRes={queryRes} ListItem={CommentListItem} />
    </View>
  );
}
