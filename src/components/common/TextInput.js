import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';

import useTailwind from '~/hooks/useTailwind';

export default function TextInput({ onChangeText, value, style, placeholder = 'Please input content' }) {
  const [inputFoucus, setInputFocus] = React.useState(false);
  const { tw } = useTailwind();
  return (
    <NativeTextInput
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      style={[
        tw`bg-white dark:bg-gray-800 dark:text-gray-200 p-2 border rounded
       ${inputFoucus ? 'border-yellow-500' : 'border-gray-300 dark:border-gray-600'}`,
        style,
      ]}
      onChangeText={onChangeText}
      placeholderTextColor="#999"
      placeholder={placeholder}
      value={value}
      multiline
      clearButtonMode="always"
    />
  );
}
