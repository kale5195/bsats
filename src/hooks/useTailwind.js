import tw from 'twrnc';
import { stores } from '~/stores';

export default function useTailwind() {
  return {
    isDark: stores.uiStore.themeColor === 'dark',
    tw,
  };
}
