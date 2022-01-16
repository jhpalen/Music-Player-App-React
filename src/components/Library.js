import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs,setCurrentSong,audioRef,isPlaying,setSongs,libraryStatus,currentSongId,setCurrentSongId}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-song-container">
                {songs.map((song) => (
                    <LibrarySong isCurrent={song.id === currentSongId} setCurrentSongId={setCurrentSongId} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} song={song} setCurrentSong={setCurrentSong} id={song.id} key={song.id} />
                ))}
            </div>
        </div>
    )
}

export default Library;