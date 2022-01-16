import React, {useState,useRef} from 'react';
//import data
import data from './data';

//import styles
import './styles/app.scss';

//adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  //Ref
  const audioRef = useRef(null);

  //Event Handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime:current, duration});
  }

  //State
  const [darkMode, setDarkMode] = useState(false);
  const [onRepeat,setOnRepeat] = useState(false);

  const [songs, setSongs] = useState(data());
  const [currentSongId, setCurrentSongId] = useState(songs[0].id);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus,setLibraryStatus] = useState(false);

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(!onRepeat){ currentIndex = currentIndex + 1; }

    await setCurrentSong(songs[(currentIndex)%songs.length]);
    await setCurrentSongId(songs[(currentIndex)%songs.length].id);
    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''} ${darkMode ? 'dark-mode' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player 
      audioRef={audioRef}
      setIsPlaying={setIsPlaying}
      isPlaying={isPlaying}
      currentSong={currentSong } 
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      setCurrentSongId={setCurrentSongId}

      onRepeat={onRepeat}
      setOnRepeat={setOnRepeat}

      darkMode={darkMode}
      />
      <Library currentSongId={currentSongId} setCurrentSongId={setCurrentSongId} libraryStatus={libraryStatus} setSongs={setSongs} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} />
      <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} onLoadedData={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
      <footer>Brought to you by <strong>Haze Palen.</strong></footer>
    </div>
  );
}

export default App;
