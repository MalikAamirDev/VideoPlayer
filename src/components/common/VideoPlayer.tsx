import React from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({videoUri}) => {
  return (
    <View>
      <Video
        source={{uri: videoUri}} // Video file path
        style={{width: '100%', height: 200}}
        controls={true} // Show playback controls
        resizeMode="contain"
      />
    </View>
  );
};

export default VideoPlayer;
