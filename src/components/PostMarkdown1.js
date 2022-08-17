import _ from 'lodash';
import { MarkdownView } from 'react-native-markdown-view';
// import Markdown from 'react-native-markdown-text';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import { View } from 'react-native';

export default function PostMarkdown({ text, ...restPros }) {
  const navigation = useNavigation();
  const { tw, isDark } = useTailwind();
  if (_.isEmpty(text)) {
    return <View style={tw`h-5`} />;
  }
  return (
    <MarkdownView
      styles={{
        link: {
          color: '#0284c7',
        },
        paragraph: {
          fontSize: 14,
          color: isDark ? 'white' : 'black',
          marginTop: 8,
          marginBottom: 8,
        },
      }}
      onLinkPress={(url) => {
        navigation.push('ExternalLinkScreen', {
          url: url,
        });
      }}
      {...restPros}>
      {text}
    </MarkdownView>
  );
}
