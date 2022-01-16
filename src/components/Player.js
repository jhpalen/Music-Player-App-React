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
                        "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5.055 13.668l-.293.195c-.407-.511-.652-1.158-.652-1.863 0-1.656 1.344-3 3-3h4v-2l3.5 2.5-3.5 2.5v-2h-4c-1.103 0-2 .896-2 2 0 .5.19.951.494 1.302l-.549.366zm8.055 1.332h-4v2l-3.5-2.5 3.5-2.5v2h4c1.103 0 2-.896 2-2 0-.5-.19-.951-.494-1.302l.549-.366.293-.195c.408.511.652 1.158.652 1.863 0 1.656-1.344 3-3 3z"
                        :
                        "M7 12c0 .5.19.951.494 1.302l-.549.366-.293.195c-.407-.511-.652-1.158-.652-1.863 0-1.656 1.344-3 3-3h4v-2l3.5 2.5-3.5 2.5v-2h-4c-1.103 0-2 .896-2 2zm10.348-1.863l-.293.195-.549.366c.304.351.494.802.494 1.302 0 1.104-.897 2-2 2h-4v-2l-3.5 2.5 3.5 2.5v-2h4c1.656 0 3-1.344 3-3 0-.705-.244-1.352-.652-1.863zm-5.348-8.137c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"
                    }
                    fill={darkMode ? "white" : ""}
                /></svg>

            </div>
        </div>
    ); 
}

export default Player; 