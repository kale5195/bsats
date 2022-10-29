import { View } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import CommonList from './CommonList';
import JobItem from './JobListItem';

export default function JobList() {
  const { tw } = useTailwind();
  const queryRes = StackerNews.posts({ sub: 'jobs' });

  return (
    <View style={tw`flex-1`}>
      <CommonList queryRes={queryRes} ListItem={JobItem} />
    </View>
  );
}
