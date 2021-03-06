import {
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VCardQr from '../components/QrCode/VCardQr';
import MessageQr from '../components/QrCode/MessageQr';
import EmailQr from '../components/QrCode/EmailQr';
import TextQr from '../components/QrCode/TextQr';
import PhoneQr from '../components/QrCode/PhoneQr';
import LinkQr from '../components/QrCode/LinkQr';
import WifiQr from '../components/QrCode/WifiQr';
import BitcoinQr from '../components/QrCode/BitcoinQr';
import SocialMediaQr from '../components/QrCode/SocialMediaQr';
import PdfQr from '../components/QrCode/PdfQr';
import ApplicationQr from '../components/QrCode/ApplicationQr';
import Mp3Qr from '../components/QrCode/Mp3Qr';
import {ColorPicker} from 'react-native-color-picker';
const {width, height} = Dimensions.get('window');
const QrGenerator = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bgColor, setBgColor] = React.useState('#ffffff');
  const [qrColor, setQrColor] = React.useState('#000000');
  useEffect(() => {
    const bootstrap = () => {
      AsyncStorage.getItem('bgColor').then(value => {
        setBgColor(value);
      });
      AsyncStorage.getItem('qrColor').then(value => {
        setQrColor(value);
      });
    };
    bootstrap();
  }, []);
  navigation.setOptions({
    headerRight: () => {
      return (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={require('../assets/images/color-picker.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      );
    },
  });
  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <Text>Arkaplan Rengi: </Text>
          <View
            style={{
              backgroundColor: bgColor + '8A',
              padding: 3,
              borderRadius: 10,
            }}>
            <Text>{bgColor}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
          }}>
          <Text>QR Rengi: </Text>
          <View
            style={{
              backgroundColor: qrColor + '8A',
              padding: 3,
              borderRadius: 10,
            }}>
            <Text>{qrColor}</Text>
          </View>
        </View>
          </View>
       

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.container}>
          {route.params.navigator === 'VCard' ? (
            <VCardQr />
          ) : route.params.navigator === 'Message' ? (
            <MessageQr />
          ) : route.params.navigator === 'Email' ? (
            <EmailQr />
          ) : route.params.navigator === 'Wifi' ? (
            <WifiQr />
          ) : route.params.navigator === 'Link' ? (
            <LinkQr />
          ) : route.params.navigator === 'Text' ? (
            <TextQr />
          ) : route.params.navigator === 'Phone' ? (
            <PhoneQr />
          ) : route.params.navigator === 'Bitcoin' ? (
            <BitcoinQr />
          ) : route.params.navigator === 'SocialMedia' ? (
            <SocialMediaQr />
          ) : route.params.navigator === 'pdf' ? (
            <PdfQr />
          ) : route.params.navigator === 'MP3' ? (
            <Mp3Qr />
          ) : route.params.navigator === 'Application' ? (
            <ApplicationQr />
          ) : null}
        </ScrollView>
        <View style={{width: width}}>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[AdMobBanner.simulatorId]}
        />
    
        {/* <PublisherBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        testDevices={[PublisherBanner.simulatorId]}
        onAdFailedToLoad={error => console.error(error)}
        onAppEvent={event => console.log(event.name, event.info)}
      /> */}
      </View>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.hideModalBtn}
          onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={require('../assets/images/close.png')}
            style={{width: 30, height: 30, tintColor: 'gray'}}
          />
        </Pressable>
        <View style={{flex: 1}}>
          <View style={{padding: 20}}>
            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 20}}>
              QR Arkaplan Rengi
            </Text>
          </View>
          <ColorPicker
            onColorSelected={async color => {
              await AsyncStorage.setItem('bgColor', color);
              setBgColor(color);
              setModalVisible(!modalVisible);
            }}
            style={{flex: 0.5, padding: 20}}
          />
          <View style={{padding: 20}}>
            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 20}}>
              QR Rengi
            </Text>
          </View>
          <ColorPicker
            onColorSelected={async color => {
              await AsyncStorage.setItem('qrColor', color);
              setQrColor(color);
              setModalVisible(!modalVisible);
            }}
            style={{flex: 0.5, padding: 20}}
          />
        </View>
      </Modal>

    </>
  );
};

export default QrGenerator;

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: 'white',
    padding: 10,
  },
  container: {
    backgroundColor: 'white',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  infoText: {
    fontSize: 12,
    color: '#7D7D7D',
    fontWeight: '700',
  },
  inputViewC: {
    width: '70%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  colorBg: {
    width: '60%',
    height: 30,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 10,
  },
  colorBgBtn: {
    marginLeft: 5,
    width: '10%',
    height: 30,
  },
  bgSelectBtn: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  hideModalBtn: {
    marginTop: 50,
    marginLeft: 20,
  },
});
