/* eslint-disable react/no-unstable-nested-components */
import {
  Alert,
  FlatList,
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useStyles from './styles';
import {SVG} from '../../assets';
import {navigate} from '../../routes/navigationUtilities';
import CameraRoll from '@react-native-community/cameraroll';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';
import {normalizeHeight} from '../../utils/size';
import {loadStorage, saveStorage} from '../../utils/storage/storage';

const VideosScreen = () => {
  // State
  const styles = useStyles();
  const [isMoreOptionVisible, setIsMoreOptionVisible] = useState(
    null as number | null,
  );

  // Hook

  const videos = loadStorage('videos');

  const {colors} = useTheme() as CustomTheme;

  // Function
  const addressHandler = (index: number) => {
    setIsMoreOptionVisible(index === isMoreOptionVisible ? null : index);
  };
  // Delete function
  const deleteVideo = async (uri: any, index: any) => {
    try {
      await CameraRoll.deletePhotos([uri]);
      // Remove the deleted video from the list
      saveStorage(
        'videos',
        videos?.filter((_: any, i: number) => i !== index),
      );
      setIsMoreOptionVisible(null);
      Alert.alert('Success', 'Video deleted successfully!');
    } catch (error) {
      setIsMoreOptionVisible(null);
      console.error('Error deleting video:', error);
      Alert.alert('Error', 'Failed to delete the video');
    }
  };

  // Share function
  const shareVideo = async (uri: any) => {
    try {
      await Share.share({
        // message: 'Check out this video!',
        url: uri,
      });
      setIsMoreOptionVisible(null);
    } catch (error) {
      setIsMoreOptionVisible(null);
      console.error('Error sharing video:', error);
    }
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        ListFooterComponent={() => (
          <View style={{height: normalizeHeight(100)}} />
        )}
        data={videos}
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
                  <TouchableOpacity
                    onPress={() => {
                      shareVideo(item?.image?.uri);
                    }}>
                    <Text style={styles.moreOptionTextStyle}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteVideo(item?.image?.uri, index)}>
                    <Text style={styles.moreOptionTextStyle}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default VideosScreen;
