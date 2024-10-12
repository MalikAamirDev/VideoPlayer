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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import {IMAGES, SVG} from '../../assets';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FONTS} from '../../assets/fonts';
import {COLORS} from '../../theme';
import {normalizeFont} from '../../utils/size';
import useStyles from './style';
import VideosScreen from '../VideosScreen/VideosScreen';

const HomeScreen = () => {
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(true);
  const styles = useStyles();
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

  //Fetch media files and organize by folder

  const getDirectories = async () => {
    try {
      const rootPath = RNFS.DocumentDirectoryPath; // Use appropriate path for media files
      console.log('Fetching files from path:', rootPath);

      const files = await RNFS.readDir(rootPath); // Get files and directories
      console.log('Files found:', files);

      const videosByFolder = {};

      files.forEach(file => {
        const filePath = file.path;
        const folder = filePath.split('/').slice(-2, -1)[0]; // Extract folder name

        // Check if the file is a video and ends with .mp4
        if (file.isFile() && file.name.endsWith('.mp4')) {
          if (!videosByFolder[folder]) {
            videosByFolder[folder] = [];
          }
          videosByFolder[folder].push(file);
        }
      });

      return videosByFolder; // Return video files by folder
    } catch (err) {
      console.log('Error fetching directories:', err);
      Alert.alert('Error', 'Failed to fetch video files.');
      return {};
    }
  };

  // Fetch and set video data
  useEffect(() => {
    const initializeMedia = async () => {
      await requestFilePermissions();
      await checkAndRequestFilePermissions();
      setTimeout(async () => {
        console.log('🚀 ~ initializeMedia ~ getDirectories:');
        const fetchedVideos = await getDirectories();
        console.log('🚀 ~ initializeMedia ~ fetchedVideos:o', fetchedVideos);

        setVideos(fetchedVideos);
      }, 5000);

      setLoading(false);
    };

    initializeMedia();
  }, []);

  /*
   ** Render part of the component
   */
  const Tab = createMaterialTopTabNavigator();

  // const VideosScreen = () => {
  //   return (
  //     <View style={styles.folderSectionMain}>
  //       <Text>VideosScreen</Text>
  //     </View>
  //   );
  // };
  const FolderScreen = () => {
    return (
      <View style={styles.folderSectionMain}>
        <View style={styles.folderMain}>
          <Image source={IMAGES.folder} style={styles.folderImage} />
          <View style={styles.folderNameView}>
            <Text style={styles.folderName}>FolderScreen</Text>
            <Text style={styles.folderLength}>
              Videos {Object.keys(videos).length}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Video Player</Text>
        <TouchableOpacity onPress={() => {}}>
          <SVG.search />
        </TouchableOpacity>
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
            backgroundColor: COLORS.background,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.titleColor,
          tabBarIndicatorStyle: {
            height: '3%',
          },
        }}>
        <Tab.Screen name="Folder">{() => <FolderScreen />}</Tab.Screen>
        <Tab.Screen name="Videos">{() => <VideosScreen />}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default HomeScreen;

// test for media library

// {Object?.keys(videos)?.length === 0 ? (
//   <Text>No videos found.</Text>
// ) : (
//   <View>
//     {Object?.keys(!videos)?.map(folder => (
//       <View key={folder} style={styles.folderSection}>
//         <Text style={styles.folderTitle}>{folder}</Text>
//         {videos[folder]?.length > 0 && (
//           <FlatList
//             data={videos[folder]}
//             horizontal
//             renderItem={({item}) => (
//               <TouchableOpacity style={styles.videoItem}>
//                 <Video
//                   source={{uri: item.path}}
//                   style={styles.videoPlayer}
//                   resizeMode="cover"
//                   controls={true}
//                 />
//               </TouchableOpacity>
//             )}
//             keyExtractor={item => item.name}
//             showsHorizontalScrollIndicator={false}
//           />
//         )}
//       </View>
//     ))}
//   </View>
// )}
