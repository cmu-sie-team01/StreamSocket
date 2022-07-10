// https://www.npmjs.com/package/srt-parser-2

import React from 'react';
import SrtParser2 from 'srt-parser-2';
import TestSub from './test.srt';
// input format: 00:00:13.860 --> 00:00:16.280
// function TimeToSeconds(timeIn) {
//   const a = timeIn.split('-->'); // split it at the colons
//   // minutes are worth 60 seconds. Hours are worth 60 minutes.
//   const start = a[0].split(':');
//   const end = a[1].split(':');
//   return (end[0] * 60 * 60 + end[1] * 60 + end[2])
//       - (start[0] * 60 * 60 + start[1] * 60 + start[2]);
// }

//
// // eslint-disable-next-line react/prop-types
// export default function Test() {
//   // eslint-disable-next-line no-unused-vars
//   const a = TimeToSeconds('00:00:13.860 --> 00:00:16.280');
//   // console.log(a, TestSub);
//   // const [displaySub, setDisplaySub] = useState('');
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 5000);
//   }, []);
//
//   // some codes
//   GetSubs(TestSub);
//   // for (let i = 0; i < SubByIndex.length; i += 1) {
//   //   let combineSub = '';
//   //   for (let j = 2; j < SubByIndex[i].length; j += 1) {
//   //     combineSub += SubByIndex[i][j];
//   //   }
//   //   if (!loading) {
//   //     return <div>loading...</div>;
//   //   }
//   //   setLoading(true);
//   //   // console.log(combineSub);
//   //   setDisplaySub(combineSub);
//   // }
//   // eslint-disable-next-line no-unused-vars
//   const ListItmes = SubByIndex.map((Subs) => {
//     if (!loading) {
//       return <div>loading...</div>;
//     }
//     return <li>{Subs}</li>;
//   });
//
//   return (
//     <div>
//       <Timer Sub={SubByIndex[0]} />
//     </div>
//
//   );
// }
// eslint-disable-next-line no-unused-vars
let allText = '';
function readTextFile(file) {
  const rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        allText = rawFile.responseText;
        console.log(allText);
      }
    }
  };
  rawFile.send(null);
}
export default function Test() {
  console.log(TestSub);
  const parser = new SrtParser2();
  readTextFile(TestSub);
  const result = parser.fromSrt(allText);
  console.log(result);

  // const found = result.find((element) => element > 10);

  return (<div />);
}
