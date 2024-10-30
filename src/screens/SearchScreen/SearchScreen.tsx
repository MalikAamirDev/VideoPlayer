/* eslint-disable react/no-unstable-nested-components */
import {
  Alert,
  FlatList,
  ImageBackground,
  Platform,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {SVG} from '../../assets';
import useStyles from './style';
import {BackButton, InputTextLabel} from '../../components';

import {navigate} from '../../routes/navigationUtilities';
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
import {loadStorage, saveStorage} from '../../utils/storage/storage';
import CameraRoll from '@react-native-community/cameraroll';

const SearchScreen = () => {
  const initialVideosData = loadStorage('videos');
  // Hook
  const styles = useStyles();
  const {colors} = useTheme() as CustomTheme;
  // Hook
  const bannerRef = useRef<BannerAd>(null);
  // adds
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });
  // State
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredVideos, setFilteredVideos] = useState(null); // State for filtered videos
  const [isMoreOptionVisible, setIsMoreOptionVisible] = useState<number | null>(
    null,
  );

  // Function to filter videos based on searchValue
  useEffect(() => {
    if (searchValue) {
      const filteredList = initialVideosData?.filter(video =>
        video?.image?.filename
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
      setFilteredVideos(filteredList);
    } else {
      setFilteredVideos(initialVideosData); // Reset to all videos when search is cleared
    }
  }, [searchValue]);

  // Function to handle showing more options
  const addressHandler = (index: number) => {
    setIsMoreOptionVisible(index === isMoreOptionVisible ? null : index);
  };

  // Function to handle deleting a video
  const handleDelete = (index: number, item: any) => {
    Alert.alert('Delete Video', 'Are you sure you want to delete this video?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await CameraRoll.deletePhotos([item?.image?.uri]);
          const updatedVideos = [...filteredVideos];
          updatedVideos.splice(index, 1); // Remove video at the index
          saveStorage('videos', updatedVideos);
          setFilteredVideos(updatedVideos); // Update filtered videos list
          setIsMoreOptionVisible(null);
        },
        style: 'destructive',
      },
    ]);
  };

  // Function to handle sharing a video
  const handleShare = async (item: any) => {
    try {
      const result = await Share.share({
        // message: `Check out this video: ${item?.image?.filename}`,
        url: item?.image?.uri, // Optionally share the video URL if available
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type of', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.log('Error sharing video:', error.message);
    } finally {
      setIsMoreOptionVisible(null);
    }
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView />
      <View style={styles.headerStyle}>
        <BackButton fillColor={colors.inverseColor} />
        <InputTextLabel
          viewStyle={styles.inputViewStyle}
          placeHolder={'Search'}
          onChangeText={setSearchValue}
          value={searchValue}
          textInputStyle={styles.inputStyle}
        />
      </View>

      <FlatList
        ListFooterComponent={() => (
          <View style={{height: normalizeHeight(100)}} />
        )}
        data={filteredVideos}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
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
                onPress={() => navigate('SingleVideoScreen', {item})}
                key={index}
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
                  <TouchableOpacity onPress={() => handleShare(item)}>
                    <Text style={styles.moreOptionTextStyle}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index, item)}>
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
      <View style={styles.bannerView}>
        <BannerAd
          ref={bannerRef}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={__DEV__ ? TestIds.BANNER : bannerAddKey}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
