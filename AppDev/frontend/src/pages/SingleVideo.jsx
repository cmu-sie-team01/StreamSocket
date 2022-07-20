import * as React from 'react';
import VideoBlock from '../component/VideoBlock';

export default function SingleVideo(props) {
  const {
    // eslint-disable-next-line react/prop-types
    selectedVideo,
  } = props;
  return (
    <VideoBlock
        /* eslint-disable-next-line react/prop-types */
      srcIn={selectedVideo.video}
        /* eslint-disable-next-line react/prop-types */
      srtIn={selectedVideo.caption}
        /* eslint-disable-next-line react/prop-types */
      likesIn={selectedVideo.likesCount}
        /* eslint-disable-next-line react/prop-types */
      idIn={selectedVideo.id}
    />
  );
}
