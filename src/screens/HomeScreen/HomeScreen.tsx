/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Image,
  ActivityIndicator,
  useColorScheme,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import {IMAGES, SVG} from '../../assets';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FONTS} from '../../assets/fonts';
import {CustomTheme} from '../../theme';
import {normalizeFont} from '../../utils/size';
import useStyles from './style';
import VideosScreen from '../VideosScreen/VideosScreen';
import {navigate} from '../../routes/navigationUtilities';
import CameraRoll from '@react-native-community/cameraroll';
import {useTheme} from '@react-navigation/native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import {bannerAddKey} from '../../constants';
const HomeScreen = () => {
  // State
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const styles = useStyles();
  const colorScheme = useColorScheme();
  const {colors} = useTheme() as CustomTheme;
  // Hook
  const bannerRef = useRef<BannerAd>(null);
  // adds
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });
  // Request File Permissions for iOS
  const checkAndRequestFilePermissions = async () => {
    try {
      // Check current permission status
      const currentStatus = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);

      switch (currentStatus) {
        case RESULTS.GRANTED:
          console.log('Media Library permission already granted.');
          return true; // Permission already granted

        case RESULTS.DENIED:
          console.log(
            'Media Library permission denied. Requesting permission...',
          );
          return await requestFilePermissions(); // Request permission again

        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Media Library access is blocked. Please go to settings to enable it.',
          );
          return false; // Blocked, user needs to enable it manually

        case RESULTS.LIMITED:
          Alert.alert(
            'Limited Permission',
            'Media Library access is limited. Some features may not work correctly. Please enable full access in settings.',
          );
          return true; // Limited access but usable

        case RESULTS.UNAVAILABLE:
          console.log(
            'Media Library permission is not available on this device.',
          );
          return false; // Not available, nothing to request

        default:
          return await requestFilePermissions(); // For any other cases, request permission
      }
    } catch (error) {
      console.log('Error checking media library permissions:', error);
      return false;
    }
  };

  const requestFilePermissions = async () => {
    try {
      // Request media library permission
      const result = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);

      switch (result) {
        case RESULTS.GRANTED:
          console.log('Media Library permission granted.');
          return true;
        case RESULTS.DENIED:
          Alert.alert(
            'Permission Denied',
            'You have denied media library access. You will need to enable it in settings.',
          );
          return false;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Media Library access has been blocked. Please enable it in settings.',
          );
          return false;
        case RESULTS.LIMITED:
          Alert.alert(
            'Limited Permission',
            'Media Library access is limited. Some features may not work fully.',
          );
          return true; // Limited access, but usable
        case RESULTS.UNAVAILABLE:
          console.log(
            'Media Library permission is unavailable on this device.',
          );
          return false;
        default:
          console.log('Unknown permission result:', result);
          return false;
      }
    } catch (error) {
      console.log('Error requesting media library permissions:', error);
      return false;
    }
  };

  // Fetch and set video data
  useEffect(() => {
    const initializeMedia = async () => {
      await checkAndRequestFilePermissions();
      await requestFilePermissions();
      setTimeout(async () => {
        fetchVideos();
        setLoading(false);
      }, 1000);
    };

    initializeMedia();
  }, []);

  /*
   ** Render part of the component
   */
  const Tab = createMaterialTopTabNavigator();

  // Function to fetch videos from the Photos library
  // this function is working is fine for fetching the videos

  const fetchVideos = async () => {
    try {
      const phoneGalleryVideos = await CameraRoll.getPhotos({
        first: 500,
        assetType: 'Videos', // Fetch only videos
      });
      setVideos(phoneGalleryVideos?.edges?.map(edge => edge.node));
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // end

  const FolderScreen = () => {
    return (
      <View style={styles.folderSectionMain}>
        {loading ? (
          <>
            <View style={styles.loadingView}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          </>
        ) : (
          <FlatList
            data={[1]}
            showsVerticalScrollIndicator={false}
            renderItem={() => {
              return (
                <TouchableOpacity
                  onPress={() => navigate('SingleFolderScreen', {videos})}
                  style={styles.folderMain}>
                  <Image source={IMAGES.folder} style={styles.folderImage} />
                  <View style={styles.folderNameView}>
                    <Text style={styles.folderName}>All Videos</Text>
                    <Text style={styles.folderLength}>
                      Videos {videos?.length}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <Text onPress={() => {}} style={styles.header}>
          Video Player
        </Text>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => {
            navigate('SearchScreen', {videos});
            console.log('🚀 ~ onPress ~ navigate ~ SearchScreen');
          }}>
          {colorScheme === 'light' ? <SVG.blackSearch /> : <SVG.search />}
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 12,
        }}>
        <BannerAd
          ref={bannerRef}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={__DEV__ ? TestIds.BANNER : bannerAddKey}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: normalizeFont(17),
            fontFamily: FONTS.poppinsMedium,
          },
          tabBarStyle: {
            width: '92%',
            marginBottom: 17,
            alignSelf: 'center',
            backgroundColor: colors.background,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.titleColor,
          tabBarIndicatorStyle: {
            height: '3%',
          },
        }}>
        <Tab.Screen name="Videos">
          {() => <VideosScreen videos={videos} />}
        </Tab.Screen>
        <Tab.Screen name="Folder">{() => <FolderScreen />}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default HomeScreen;
