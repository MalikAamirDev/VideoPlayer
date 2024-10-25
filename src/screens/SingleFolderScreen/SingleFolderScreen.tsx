/* eslint-disable react/no-unstable-nested-components */
import {
  Alert,
  FlatList,
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SVG} from '../../assets';
import useStyles from './style';
import {BackButton} from '../../components';
import {navigate} from '../../routes/navigationUtilities';
import CameraRoll from '@react-native-community/cameraroll';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import {bannerAddKey} from '../../constants';
import {normalizeHeight} from '../../utils/size';

const SingleFolderScreen = ({route}: any) => {
  const videos = route?.params?.videos;
  const [videosData, setVideosData] = useState([]);
  // State
  const [isMoreOptionVisible, setIsMoreOptionVisible] = useState(
    null as number | null,
  );
  // Hook
  const styles = useStyles();
  const colorScheme = useColorScheme();
  useEffect(() => {
    setVideosData(videos);
  }, [videos]);
  const {colors} = useTheme() as CustomTheme;
  // Hook
  const bannerRef = useRef<BannerAd>(null);
  // adds
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });
  // functions
  const addressHandler = (index: number) => {
    setIsMoreOptionVisible(index === isMoreOptionVisible ? null : index);
  };
  // Delete function
  const deleteVideo = async (uri: any, index: any) => {
    try {
      await CameraRoll.deletePhotos([uri]);
      // Remove the deleted video from the list
      setVideosData(videos.filter((_: any, i: number) => i !== index));
      setIsMoreOptionVisible(null);
      Alert.alert('Success', 'Video deleted successfully!');
    } catch (error) {
      setIsMoreOptionVisible(null);
      console.error('Error deleting video:', error);
      Alert.alert('Error', 'Failed to delete the video');
    }
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView />
      <View style={styles.headerStyle}>
        <BackButton
          fillColor={colors.inverseColor}
          viewStyle={styles.backButtonStyle}
        />
        <Text style={styles.headerTileStyle}>All Videos</Text>
        <TouchableOpacity
          onPress={() => {
            navigate('SearchScreen', {videos});
          }}>
          {colorScheme === 'light' ? <SVG.blackSearch /> : <SVG.search />}
        </TouchableOpacity>
      </View>

      <FlatList
        ListFooterComponent={() => (
          <View style={{height: normalizeHeight(100)}} />
        )}
        data={videosData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: any) => {
          console.log('imageimageeeuri', item?.image.uri);
          const date = new Date(item?.timestamp * 1000);
          const day = date.getDate(); // Get the day of the month
          const month = date.toLocaleString('en-US', {month: 'long'}); // Get the full month name
          // Display in "DD Month" format
          const formattedDate = `${day} ${month}`;

          // Function to convert file size to human-readable format
          const formatFileSize = (bytes: number): string => {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0 Bytes';
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return (
              parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) +
              ' ' +
              sizes[i]
            );
          };

          // Display the formatted file size
          const fileSize = formatFileSize(item?.image.fileSize);

          console.log('fileSize', fileSize); // Example: "35.11 MB"

          // Function to format playableDuration as "0:ss"
          const formatPlayableDuration = (duration: number): string => {
            if (duration < 60) {
              // Return the formatted string as "0:ss"
              return `0:${Math.floor(duration)}`;
            } else {
              // Handle the case if duration is more than 60 seconds (if needed)
              return `${Math.floor(duration / 60)}:${Math.floor(
                duration % 60,
              )}`;
            }
          };

          return (
            <>
              <TouchableOpacity
                key={index}
                onPress={() => navigate('SingleVideoScreen', {item})}
                style={styles.videoMainView}>
                <ImageBackground
                  source={{uri: item?.image?.uri}}
                  style={styles.image}>
                  <Text style={styles.durationTextStyle}>
                    {formatPlayableDuration(item?.image?.playableDuration)}
                  </Text>
                </ImageBackground>
                <View style={styles.titleViewStyle}>
                  <Text numberOfLines={2} style={styles.titleStyle}>
                    {item?.image?.filename}
                  </Text>
                  <Text style={styles.dateStyle}>{formattedDate}</Text>
                </View>
                <TouchableOpacity
                  style={styles.moreOptionView}
                  onPress={() => addressHandler(index)}>
                  <SVG.moreOption fill={colors.inverseColor} />
                </TouchableOpacity>
              </TouchableOpacity>

              {isMoreOptionVisible === index && (
                <View style={styles.moreOption}>
                  <TouchableOpacity onPress={() => navigate('')}>
                    <Text style={styles.moreOptionTextStyle}>Play</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteVideo(item?.image?.uri, index)}>
                    <Text style={styles.moreOptionTextStyle}>Delete</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => navigate('')}>
                    <Text style={styles.moreOptionTextStyle}>Play</Text>
                  </TouchableOpacity> */}
                </View>
              )}
            </>
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 12,
          zIndex: 12,
        }}>
        <BannerAd
          ref={bannerRef}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={__DEV__ ? TestIds.BANNER : bannerAddKey}
        />
      </View>
    </View>
  );
};

export default SingleFolderScreen;
