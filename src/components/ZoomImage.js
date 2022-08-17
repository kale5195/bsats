import React from 'react';
import { Image, View, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import useTailwind from '~/hooks/useTailwind';
import AutoHeightImage from './AutoHeightImage';

export default function ZoomImage({ url }) {
  const { tw } = useTailwind();
  const [visible, setIsVisible] = React.useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={tw`mt-1`}>
        <AutoHeightImage width={300} source={{ uri: url }} />
        {/* <Image style={tw`w-[300px] h-[100px]`} resizeMode="contain" source={{ uri: url }} /> */}
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} onRequestClose={() => {}}>
        <ImageViewer imageUrls={[{ url }]} onCancel={() => setIsVisible(false)} onClick={() => setIsVisible(false)} />
      </Modal>
    </View>
  );
}
