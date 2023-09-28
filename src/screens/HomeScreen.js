import React from 'react';
import { observer } from 'mobx-react-lite';
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import useTailwind from '~/hooks/useTailwind';
import { useStores } from '~/stores';
import Container from '~/components/Container';
import JobList from '~/components/JobList';
import PostList from '~/components/PostList';
import PublishButton from '~/components/PublishButton';
import TopList from '~/components/TopList';

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'home':
      return <PostList v={{}} />;
    case 'recent':
      return <PostList v={{ sort: 'recent' }} />;
    case 'top':
      return <TopList />;
    case 'jobs':
      return <JobList />;
    default:
      return null;
  }
};

function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();

  const { tw } = useTailwind();

  const { uiStore } = useStores();

  const CustomTabBar = (props) => (
    <TabBar
      {...props}
      style={tw`bg-[#EFEFEF] border-amber-300 dark:bg-black`}
      tabStyle={tw`w-[125px] h-[46px]`}
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
    { key: 'recent', title: 'Recent' },
    { key: 'home', title: 'Home' },
    // { key: 'top', title: 'Top' },
    { key: 'jobs', title: 'Jobs' },
  ]);

  return (
    <Container style={tw`-mb-[100px] relative`}>
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
      <PublishButton navigation={navigation} />
    </Container>
  );
}

export default observer(HomeScreen);
