import { Text, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';

export default function PollView({ poll }) {
  const { tw } = useTailwind();
  if (!poll) {
    return null;
  }
  return (
    <View style={tw`mb-4 px-2`}>
      {poll?.options?.map((item) => {
        const per = item.count / poll.count;
        const w = parseInt(300 * per, 10) || 0;
        return (
          <View style={tw`relative flex-row justify-between items-center`} key={item.id}>
            <View style={tw`absolute py-3 w-[${w}px] bg-black/9 dark:bg-white/20 mt-2 rounded`} />
            <Text style={tw`p-2 dark:text-neutral-200`}>{item.option}</Text>
            {per > 0 && <Text style={tw`text-sm dark:text-neutral-200`}>{(per * 100).toFixed(1)}%</Text>}
          </View>
        );
      })}
      <Text style={tw`mt-1 text-neutral-500 text-xs dark:text-neutral-200`}>{poll.count} votes</Text>
    </View>
  );
}
