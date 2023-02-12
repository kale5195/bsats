import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DEFAULT_TABBAR_HEIGHT = 49;
const COMPACT_TABBAR_HEIGHT = 32;

export default function useBottomHeight() {
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom - Platform.select({ ios: 4, default: 0 }), 0);
  const height =
    Platform.OS === 'ios' && !Platform.isPad
      ? COMPACT_TABBAR_HEIGHT + paddingBottom
      : DEFAULT_TABBAR_HEIGHT + paddingBottom;
  return {
    height,
  };
}
