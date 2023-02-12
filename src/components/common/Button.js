import { Text, TouchableOpacity } from 'react-native';

import useTailwind from '~/hooks/useTailwind';

export default function CustomButton({ title, style, textStyle, onPress }) {
  const { tw } = useTailwind();
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={tw.style('text-base text-gray-800 dark:text-neutral-100', textStyle)}>{title}</Text>
    </TouchableOpacity>
  );
}
