import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useTailwind from '~/hooks/useTailwind';

export default function Dropdown({ cat, data, defaultValue, setParams, width = 90 }) {
  const { tw } = useTailwind();
  return (
    <SelectDropdown
      data={data}
      defaultValue={defaultValue}
      buttonStyle={tw`bg-white dark:bg-gray-800 h-[28px] w-[${width}px] rounded-md border border-gray-300 dark:border-gray-700`}
      buttonTextStyle={tw`text-sm dark:text-neutral-100`}
      dropdownStyle={tw`bg-white dark:bg-gray-800 rounded`}
      rowStyle={tw`h-[40px] dark:bg-gray-800 `}
      rowTextStyle={tw`bg-white text-sm dark:bg-gray-800 dark:text-neutral-100`}
      renderDropdownIcon={(isOpened) => {
        return (
          <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} size={12} style={tw`dark:text-neutral-300`} />
        );
      }}
      onSelect={(selectedItem, index) => {
        setParams((prev) => {
          return { ...prev, [cat]: selectedItem };
        });
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
}
