import React, { useState } from 'react';
import VideoBlock from './VideoBlock';
import TestSub from './test.vtt';

// input format: 00:00:13.860 --> 00:00:16.280
function TimeToSeconds(timeIn) {
  const a = timeIn.split('-->'); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  const start = a[0].split(':');
  const end = a[1].split(':');
  return (end[0] * 60 * 60 + end[1] * 60 + end[2])
      - (start[0] * 60 * 60 + start[1] * 60 + start[2]);
}

// eslint-disable-next-line react/prop-types
export default function Test() {
  const a = TimeToSeconds('00:00:13.860 --> 00:00:16.280');
  console.log(a);
  const [displaySub, setDisplaySub] = useState('');
  const SubArr = [];
  // const SubLines = [];
  fetch(TestSub)
    .then((r) => r.text())
    .then((text) => {
      const t = text.slice(8);
      // console.log('text decoded:', text, typeof text);
      SubArr.push = t.split(/(\n)/);
      let index = 0;
      for (let i = 0; i < SubArr.push.length; i += 1) {
        const curr = SubArr.push[i];
        if (Number(curr) === index + 1) {
          setDisplaySub(curr);
          index += 1;
        }
        if (curr !== '\n') {
          setDisplaySub(curr);
          console.log(curr);
        }
      }
    });
  // console.log(SubLines);
  return (
    <div>
      <VideoBlock
        srcIn="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4"
      />
      <div>
        {displaySub}
      </div>
    </div>

  );
}
