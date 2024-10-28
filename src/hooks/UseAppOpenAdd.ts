import {AdEventType, AppOpenAd, TestIds} from 'react-native-google-mobile-ads';
import {appOpenAddKey} from '../constants';
import {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export default function useAppOpenAdd() {
  const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : appOpenAddKey;
  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
  });
  const isFocus = useIsFocused();

  const [oneTimeAd, setOneTimeAd] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  // Load and Show Ad
  useEffect(() => {
    if (!oneTimeAd) {
      console.log('Interstitial Ad not ready.');
      const loadListener = appOpenAd.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setAdLoaded(true);
          setOneTimeAd(true);
          StatusBar.setHidden(true);
          console.log('Interstitial Ad Loaded.');
        },
      );
      const errorListener = appOpenAd.addAdEventListener(
        AdEventType.ERROR,
        error => {
          console.error('Interstitial Ad failed to load:', error);
          setAdLoaded(false);
          StatusBar.setHidden(false);
        },
      );

      const closeListener = appOpenAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          console.log('appOpenAd Ad Closed.');
          setAdLoaded(false);
          setOneTimeAd(true);
          StatusBar.setHidden(false);
        },
      );

      appOpenAd.load();

      return () => {
        loadListener();
        errorListener();
        closeListener();
      };
    }
  }, [appOpenAd, oneTimeAd]);

  // Show Ad
  useEffect(() => {
    if (adLoaded && appOpenAd && !oneTimeAd) {
      console.log('Attempting to show ad...');
      setTimeout(() => {
        if (adLoaded && isFocus && appOpenAd) {
          appOpenAd.show().catch(error => {
            console.error('Ad failed to show:', error);
          });
          setOneTimeAd(true);
          setAdLoaded(false);
          StatusBar.setHidden(true);
        } else {
          console.log('Ad was not loaded in time.');
          setAdLoaded(false);
          StatusBar.setHidden(false);
        }
      }, 1000);
    }
  }, [adLoaded, appOpenAd, oneTimeAd]);
}
