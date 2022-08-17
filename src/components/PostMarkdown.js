import _ from 'lodash';
import Markdown from 'react-native-markdown-text';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import { View, Text } from 'react-native';
import { createElement } from 'react';
import ZoomImage from './ZoomImage';

export default function PostMarkdown({ text, ...restPros }) {
  const navigation = useNavigation();
  // let t = text.replaceAll(/(#.*)/g, '$1\n');
  const { tw } = useTailwind();
  if (_.isEmpty(text)) {
    return <View style={tw`h-5`} />;
  }
  return (
    <Markdown
      rules={{
        image: {
          react: (node, output, state) => {
            return <ZoomImage key={state.key} url={node.target} />;
          },
        },
        link: {
          react: (node, output, state) => {
            const url = node.content[0].content;
            if (!url || typeof url !== 'string') {
              state.withinText = true;
              return createElement(
                Text,
                {
                  key: state.key,
                  style: tw`underline`,
                  onPress: () => {
                    navigation.push('ExternalLinkScreen', {
                      url: node.target,
                    });
                  },
                },
                output(node.content, state)
              );
            }
            return (
              <Text
                key={state.key}
                style={tw`text-sky-600`}
                onPress={() => {
                  navigation.push('ExternalLinkScreen', {
                    url: url,
                  });
                }}>
                {url}
              </Text>
            );
          },
        },
        inlineCode: {
          react: (node, output, state) => {
            return (
              <Text key={state.key} style={tw`text-pink-500`}>
                {node.content}
              </Text>
            );
          },
        },
      }}
      styles={{
        view: restPros?.style,
        listItem: tw`flex-row mt-1 mr-4`,
        listItemBullet: {
          fontSize: 20,
          lineHeight: 20,
        },
        image: tw`w-[300px] h-[100px]`,
        blockQuoteSection: tw`flex-row pr-2`,
        blockQuoteSectionBar: tw`w-[2px] dark:bg-gray-50 mr-2 bg-zinc-600`,
        plainText: tw`dark:text-white text-black text-sm`,
        text: tw`dark:text-white text-black text-sm`,
      }}
      {...restPros}>
      {text}
    </Markdown>
  );
}
