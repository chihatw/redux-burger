import { useState, useEffect } from 'react';

import BackgroundMusic from './../audio/bg.mp3';
import Incorrect from './../audio/wrong.mp3';
import Serve from './../audio/bell.mp3';
import Countdown from './../audio/countdown.mp3';
import Pop from './../audio/pop.mp3';

const bg = new Audio(BackgroundMusic);
const incorrect = new Audio(Incorrect);
const serve = new Audio(Serve);
const countdown = new Audio(Countdown);
const pop = new Audio(Pop);

const gameAudio: { [key: string]: HTMLAudioElement } = {
  bg,
  incorrect,
  serve,
  countdown,
  pop,
};

Object.keys(gameAudio).forEach((key) => {
  gameAudio[key].preload = 'auto';
});

// opt は BGM に {loop: true} を設定するため
const useGameAudio = (name: string, opt?: { [key: string]: boolean }) => {
  const [playing, toggle] = useState(false);
  // audio に基本の Audioを設定
  const [audio] = useState(gameAudio[name]);

  if (opt) {
    Object.keys(opt).forEach((i) => {
      (audio as any)[i] = opt[i];
    });
  }

  useEffect(() => {
    if (playing) audio.play();
    else audio.pause();
  }, [playing, audio]);

  // otherの設定がなければ、既存の audio を再生
  // 既存 audio以外の場合、otherで設定（「誤答音」等）
  const playOnEveryInteraction = (other?: string) => {
    const clonedAudio = (
      other ? gameAudio[other] : audio
    ).cloneNode() as HTMLAudioElement;
    clonedAudio.play();
  };

  const resetCurrentTime = () => {
    audio.currentTime = 0;
  };

  const stopAudio = () => {
    toggle(false);
  };

  const startAudio = () => {
    toggle(true);
  };

  return {
    toggle,
    playing,
    stopAudio,
    startAudio,
    resetCurrentTime,
    playOnEveryInteraction,
  };
};

export default useGameAudio;
