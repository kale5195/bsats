import { useRef, useState } from 'react';
import { Dimensions, Image, Modal, TouchableWithoutFeedback, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import useTailwind from '~/hooks/useTailwind';
import AutoHeightImage from './AutoHeightImage';

const { width } = Dimensions.get('window');

export default function ZoomImage({ url }) {
  const { tw } = useTailwind();
  const [visible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const [elementX, setElementX] = useState(0);
  const onElementLayout = () => {
    elementRef.current.measureInWindow((x, y) => {
      setElementX(x + 12);
    });
  };
  return (
    <View ref={elementRef} onLayout={onElementLayout}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(true)} style={tw`mt-1`}>
        <AutoHeightImage width={Math.min(width - elementX, 280)} source={{ uri: url }} />
        {/* <Image style={tw`w-[300px] h-[100px]`} resizeMode="contain" source={{ uri: url }} /> */}
      </TouchableWithoutFeedback>
      <Modal visible={visible} transparent={true} onRequestClose={() => {}}>
        <ImageViewer imageUrls={[{ url }]} onCancel={() => setIsVisible(false)} onClick={() => setIsVisible(false)} />
      </Modal>
    </View>
  );
}
