import { useEffect, useState } from 'react';
import Button from './components/Button';
import './App.css';

function App() {
  const firstGroupSounds = [
    { keyCode: 81, keyTrigger: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
    { keyCode: 87, keyTrigger: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
    { keyCode: 69, keyTrigger: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
    { keyCode: 65, keyTrigger: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
    { keyCode: 83, keyTrigger: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
    { keyCode: 68, keyTrigger: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
    { keyCode: 90, keyTrigger: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
    { keyCode: 88, keyTrigger: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
    { keyCode: 67, keyTrigger: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
  ];

  const secondGroupSounds = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}]

  const [selectedId, setSelectedId] = useState('');
  const [power, setPower] = useState(true);
  const [changeSound, setchangeSound] = useState(true);
  const [volume, setVolume] = useState('0.3');

  const handleButtonClick = (id) => {
    setSelectedId(id);
  };

  const handlePower = () => {
    setPower(prevpower => !prevpower);

  }
  const handleChangeSound= ()=>{
    setchangeSound(!changeSound);
  }

  const handleVolume = (e)=>{
         setVolume(e.target.value);
  }

  const playSoundByKey = (keyCode) => {
    const sounds = changeSound ? firstGroupSounds : secondGroupSounds;
    const sound = sounds.find(sound => sound.keyCode === keyCode);
    if (sound) {
      const audio = new Audio(sound.url);
      audio.volume = volume;
      audio.play();
      setSelectedId(sound.id);
    }
  };

  useEffect(()=>{
   const handleKeyDown = (event)=>{

    if(power){
      playSoundByKey(event.keyCode)
    }
   }
    window.addEventListener('keydown', handleKeyDown)

    return ()=>{
      window.removeEventListener('keydown', handleKeyDown)
    }

  },[power,volume,changeSound])

  return (
    <div className='h-screen w-full  bg-[#8c8c8c] flex items-center justify-center'>
      <div className='border-[0.3rem] bg-gray-400  flex-col md:flex-row gap-14 flex items-center justify-between border-yellow-500 p-8'>
        <div className='grid grid-cols-3 gap-[0.75rem]'>
          { changeSound? firstGroupSounds.map((sound) => (
              <Button
                power={power}
                id={sound.id}
                key={sound.id}
                sound={sound.url}
                value={sound.keyTrigger}
                volume = {volume}
                onClick={handleButtonClick} // Pass the handler function
              />
            )) : secondGroupSounds.map((sound) => (
              <Button
                power={power}
                volume = {volume}
                id={sound.id}
                key={sound.id}
                sound={sound.url}
                value={sound.keyTrigger}
                onClick={handleButtonClick} // Pass the handler function
              />
         )) } 
          
        </div>
        <div className='control-container flex-col flex items-center justify-start'>
          <button
            className={` px-4 py-2 mb-4 focus:outline-none hover:shadow-none font-semibold bg-gradient-to-br from-white/30 to-[#8c8c8c]  shadow-md shadow-black/25 rounded-md p-2 ${power ? 'hover:bg-green-500' : 'hover:bg-red-500'}`}
            onClick={handlePower}>Power {power ? "on" : "off"}</button>

          <div className='bg-[#8c8c8c] w-[10rem] h-[3rem] mt-3 flex items-center justify-center'>
            {selectedId}
          </div>

          <div className="volume-slider focus:outline-none mt-5  flex items-center justify-center gap-2">
            <input max="1" min="0" step="0.01" type="range"
             value={volume}
             onChange={handleVolume}
            />
            
             { <p className='font-semibold w-[1rem]'>{Math.floor(volume *100)}%</p>}
             
          </div>

          <button
            className={` px-3 focus:outline-none py-2 mt-4 font-bold shadow-md bg-gradient-to-br from-white/30 to-[#8c8c8c]  shadow-black/25 rounded-md p-2 hover:shadow-none`}
            onClick={handleChangeSound}>{changeSound ? "Headter Kit" : "Smooth Piano kit"}</button>
        <p className='mt-5 opacity-40'><span className='text-yellow-300'>Design by :</span> Abid</p>
        </div>
      </div>
    </div>
  );
}

export default App;
