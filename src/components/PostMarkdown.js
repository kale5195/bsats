import _ from 'lodash';
import Markdown, { MarkdownIt } from '@flowchase/react-native-markdown-display';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import { View, Text, TouchableOpacity } from 'react-native';
import ZoomImage from './ZoomImage';

export default function PostMarkdown({ text, ...restPros }) {
  const navigation = useNavigation();
  const { tw } = useTailwind();
  if (_.isEmpty(text)) {
    return <View style={tw`h-3`} />;
  }
  return (
    <Markdown
      markdownit={MarkdownIt({ typographer: true, linkify: true, breaks: true })}
      onLinkPress={(url) => {
        const matches = url.match(/stacker.news\/items\/(\d+)/);
        if (matches && matches?.[1]) {
          navigation.push('PostScreen', {
            id: matches[1],
          });
        } else {
          navigation.push('ExternalLinkScreen', {
            url: url,
          });
        }
      }}
      rules={{
        image: (node, children, parent, styles, allowedImageHandlers, defaultImageHandler) => {
          const { src, alt } = node.attributes;
          return <ZoomImage key={node.key} url={src} />;
        },
        // link: (node, children, parent, styles, onLinkPress) => {
        //   return (
        //     <TouchableOpacity key={node.key} onPress={() => onLinkPress(node.attributes.href)}>
        //       {children}
        //     </TouchableOpacity>
        //   );
        // },
      }}
      style={{
        paragraph: tw`my-1 text-sm`,
        code_inline: tw`text-pink-500 bg-transparent`,
        code_block: tw`dark:text-white text-black dark:bg-black`,
        body: tw.style(`dark:text-white text-black`, restPros?.style),
        blockquote: tw`mt-1 border-l-[3px] bg-transparent border-zinc-600 dark:border-gray-200`,
        link: tw`text-sky-600 text-sm`,
      }}>
      {text}
    </Markdown>
  );
}
