import { Text } from 'react-native';
import useTailwind from '~/hooks/useTailwind';

export default function CustomText({ children, style }) {
  const { tw } = useTailwind();
  return <Text style={tw.style('text-base text-gray-800 dark:text-neutral-100', style)}>{children}</Text>;
}
