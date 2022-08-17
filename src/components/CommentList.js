import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import CommonList from './CommonList';
import TopHeader from './TopHeader';
import CommentListItem from './CommentListItem';

export default function CommentList({ showHeader = false, v }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  const [type, setType] = React.useState(showHeader ? 'day' : undefined);
  const queryRes = StackerNews.comments({ ...v, within: type });

  return (
    <View style={tw`flex-1`}>
      {showHeader && <TopHeader setType={setType} type={type} />}
      <CommonList queryRes={queryRes} ListItem={CommentListItem} />
    </View>
  );
}
