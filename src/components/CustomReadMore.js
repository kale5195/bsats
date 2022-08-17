import ReadMore from './Readmore';
import useTailwind from '~/hooks/useTailwind';
import { Text } from 'react-native';

export default function CustomReadMore({ text }) {
  const { tw } = useTailwind();
  // return <Text style={tw`mt-1.5 text-sm`}>{text}</Text>;
  return (
    <ReadMore
      numberOfLines={4}
      seeMoreStyle={tw`text-gray-600`}
      seeMoreText="open"
      seeLessStyle={tw`text-gray-600`}
      seeLessText="close"
      style={tw`mt-1.5 text-sm`}>
      {text}
    </ReadMore>
  );
}
