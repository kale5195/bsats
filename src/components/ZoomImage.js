import React from 'react';
import { Image, View, Modal, TouchableWithoutFeedback } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import useTailwind from '~/hooks/useTailwind';
import AutoHeightImage from './AutoHeightImage';

export default function ZoomImage({ url }) {
  const { tw } = useTailwind();
  const [visible, setIsVisible] = React.useState(false);
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setIsVisible(true)} style={tw`mt-1`}>
        <AutoHeightImage width={280} source={{ uri: url }} />
        {/* <Image style={tw`w-[300px] h-[100px]`} resizeMode="contain" source={{ uri: url }} /> */}
      </TouchableWithoutFeedback>
      <Modal visible={visible} transparent={true} onRequestClose={() => {}}>
        <ImageViewer imageUrls={[{ url }]} onCancel={() => setIsVisible(false)} onClick={() => setIsVisible(false)} />
      </Modal>
    </View>
  );
}
