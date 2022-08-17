import React from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { View, Text, useWindowDimensions } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { observer } from 'mobx-react-lite';
import Container from '~/components/Container';
import PostList from '~/components/PostList';
import CommentList from '~/components/CommentList';
import { useStores } from '~/stores';

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'home':
      return <PostList v={{}} />;
    case 'new':
      return <PostList v={{ sort: 'recent' }} />;
    case 'top':
      return <PostList v={{ sort: 'top' }} showHeader />;
    case 'comments':
      return <CommentList v={{ sort: 'top' }} showHeader />;
    default:
      return null;
  }
};

export default HomeScreen = observer(() => {
  const layout = useWindowDimensions();

  const { tw } = useTailwind();

  const { uiStore } = useStores();

  const CustomTabBar = (props) => (
    <TabBar
      {...props}
      style={tw`bg-[#EFEFEF] border-amber-300 dark:bg-black`}
      tabStyle={tw`w-[100px] h-[46px]`}
      indicatorStyle={tw`bg-amber-300 w-[32px] ml-[35px] h-1 rounded ml-[34px]`}
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
  const [index, setIndex] = React.useState(uiStore.homeTab);
  const [routes] = React.useState([
    { key: 'new', title: 'Recent' },
    { key: 'home', title: 'Home' },
    { key: 'top', title: '🔥Post' },
    { key: 'comments', title: '🔥Comment' },
  ]);

  return (
    <Container style={tw`-mb-[100px]`}>
      <TabView
        lazy
        renderLazyPlaceholder={() => {}}
        style={tw`flex-1`}
        renderTabBar={CustomTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(i) => {
          setIndex(i);
          uiStore.setHomeTab(i);
        }}
        initialLayout={{ width: layout.width }}
      />
    </Container>
  );
});
