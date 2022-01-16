import React from 'react';

const LibrarySong = ({songs,song,setCurrentSong,id,audioRef,isPlaying,setSongs,isCurrent,setCurrentSongId}) => {
    //Event Handler
    const songSelectHandler = async () => {
        //Update Current Song
        await setCurrentSong(song);
        await setCurrentSongId(song.id);
        
        //check if the song is playing
        if(isPlaying) audioRef.current.play();
    }

    return(
        <div onClick={songSelectHandler} className={`library-song ${isCurrent ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3> 
                <h4>{song.artist}</h4> 
            </div>            
        </div>
    ); 
}

export default LibrarySong; 