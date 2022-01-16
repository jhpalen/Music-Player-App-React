import React, {useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong, setCurrentSongId, onRepeat, setOnRepeat, darkMode, shuffle, setShuffle}) => {
    //Event Handlers
    const isShuffled = () => {
        if(shuffle){
            setShuffle(!shuffle);
            console.log(shuffle);
        } else {
            setShuffle(!shuffle);
            console.log(shuffle);
        }
    }

    const isOnRepeat = () => {
        if(onRepeat){
            setOnRepeat(!onRepeat);
            console.log(onRepeat);
        } else {
            setOnRepeat(!onRepeat);
            console.log(onRepeat);
        }
    }

    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value});
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        let currentIndex_ = songs.findIndex((song) => song.id === currentSong.id);
    
        if(shuffle){
            currentIndex = Math.floor(Math.random() * Math.floor(songs.length - 1));
            if(currentIndex === currentIndex_){
                currentIndex = currentIndex + 1;
            }
        }
        
        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIndex+1)%songs.length]);
            await setCurrentSongId(songs[(currentIndex+1)%songs.length].id);
        }
        if(direction === 'skip-back'){
            await setCurrentSong(songs[currentIndex > 0 ? (currentIndex-1)%songs.length : (songs.length-1)]);
            await setCurrentSongId(songs[currentIndex > 0 ? (currentIndex-1)%songs.length : (songs.length-1)].id);
        }
        if(isPlaying) audioRef.current.play();
    }

    //Input Style
    const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;
    const trackAnimation = {transform:`translateX(${animationPercentage}%)`};

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background:`linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                    <div className="animate-track" style={trackAnimation}></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <svg onClick={() => isShuffled()} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d={!shuffle ? 
                    "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 9.5h-1v-1h1c1.745 0 2.74.61 3.411 1.428-.205.326-.377.656-.527.969-.544-.822-1.318-1.397-2.884-1.397zm8 5c-1.542 0-2.302-.574-2.84-1.393-.15.312-.323.642-.529.968.663.816 1.644 1.425 3.369 1.425v1.5l3-2-3-2v1.5zm0-5v1.5l3-2-3-2v1.5c-2.917 0-3.718 1.741-4.425 3.277-.672 1.461-1.252 2.723-3.575 2.723h-1v1h1c2.964 0 3.771-1.756 4.484-3.305.665-1.446 1.24-2.695 3.516-2.695z"
                    :
                    "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-6 8.5h1c1.745 0 2.74.61 3.411 1.428-.205.326-.377.656-.527.969-.544-.822-1.318-1.397-2.884-1.397h-1v-1zm9 8.5v-1.5c-1.725 0-2.706-.609-3.369-1.425.206-.326.379-.655.529-.968.538.819 1.298 1.393 2.84 1.393v-1.5l3 2-3 2zm0-6v-1.5c-2.276 0-2.851 1.249-3.516 2.695-.713 1.549-1.52 3.305-4.484 3.305h-1v-1h1c2.323 0 2.903-1.262 3.575-2.723.707-1.536 1.508-3.277 4.425-3.277v-1.5l3 2-3 2z"
                    }   
                    fill={darkMode ? "white" : ""}
                    />
                </svg>

                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faBackward} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faForward} />

                <svg onClick={() => isOnRepeat()} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path 
                    d={onRepeat?
                        "M6.09 18h-.09c-3.313 0-6-2.687-6-6s2.687-6 6-6h2v-3l6 4-6 4v-3h-2c-2.206 0-4 1.794-4 4s1.794 4 4 4h.09c-.055.326-.09.658-.09 1s.035.674.09 1zm11.91-12h-2v2h2c2.206 0 4 1.794 4 4s-1.794 4-4 4h-.09c.055.326.09.658.09 1s-.035.674-.09 1h.09c3.313 0 6-2.687 6-6s-2.687-6-6-6zm-6 7c-2.209 0-4 1.791-4 3.999 0 2.209 1.791 4.001 4 4.001s4-1.792 4-4.001c0-2.208-1.791-3.999-4-3.999zm1.016 6.188h-1.055v-3.109c-.022 0-.884.413-.904.423l-.179-.936 1.241-.574h.896v4.196z"
                        :
                        "M18.5 8h-2.5v2h2.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5h-13c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5h2.5v3l6-4-6-4v3h-2.5c-3.037 0-5.5 2.463-5.5 5.5s2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5s-2.463-5.5-5.5-5.5z"
                    }
                    fill={darkMode ? "white" : ""}
                /></svg>

            </div>
        </div>
    ); 
}

export default Player; 