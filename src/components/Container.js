import { SafeAreaView } from 'react-native-safe-area-context';
import useTailwind from '~/hooks/useTailwind';

export default function Container({ style, children }) {
  const { tw } = useTailwind();
  return (
    <SafeAreaView style={[tw`flex-1`, style]} edges={['right', 'top', 'left']}>
      {children}
    </SafeAreaView>
  );
}
