/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import {ICONS, IMAGES, SVG} from '../../assets';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import VerticalSlider from 'rn-vertical-slider-matyno';
import {normalizeHeight, normalizeWidth} from '../../utils/size';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import SystemSetting from 'react-native-system-setting';
import {COLORS} from '../../theme';
interface VideoRef {
  seek: (time: number) => void;
}
const SingleVideoScreen = ({route}: any) => {
  const data = route?.params?.item;
  console.log('🚀 ~ SingleVideoSp kk', data.image.height);
  console.log('🚀 ~ SingleVideoScreen ~ data:uri', data.image.uri);

  // State
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false); // Track if the video has started
  const [modalVisible, setModalVisible] = useState(false);
  const [speedModalVisible, setSpeedModalVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [visibleLockButton, setVisibleLockButton] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState(1.0);
  const [progress, setProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });
  const [fullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [brightness, setBrightness] = useState(50); // Initial brightness is 50%
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Toggle volume slider display
  // Hook
  useEffect(() => {
    // Get the current system volume
    SystemSetting.getVolume().then(currentVolume => {
      setVolume(currentVolume);
      console.log('Initial Volume:', currentVolume);
    });

    // Get the current brightness
    SystemSetting.getAppBrightness().then(currentBrightness => {
      setBrightness(currentBrightness * 100); // Scale to 0-100 for slider
      console.log('Initial Brightness:', currentBrightness);
    });
  }, []);

  // Refs for video and tap timeout
  const videoRef = useRef<VideoRef>(null);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Functions
  // Function to format seconds into MM:SS
  const format = (seconds: number): string => {
    let mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  // Function to handle play/pause button press
  const handlePlayPause = () => {
    if (paused && progress.currentTime >= progress.seekableDuration) {
      videoRef.current?.seek(0); // Restart the video if it has ended
      setProgress({
        currentTime: 0,
        seekableDuration: progress.seekableDuration,
      });
    }
    setPaused(!paused); // Toggle pause state
    // setClicked(true); // Show controls overlay
    if (!videoStarted) {
      setVideoStarted(true);
    }
  };
  // Function to handle fullscreen toggle
  const handleFullscreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };
  // Function to handle video end event
  const handleVideoEnd = () => {
    if (isRepeat) {
      videoRef.current?.seek(0); // Restart the video if it has ended
      setProgress({
        currentTime: 0,
        seekableDuration: progress.seekableDuration,
      });
    } else {
      setPaused(true);
      setVideoStarted(false);
      setProgress({currentTime: 0, seekableDuration: 0});
      setClicked(false);
      if (fullScreen) {
        Orientation.lockToPortrait();
        setFullScreen(false);
      }
    }
  };
  const handleClick = () => {
    if (videoStarted) {
      handleTap();
    }
  };

  // Function to handle double-tap for seek forward and backward
  const handleTap = (direction: 'left' | 'right') => {
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
      handleDoubleTap(direction);
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        handleSingleTap();
        tapTimeoutRef.current = null;
      }, 300); // Adjust timeout value as needed
    }
  };

  const handleDoubleTap = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      videoRef.current?.seek(Math.max(0, progress.currentTime - 10));
    } else if (direction === 'right') {
      videoRef.current?.seek(
        Math.min(progress.seekableDuration, progress.currentTime + 10),
      );
    }
  };

  const handleSingleTap = () => {
    setClicked(!clicked);
  };
  const handleSetting = () => {
    setModalVisible(!modalVisible);
  };
  const handleLock = () => {
    if (locked) {
      setLocked(!locked);
      setFullScreen(!fullScreen);
      setLocked(!locked);
      setClicked(false);
    } else {
      Orientation.lockToLandscape();
      setModalVisible(!modalVisible);
      setFullScreen(!fullScreen);
      setClicked(!clicked);
      setLocked(!locked);
    }
  };
  const handleFullscreenLock = () => {
    if (locked) {
      setLocked(!locked);
      setClicked(false);
    } else {
      setModalVisible(!modalVisible);
      setClicked(!clicked);
      setLocked(!locked);
    }
  };
  const speeds = [
    {label: '0.5x', value: 0.5},
    {label: '1x', value: 1},
    {label: '1.5x', value: 1.5},
    {label: '2x', value: 2},
  ];

  const handleSpeed = (value: {label: string; value: number}) => {
    const speed = value.value;
    setSelectedSpeed(speed);
    setSpeedModalVisible(!speedModalVisible);
  };
  // Hook
  const navigation = useAppNavigation();
  // Function to detect vertical swipe and toggle volume slider
  const onGestureEvent = event => {
    const {translationY} = event.nativeEvent;

    // Show volume slider on vertical movement
    if (Math.abs(translationY) > 50) {
      setShowVolumeSlider(true);
    } else {
      setShowVolumeSlider(false);
    }
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={styles.mainStyle}>
          <SafeAreaView />
          <Pressable
            style={[{width: '100%', height: '90%'}]}
            onPress={() => handleClick()}>
            {/*  Lock Button */}
            {locked && (
              <Pressable
                onPress={() => setVisibleLockButton(!visibleLockButton)}
                style={styles.lockViewStyle}>
                {visibleLockButton && (
                  <TouchableOpacity
                    style={styles.lockboxStyle}
                    onPress={() => {
                      if (fullScreen) {
                        handleFullscreenLock();
                      } else {
                        handleLock();
                      }
                    }}>
                    <ICONS.lockIcon />
                    <Text style={styles.lockIconTextStyle}>Lock</Text>
                  </TouchableOpacity>
                )}
              </Pressable>
            )}

            <Video
              onError={error => console.error(error)}
              paused={paused}
              source={{
                uri: data.image.uri as string,
              }}
              // source={{
              //   uri: 'ph://CFDA0FFA-008D-4B70-BABC-DD2DD46FE684/L0/001',
              // }}
              ref={videoRef}
              onProgress={x => setProgress(x)}
              onEnd={handleVideoEnd}
              style={styles.video}
              resizeMode="contain"
              fullscreen={fullScreen}
              rate={selectedSpeed}
            />

            {/* {!videoStarted && (
          <Image
            resizeMode="contain"
            source={{
              uri: data.image.uri as string,
            }}
            style={styles.thumbnail}
          />
        )} */}
            {/* {!videoStarted && (
          <View style={styles.playButtonOverlay}>
            <Pressable onPress={handlePlayPause}>
              <ICONS.playIcon />
            </Pressable>
          </View>
        )} */}

            <Pressable
              style={[styles.overlay, {opacity: clicked && !locked ? 1 : 0}]}
              onPress={() => setClicked(!clicked)}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'blue',
                }}>
                <VerticalSlider
                  value={volume * 100} // Convert the volume to 0-100 scale for the slider
                  disabled={false}
                  min={0}
                  max={100}
                  onChange={async (value: number) => {
                    try {
                      console.log('Volume Slider Changed:', value);
                      const volumeValue = value / 100;
                      await SystemSetting.setVolume(volumeValue);
                      setVolume(volumeValue);
                      const currentVolume = await SystemSetting.getVolume();
                      console.log('Current system volume is ' + currentVolume);
                    } catch (error) {
                      console.error('Failed to set volume:', error);
                    }
                  }}
                  onComplete={(value: number) => {
                    console.log('Volume Adjustment Complete:', value);
                  }}
                  width={normalizeWidth(25)}
                  height={normalizeHeight(190)}
                  step={1}
                  borderRadius={5}
                  minimumTrackTintColor={COLORS.primary}
                  maximumTrackTintColor={'rgba(0, 0, 0, 0.3)'}
                />

                <TouchableOpacity
                  style={{
                    width: '23%',
                    zIndex: 12,
                    // backgroundColor: 'coral',
                    paddingVertical: 120,
                  }}
                  onPress={() => handleTap('left')}>
                  <View style={styles.iconBack}>{/* <SVG.videoBack /> */}</View>
                </TouchableOpacity>
                {clicked && (
                  <Pressable
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                      paddingHorizontal: 25,
                    }}
                    onPress={handlePlayPause}>
                    {paused ? <ICONS.playIcon /> : <ICONS.pause />}
                  </Pressable>
                )}
                <TouchableOpacity
                  style={{
                    width: '23%',
                    paddingVertical: 120,
                  }}
                  onPress={() => handleTap('right')}>
                  <View style={styles.icon}>{/* <SVG.videoForward /> */}</View>
                </TouchableOpacity>

                {/* brightness */}
                <VerticalSlider
                  value={brightness}
                  disabled={false}
                  min={0}
                  max={100}
                  onChange={async (value: number) => {
                    try {
                      console.log('Brightness Slider Changed:', value);
                      const brightnessValue = value / 100;
                      await SystemSetting.setAppBrightness(brightnessValue);
                      setBrightness(value);
                      const currentBrightness =
                        await SystemSetting.getAppBrightness();
                      console.log(
                        'Current app brightness is ' + currentBrightness,
                      );
                    } catch (error) {
                      console.error('Failed to set brightness:', error);
                    }
                  }}
                  onComplete={(value: number) => {
                    console.log('COMPLETE', value);
                  }}
                  width={normalizeWidth(25)}
                  height={normalizeHeight(190)}
                  step={1}
                  borderRadius={5}
                  minimumTrackTintColor={COLORS.error}
                  maximumTrackTintColor={'rgba(0, 0, 0, 0.3)'}
                />
              </View>
              <View style={styles.bottomControls}>
                <Slider
                  value={progress.currentTime}
                  style={{width: '97%', height: 10}}
                  minimumValue={0}
                  maximumValue={progress.seekableDuration}
                  minimumTrackTintColor="#0093CB"
                  maximumTrackTintColor="#FFFFFF"
                  onValueChange={x => videoRef.current?.seek(x)}
                />
                <View
                  style={[
                    styles.timeContainer,
                    fullScreen ? {width: '89%'} : {width: '87%'},
                  ]}>
                  <Text style={{color: 'white'}}>
                    {format(progress.currentTime)}
                  </Text>
                  <Text style={{color: 'white'}}>
                    {format(progress.seekableDuration - progress.currentTime)}
                  </Text>
                </View>
              </View>

              {clicked && (
                <View style={styles.headerStyle}>
                  <TouchableOpacity
                    style={styles.backBtnStyle}
                    onPress={() => navigation.goBack()}>
                    <SVG.backArrow />
                  </TouchableOpacity>
                  <View
                    style={
                      fullScreen
                        ? {width: '80%', paddingRight: 7}
                        : {width: '80%', paddingRight: 7}
                    }>
                    <Text numberOfLines={1} style={styles.videoName}>
                      {data?.image?.filename}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      handleSetting();
                    }}>
                    <ICONS.setting />
                  </TouchableOpacity>
                </View>
              )}
              {clicked && (
                <View style={styles.topControls}>
                  <Pressable onPress={handleFullscreen}>
                    {fullScreen ? <ICONS.minimize /> : <ICONS.fullScreenIcon />}
                  </Pressable>
                </View>
              )}
            </Pressable>
          </Pressable>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.centeredView}>
              <Pressable
                style={[styles.modalView, {width: fullScreen ? '60%' : '90%'}]}>
                {/* Repeat off  */}
                <TouchableOpacity
                  onPress={() => {
                    setIsRepeat(false);
                  }}
                  style={styles.settingModalViewStyle}>
                  <Image
                    style={{
                      width: 17,
                      height: 17,
                      alignSelf: 'center',
                      marginBottom: 7,
                    }}
                    source={IMAGES.cross}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.textStyle}>Repeat off</Text>
                    <View
                      style={{
                        borderColor: COLORS.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1.5,
                        height: 25,
                        width: 25,
                        borderRadius: 15,
                      }}>
                      {!isRepeat && (
                        <View
                          style={{
                            backgroundColor: COLORS.primary,
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                          }}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsRepeat(true);
                  }}
                  style={styles.settingModalViewStyle}>
                  <Image
                    style={{
                      width: 17,
                      height: 17,
                      alignSelf: 'center',
                      marginBottom: 7,
                    }}
                    source={IMAGES.repeat}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.textStyle}>Repeat on</Text>
                    <View
                      style={{
                        borderColor: COLORS.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1.5,
                        height: 25,
                        width: 25,
                        borderRadius: 15,
                      }}>
                      {isRepeat && (
                        <View
                          style={{
                            backgroundColor: COLORS.primary,
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                          }}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSpeedModalVisible(!speedModalVisible);
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.settingModalViewStyle}>
                  <ICONS.speedIcon />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.textStyle}>Play Speed</Text>
                    <Text style={styles.textStyle}>{selectedSpeed}x</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (fullScreen) {
                      handleFullscreenLock();
                    } else {
                      handleLock();
                    }
                  }}
                  style={styles.settingModalViewStyle}>
                  <ICONS.lockIcon />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.textStyle}>Lock Screen</Text>
                  </View>
                </TouchableOpacity>
              </Pressable>
            </TouchableOpacity>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={speedModalVisible}
            onRequestClose={() => {
              setSpeedModalVisible(!modalVisible);
            }}>
            <TouchableOpacity
              onPress={() => setSpeedModalVisible(!speedModalVisible)}
              style={styles.speedModalView}>
              <Pressable
                style={[
                  styles.modalView,
                  // {height: fullScreen ? '32%' : '18%'},
                  {width: fullScreen ? '60%' : '90%'},
                ]}>
                {speeds.map((speed, index) => (
                  <TouchableOpacity
                    onPress={() => handleSpeed(speed)}
                    style={{
                      paddingVertical: 10,
                      marginVertical: 3,
                    }}
                    key={index}>
                    <Text style={styles.textStyle}>{speed.label}</Text>
                  </TouchableOpacity>
                ))}
              </Pressable>
            </TouchableOpacity>
          </Modal>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  video: {
    borderRadius: 22,
    width: '100%',
    height: '100%',
  },
  timeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 19,
  },
  iconBack: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    alignItems: 'center',
    width: '100%',
  },
  mainStyle: {
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 11,
  },
  thumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2 )',
  },
  // playButton: {
  //   width: 30,
  //   height: 30,
  //   tintColor: 'white',
  // },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  bottomControls: {
    width: '100%',
    position: 'absolute',
    bottom: 7,
    paddingBottom: 10,
    paddingLeft: 7,
  },
  topControls: {
    flexDirection: 'row',
    right: -1,
    position: 'absolute',
    bottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerStyle: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,.9)',
    width: '100%',
    alignItems: 'center',
  },
  videoName: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  backBtnStyle: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
  },
  speedModalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    paddingTop: 7,
    marginBottom: 50,
    justifyContent: 'center',
  },
  settingModalViewStyle: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },

  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  speedTextStyle: {
    paddingVertical: 5,
    color: 'black',
    fontWeight: 'bold',
  },

  lockIconTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  lockViewStyle: {
    position: 'absolute',
    zIndex: 999,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  lockboxStyle: {
    backgroundColor: 'white',
    padding: 3,
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    top: 280,
  },
});

export default SingleVideoScreen;
