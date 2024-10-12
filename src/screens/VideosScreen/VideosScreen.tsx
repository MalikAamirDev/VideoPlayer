import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {IMAGES, SVG} from '../../assets';

const VideosScreen = () => {
  const styles = useStyles();
  const data = [
    0, 1, 2, 3, 45, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  return (
    <View style={styles.mainView}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <View style={styles.videoMainView}>
              <ImageBackground source={IMAGES.onBoarding1} style={styles.image}>
                <Text style={styles.durationTextStyle}>0:12</Text>
              </ImageBackground>
              <View style={styles.titleViewStyle}>
                <Text numberOfLines={2} style={styles.titleStyle}>
                  Videos path will be here Videos path will be here Videos path
                  will
                </Text>
                <Text style={styles.dateStyle}>25 sept</Text>
              </View>
              <TouchableOpacity>
                <SVG.moreOption />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default VideosScreen;
