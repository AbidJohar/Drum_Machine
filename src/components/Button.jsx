import React, { useState } from 'react';

const Button = ({
    className='',
    value,
    sound,
    id,
    onClick, // Add this prop
    power,
    volume
}) => {
  const [isplay, setIsPlay] = useState(false);

  const playSound = () => {

    if(!power) return;
    setIsPlay(true);
    const audio = new Audio(sound);
    audio.play();
    
    audio.onended = () => setIsPlay(false);
    audio.volume = volume;

      onClick(id); // Pass the value id with the callback
       console.log("key", id);
  }

  return (
    <button
      onClick={playSound}
      className={`px-8 py-6 focus:outline-none rounded-lg  font-bold bg-gradient-to-br from-white/80 to-[#8c8c8c]  shadow-black ${isplay ?' bg-yellow-500 shadow-none' : 'shadow-md shadow-black'} ${className}`}>
      <audio src={sound}></audio>
      {value}
    </button>
  );
}

export default Button;
