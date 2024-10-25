/*
 ** List of  svg that are required throughout the app
 */
export const ICONS = {
  speedIcon: require('./speedIcon').default,
  fullScreenIcon: require('./fullScreenIcon').default,
  playIcon: require('./playIcon').default,
  lockIcon: require('./lockIcon').default,
  pause: require('./pause').default,
  minimize: require('./minimize').default,
  setting: require('./setting').default,
};

export type IconTypes = keyof typeof ICONS;
