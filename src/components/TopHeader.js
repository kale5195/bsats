import { View, Text, TouchableOpacity } from 'react-native';
import useTailwind from '~/hooks/useTailwind';

export default function TopHeader({ setType, type }) {
  const { tw } = useTailwind();
  return (
    <View style={tw`flex-row justify-between px-2`}>
      {[
        { name: 'Day', key: 'day' },
        { name: 'Week', key: 'week' },
        { name: 'Month', key: 'month' },
        { name: 'Year', key: 'year' },
        { name: 'Forever', key: 'forever' },
      ].map((item) => (
        <TouchableOpacity
          key={item.key}
          style={tw`px-2 py-4`}
          onPress={() => {
            setType(item.key);
          }}>
          <Text style={tw`${item.key === type ? 'font-bold dark:text-gray-50' : 'dark:text-gray-500'}`}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
