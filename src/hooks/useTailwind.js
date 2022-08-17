import tw from 'twrnc';
import UIStore from '~/stores/ui';

export default function useTailwind() {
  return {
    isDark: UIStore.themeColor === 'dark',
    tw,
  };
}
