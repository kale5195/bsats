import _ from 'lodash';
import Markdown, { MarkdownIt } from '@flowchase/react-native-markdown-display';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import { View, Text } from 'react-native';
import ZoomImage from './ZoomImage';

export default function PostMarkdown({ text, ...restPros }) {
  const navigation = useNavigation();
  const { tw } = useTailwind();
  if (_.isEmpty(text)) {
    return <View style={tw`h-5`} />;
  }
  return (
    <Markdown
      markdownit={MarkdownIt({ typographer: true, linkify: true, breaks: true })}
      onLinkPress={(url) => {
        navigation.push('ExternalLinkScreen', {
          url: url,
        });
      }}
      rules={{
        image: (node, children, parent, styles, allowedImageHandlers, defaultImageHandler) => {
          const { src, alt } = node.attributes;
          return <ZoomImage key={node.key} url={src} />;
        },
      }}
      style={{
        paragraph: tw`my-1`,
        code_inline: tw`text-pink-500 bg-transparent`,
        code_block: tw`dark:text-white text-black dark:bg-black`,
        body: tw.style(`dark:text-white text-black text-sm`, restPros?.style),
        blockquote: tw`mt-1 border-l-[3px] bg-transparent border-zinc-600 dark:border-gray-200`,
        link: tw`text-sky-600`,
      }}>
      {text}
    </Markdown>
  );
}
