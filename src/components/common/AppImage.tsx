import React, {useLayoutEffect, useState} from 'react';
import {Image, ImageProps as imageProps, ImageURISource} from 'react-native';

export interface AppImageType extends imageProps {
  /**
   * How wide should the image be?
   */
  maxWidth?: number;
  /**
   * How tall should the image be?
   */
  maxHeight?: number;
}

/**
 * A hook that will return the scaled dimensions of an image based on the
 * provided dimensions' aspect ratio. If no desired dimensions are provided,
 * it will return the original dimensions of the remote image.
 *
 * How is this different from `resizeMode: 'contain'`? Firstly, you can
 * specify only one side's size (not both). Secondly, the image will scale to fit
 * the desired dimensions instead of just being contained within its image-container.
 * @param {number} remoteUri - The URI of the remote image.
 * @param {number} dimensions - The desired dimensions of the image. If not provided, the original dimensions will be returned.
 * @returns {[number, number]} - The scaled dimensions of the image.
 */
export function useAutoImage(
  remoteUri: string,
  dimensions?: [maxWidth?: number, maxHeight?: number],
): [width: number, height: number] {
  console.log('🚀 ~ remoteUri useAutoImage:', remoteUri);
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([0, 0]);
  const remoteAspectRatio = remoteWidth / remoteHeight;
  const [maxWidth, maxHeight] = dimensions ?? [];

  useLayoutEffect(() => {
    if (!remoteUri) return;

    Image.getSize(remoteUri, (w, h) => setRemoteImageDimensions([w, h]));
  }, [remoteUri]);

  if (Number.isNaN(remoteAspectRatio)) return [0, 0];

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(maxWidth / remoteWidth, maxHeight / remoteHeight);
    return [remoteWidth * aspectRatio, remoteHeight * aspectRatio];
  } else if (maxWidth) {
    return [maxWidth, maxWidth / remoteAspectRatio];
  } else if (maxHeight) {
    return [maxHeight * remoteAspectRatio, maxHeight];
  } else {
    return [remoteWidth, remoteHeight];
  }
}

/**
 * An Image component that automatically sizes a remote or data-uri image.
 * @see [Documentation and Examples]{@link https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/components/AutoImage.md}
 *
 */
export default function AppImage(props: AppImageType) {
  /*
   ** Destucturing props
   */
  const {maxWidth, maxHeight, ...ImageProps} = props;

  const source = props.source as ImageURISource;
  console.log('🚀 ~ AppImage ~ source:', source);
  /*
   ** Calcaulating image width and height
   */
  const [width, height] = useAutoImage((source?.uri as string) ?? (source as string), [maxWidth, maxHeight]);
  console.log('🚀 ~ AppImage ~ height:', height);
  console.log('🚀 ~ AppImage ~ width:', width);

  return <Image {...ImageProps} style={[{width, height}, props.style]} />;
}
