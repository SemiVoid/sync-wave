import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { socket } from '../config/socket';

const VideoPlayer = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  let player = useRef(null);
  let time = useRef(null);

  useEffect(() => {
    socket.on('play', () => {
      setPlaying(true);
    });
    socket.on('pause', () => {
      setPlaying(false);
    });
    socket.on('videoTimeRefresh', (data) => {
      if (Math.abs(data - time.current) >= 1) {
        socket.emit('outOfSync');
      }
    });
    socket.on('resyncClient', (data) => {
        console.log('resync at', time, data);
        player.current.seekTo(data, 'seconds');
    });
    setInterval(() => {
      time.current = player.current.getCurrentTime();
      socket.emit('globalTimeChange', time.current);
    }, 1000);
    setInterval(() => {
      socket.emit('globalTimeRefresh');
    }, 1000);
  }, []);

  const globalPlay = (e) => {
    socket.emit('globalPlay');
  };

  const globalPause = (e) => {
    socket.emit('globalPause');
  };

  // const handleProgress = (e) => {
  //   time.current = player.current.getCurrentTime();
  //   socket.emit('globalTimeChange', time.current);
  // };

  return (
    <>
      <ReactPlayer
        ref={player}
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{ youtube: { playerVars: { modestbranding: 0 } } }}
        url={`https://www.youtube.com/watch?v=${video}`}
        playing={playing}
        controls
        width="100%"
        height="100%"
        onPlay={globalPlay}
        onPause={globalPause}
        // onProgress={handleProgress}
      />
    </>
  );
};

export default VideoPlayer;
