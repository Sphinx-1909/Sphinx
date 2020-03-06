import React from 'react';
import { ReactPlayer } from 'react-player'
// import { Player } from 'video-react'

// const LinkTest = () => {
//   console.log('in linktest component')
//   return (
//     // <div>
//     <ReactPlayer
//       url="https://www.youtube.com/watch?v=dXjKh66BR2U"
//       playing />
//     // </div>
//   );
// };

class LinkTest extends React.Component {
  render() {
    console.log('in linktest component')
    return <ReactPlayer url="https://www.youtube.com/watch?v=dXjKh66BR2U" playing />
    // return <Player
    //   playsInline
    //   // poster="/assets/poster.png"
    //   src="ttps://www.youtube.com/watch?v=dXjKh66BR2U"
    // />
  }
};

export default LinkTest;