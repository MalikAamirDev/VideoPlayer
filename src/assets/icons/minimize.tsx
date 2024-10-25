import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const minimizeIcon = () => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <Path
      fill="white"
      d="M20.857 9.75a.75.75 0 1 0 0-1.5h-4.046l5.72-5.72a.75.75 0 0 0-1.061-1.06l-5.72 5.72V3.142a.75.75 0 0 0-1.5 0V9c0 .414.336.75.75.75h5.857ZM3.143 14.25a.75.75 0 0 0 0 1.5h4.046l-5.72 5.72a.75.75 0 1 0 1.061 1.06l5.72-5.72v4.047a.75.75 0 1 0 1.5 0V15a.75.75 0 0 0-.75-.75H3.143Z"
    />
  </Svg>
);
export default minimizeIcon;
