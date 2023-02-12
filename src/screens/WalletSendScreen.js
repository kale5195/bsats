import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import Text from '~/components/common/Text';

export default function WalletSendScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { tw } = useTailwind();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const copyFromClipboard = async () => {
    const invoice = await Clipboard.getStringAsync();
    console.log(invoice);
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 flex flex-col justify-center`}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
      <View style={tw`mt-4 mb-10 flex-row justify-between items-center px-10`}>
        <TouchableOpacity style={tw`py-4 flex flex-row items-center`} onPress={copyFromClipboard}>
          <Ionicons size={18} style={tw`text-amber-500`} name="md-download-outline" />
          <Text style={tw`ml-1 text-sm`}>Paste from clipboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`py-4 flex flex-row items-center`}>
          <Ionicons size={18} style={tw`text-amber-500`} name="scan-outline" />
          <Text style={tw`ml-1 text-sm`}>Manual input</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
