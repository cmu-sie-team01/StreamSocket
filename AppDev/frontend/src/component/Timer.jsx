import React from 'react';
import TestSub from './test.vtt';
// function TimeToSecs(t) {
//   const temp = t.split(':').map((s) => parseFloat(s));
//   const re = temp[0] * 60 * 60 + temp[1] * 60 + temp[0];
//   // console.log(re);
//   return re;
// }
// // eslint-disable-next-line react/prop-types
// const SubByIndex = [];
// function GetSubs(file) {
//   const rawFile = new XMLHttpRequest();
//   rawFile.open('GET', file, false);
//   rawFile.onreadystatechange = function () {
//     if (rawFile.readyState === 4) {
//       if (rawFile.status === 200 || rawFile.status === 0) {
//         let allText = rawFile.responseText;
//         allText = allText.slice(8);
//         const allTextArr = allText.split(/\n/);
//         // console.log(allTextArr, typeof allTextArr);
//         for (let i = 0; i < allTextArr.length; i += 1) {
//           const Sub = [];
//           while (allTextArr[i] !== '') {
//             Sub.push(allTextArr[i]);
//             i += 1;
//           }
//           const temp = Sub[1].split(' --> ');
//           const start = TimeToSecs(temp[0]);
//           const end = TimeToSecs(temp[1]);
//           console.log(start, end);
//           SubByIndex.push(Sub);
//         }
//         // console.log(SubByIndex);
//       }
//     }
//   };
//   rawFile.send(null);
// }
// export default function () {
//   const [counter, setCounter] = React.useState(5);
//   const [Sub, setSub] = React.useState('');
//   GetSubs(TestSub);
//   // console.log(SubByIndex);
//   React.useEffect(() => {
//     // eslint-disable-next-line no-unused-expressions
//     counter > 0 && setTimeout(
//       () => { setCounter(counter - 1); setSub(SubByIndex[counter]); },
//       1000,
//     );
//   }, [counter]);
//   return (
//     <div>
//       {counter}
//       {Sub}
//     </div>
//   );
// }
const fs = require('fs');
const parser = require('subtitles-parser-vtt');

export default function () {
  const srt = fs.readFileSync(TestSub, 'utf8');
  const data = parser.fromVtt(srt);
  console.log(data);
  return (<div />);
}
