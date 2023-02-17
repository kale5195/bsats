import React from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import useTailwind from '~/hooks/useTailwind';
import Bio from '~/components/Bio';
import CommentList from '~/components/CommentList';
import PostList from '~/components/PostList';
import ProfileHeader from '~/components/ProfileHeader';

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'bio':
      return <Bio name={route.name} />;
    case 'posts':
      return <PostList v={{ sort: 'user', name: route.name }} />;
    case 'comments':
      return <CommentList v={{ sort: 'user', name: route.name }} />;
    default:
      return null;
  }
};

export default function ProfileScreen({ route, navigation }) {
  const { tw } = useTailwind();
  const { name } = route.params;
  const layout = useWindowDimensions();

  const CustomTabBar = (props) => (
    <TabBar
      {...props}
      style={tw`bg-[#EFEFEF] border-amber-300 dark:bg-black`}
      tabStyle={tw`w-[120px] h-[46px]`}
      indicatorStyle={tw`bg-amber-300 w-[32px] ml-[35px] h-1 rounded ml-[44px]`}
      labelStyle={tw`p-0`}
      pressOpacity={1}
      pressColor="transparent"
      scrollEnabled
      renderLabel={({ route, focused }) => (
        <View style={tw`w-full flex flex-row justify-center`}>
          <Text style={tw`dark:text-gray-50 ${focused ? 'font-bold' : ''}`}>{route.title}</Text>
        </View>
      )}
    />
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'bio', title: 'Bio', name },
    { key: 'posts', title: 'Posts', name },
    { key: 'comments', title: 'Comments', name },
  ]);
  return (
    <View style={tw`flex-1 ml-2`}>
      <ProfileHeader name={name} />
      <TabView
        lazy
        renderLazyPlaceholder={() => {}}
        style={tw`flex-1`}
        renderTabBar={CustomTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
