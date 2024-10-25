import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PlayIcon = () => (
  <Svg width={64} height={64} fill="none" viewBox="0 0 24 24">
    <Path
      opacity={1}
      fill="white"
      fillRule="evenodd"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-1.306-6.154 4.72-2.787c.781-.462.781-1.656 0-2.118l-4.72-2.787C9.934 7.706 9 8.29 9 9.214v5.573c0 .923.934 1.507 1.694 1.059Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default PlayIcon;
