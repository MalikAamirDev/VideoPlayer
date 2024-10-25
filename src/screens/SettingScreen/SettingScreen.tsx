import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import useStyles from './styles';
import {SVG} from '../../assets';
import {BackButton} from '../../components';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import {bannerAddKey} from '../../constants';
// import {
//   AdEventType,
//   BannerAd,
//   BannerAdSize,
//   InterstitialAd,
//   TestIds,
// } from 'react-native-google-mobile-ads';
// import {bannerId, INTERTSIAL_Key} from '../constant';
const SettingScreen = () => {
  // hook
  const navigation = useNavigation();
  const styles = useStyles();
  const bannerRef = useRef<BannerAd>(null);
  // adds
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });
  // function
  // share app

  const appStoreLink = 'https://apps.apple.com/app/id1234567890'; // Replace with your App Store link
  const playStoreLink =
    'https://play.google.com/store/apps/details?id=com.example.myapp'; // Replace with your Play Store link

  const shareApp = async () => {
    const appLink = Platform.OS === 'ios' ? appStoreLink : playStoreLink;
    const message = `Check out this awesome app: ${appLink}`;

    const shareOptions = {
      title: 'Share App',
      message: message,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing app:', error);

      if (error && error?.message !== 'User did not share') {
        Alert.alert(
          'Error',
          'An error occurred while trying to share the app.',
        );
        console.error('Share error:', error);
      }
    }
  };
  const rateApp = () => {
    const iosLink =
      'https://apps.apple.com/us/app/home-workout-no-equipments/id1313192037';
    const androidLink =
      'https://apps.apple.com/us/app/home-workout-no-equipments/id1313192037';

    const storeLink = Platform.OS === 'ios' ? iosLink : androidLink;

    Linking.canOpenURL(storeLink)
      .then(supported => {
        if (supported) {
          Linking.openURL(storeLink);
        } else {
          Alert.alert('Error', 'Unable to open the store link');
        }
      })
      .catch(err => console.error('Failed to open URL:', err));
  };

  const privacyPolicy = () => {
    const link = 'https://peditorlab.blogspot.com/2024/10/privicy-policy.html';
    Linking.canOpenURL(link)
      .then(supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          Alert.alert('Error', 'Unable to open the store link');
        }
      })
      .catch(err => console.error('Failed to open URL:', err));
  };
  const sendFeedback = () => {
    const link = 'https://peditorlab.blogspot.com/p/contact-form.html';
    Linking.canOpenURL(link)
      .then(supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          Alert.alert('Error', 'Unable to open the store link');
        }
      })
      .catch(err => console.error('Failed to open URL:', err));
  };

  // add code

  // const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : INTERTSIAL_Key;
  // const isFocus = useIsFocused();
  // const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  //   keywords: ['fashion', 'clothing'],
  // });

  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   const loadListener = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //       console.log('Ad loaded successfully.');
  //     },
  //   );

  //   const errorListener = interstitial.addAdEventListener(
  //     AdEventType.ERROR,
  //     error => {
  //       console.error('Ad failed to load:', error);
  //       setLoaded(false);
  //     },
  //   );

  //   interstitial.load();
  //   console.log('Loading ad...');

  //   return () => {
  //     loadListener();
  //     errorListener();
  //   };
  // }, [interstitial]);

  // useEffect(() => {
  //   if (isFocus && loaded && interstitial) {
  //     console.log('Attempting to show ad...');
  //     setTimeout(() => {
  //       if (loaded) {
  //         interstitial.show().catch(error => {
  //           console.error('Ad failed to show:', error);
  //         });
  //       } else {
  //         console.log('Ad was not loaded in time.');
  //       }
  //     }, 2000);
  //   }
  // }, [isFocus, loaded]);

  // if (!loaded) {
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator color={'white'} size={'large'} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.main}>
      <SafeAreaView />
      <View style={styles.backContainerStyle}>
        {/* <TouchableOpacity
          style={styles.backBtnStyle}
          onPress={() => {
            navigation.goBack();
          }}>
          <SVG.BackIcon />
        </TouchableOpacity> */}
        <Text style={styles.backBtnTextStyle}>Setting</Text>
      </View>
      <TouchableOpacity
        style={styles.boxMainStyle}
        onPress={() => {
          privacyPolicy();
        }}>
        <Text style={styles.textStyle}>Privacy Policy</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLineStyle} />
      <TouchableOpacity
        style={styles.boxMainStyle}
        onPress={() => {
          sendFeedback();
        }}>
        <Text style={styles.textStyle}>Feed back</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLineStyle} />
      <View style={styles.boxMainStyle}>
        <Text style={styles.textStyle}>Version 0.1</Text>
      </View>
      <View style={styles.horizontalLineStyle} />
      <TouchableOpacity
        style={styles.boxMainStyle}
        onPress={() => {
          shareApp();
        }}>
        <Text style={styles.textStyle}>Share</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLineStyle} />
      <TouchableOpacity
        style={styles.boxMainStyle}
        onPress={() => {
          rateApp();
        }}>
        <Text style={styles.textStyle}>Rate us</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLineStyle} />
      <View style={styles.adContainer}>
        <BannerAd
          unitId={__DEV__ ? TestIds.BANNER : bannerAddKey}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
};

export default SettingScreen;
