import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import Text from '~/components/common/Text';

export default function WalletSendScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();
  const { tw } = useTailwind();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text style={tw`mt-8 text-center`}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={tw`mt-8 text-center`}>No access to camera</Text>;
  }

  const copyFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    navigation.navigate('PaymentConfirmScreen', { userInput: text });
  };
  const handleBarCodeScanned = ({ data }) => {
    navigation.navigate('PaymentConfirmScreen', { userInput: data });
  };

  const onInput = () => {
    navigation.navigate('PaymentConfirmScreen', {
      userInput: '',
    });
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 flex flex-col justify-center`}>
        {isFocused && <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFill} />}
      </View>
      <View style={tw`mt-4 mb-10 flex-row justify-between items-center px-10`}>
        <TouchableOpacity style={tw`py-4 flex flex-row items-center`} onPress={copyFromClipboard}>
          <Ionicons size={18} style={tw`text-amber-500`} name="md-download-outline" />
          <Text style={tw`ml-1 text-sm`}>Paste from clipboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`py-4 flex flex-row items-center`} onPress={onInput}>
          <Ionicons size={18} style={tw`text-amber-500`} name="scan-outline" />
          <Text style={tw`ml-1 text-sm`}>Manual input</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
