/* eslint-disable react-native/split-platform-components */
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

interface onPressUploadType {
  callBck: (data: ImagePickerResponse) => void;
}

export default function useImagePicker() {
  /*
   ** for uploading video
   */
  const onPressVideoUpload = ({callBck}: onPressUploadType): void => {
    const options: CameraOptions = {
      mediaType: 'video',
      includeExtra: true,
      durationLimit: 5,
      videoQuality: 'medium',
      formatAsMp4: true,
    };
    Alert.alert('Upload Video', 'Choose upload options', [
      // camera btn
      {
        text: 'Video Camera',
        onPress: async () => {
          // checking for platform
          if (Platform.OS === 'android') {
            // requesting permission
            const androidPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            console.debug('android permission', androidPermission);
            if (androidPermission === 'granted') {
              // launcging camera
              const camResponse = await launchCamera(options);
              console.debug('camResponse is:', camResponse);
              if (camResponse.assets && camResponse.assets[0].fileSize) {
                if (camResponse.assets[0].fileSize > 50000000) {
                  return Toast.show('Testing Toats', Toast.LONG);
                } else {
                  callBck(camResponse);
                }
              } else if (camResponse.errorCode) {
                Toast.show('Testing Toats', Toast.LONG);
              }
            } else if (androidPermission === 'never_ask_again') {
              Toast.show('Testing Toats', Toast.LONG);
            }
          } else {
            // launching camera
            const camResponse = await launchCamera(options);
            console.debug('camResponse is:', camResponse);
            if (camResponse.assets && camResponse.assets[0].fileSize) {
              // checking vide size
              if (camResponse.assets[0].fileSize > 50000000) {
                return Toast.show('Testing Toats', Toast.LONG);
              } else {
                callBck(camResponse);
              }
            } else if (camResponse.errorCode) {
              Toast.show('Testing Toats', Toast.LONG);
            }
          }
        },
        style: 'cancel',
      },
      // gallery btn
      {
        text: 'Video Gallery',
        onPress: async () => {
          // lanunching image gallery
          const ImageLibResponse = await launchImageLibrary(options);
          console.log('ImageLibResponse is:', ImageLibResponse);
          if (ImageLibResponse.assets && ImageLibResponse.assets[0].fileSize) {
            // checking size condition
            if (ImageLibResponse.assets[0].fileSize > 50000000) {
              return Toast.show('Testing Toats', Toast.LONG);
            } else {
              callBck(ImageLibResponse);
            }
          } else if (ImageLibResponse.errorCode) {
            Toast.show('Testing Toats', Toast.LONG);
          }
        },
        style: 'cancel',
      },
      // cancel btn
      {
        text: 'Cancel',
        onPress: () => console.log('onPress cancel'),
        style: 'cancel',
      },
    ]);
  };

  /*
   ** for uploading image
   */
  const onPressImageUpload = ({callBck}: onPressUploadType): void => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeExtra: true,
      maxHeight: 1024,
      maxWidth: 1024,
      selectionLimit: 1,
    };
    Alert.alert('Upload profile Image', 'Choose upload options', [
      // camera btn
      {
        text: 'Camera',
        onPress: async () => {
          // checking for platform
          if (Platform.OS === 'android') {
            // requesting permission
            const androidPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            console.debug('android permission', androidPermission);

            // permission is granted
            if (androidPermission === 'granted') {
              const camResponse = await launchCamera(options);
              console.debug('camResponse is:', camResponse);
              if (camResponse.assets) {
                callBck(camResponse);
              }
            } else if (androidPermission === 'never_ask_again') {
              Toast.show('Testing Toats', Toast.LONG);
            }
          } else {
            // launching camera
            const camResponse = await launchCamera(options);
            console.debug('camResponse is:', camResponse);
            if (camResponse.assets) {
              callBck(camResponse);
            } else if (camResponse.errorCode) {
              Toast.show('Testing Toats', Toast.LONG);
            }
          }
        },
        style: 'cancel',
      },
      // gallery btn
      {
        text: 'Gallery',
        onPress: async () => {
          // launch image librrary
          const ImageLibResponse = await launchImageLibrary(options);
          console.log('ImageLibResponse is:', ImageLibResponse);
          if (ImageLibResponse.assets) {
            callBck(ImageLibResponse);
          } else if (ImageLibResponse.errorCode) {
            Toast.show('Testing Toats', Toast.LONG);
          }
        },
        style: 'cancel',
      },
      // cancel btn
      {
        text: 'Cancel',
        onPress: () => console.log('onPress cancel'),
        style: 'cancel',
      },
    ]);
  };

  return {onPressVideoUpload, onPressImageUpload};
}
