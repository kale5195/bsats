import React from 'react';
import { Image } from 'react-native';

function AutoHeightImage({ width, style, ...props }) {
  const [height, setHeight] = React.useState(1);
  return (
    <Image
      {...props}
      style={{ width, height, ...style }}
      onLoad={({ nativeEvent }) => {
        setHeight((nativeEvent.source.height / nativeEvent.source.width) * width || 80);
      }}
    />
  );
}

export default React.memo(AutoHeightImage);
