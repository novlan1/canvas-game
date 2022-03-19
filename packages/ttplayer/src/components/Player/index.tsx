import React, {Ref} from "react";
import styles from "./styles.module.scss";
import {PlayListItem} from "../../constants";

interface Props {
  onPlay: () => void;
  onPause: () => void;
  playItem: PlayListItem;
}

const CANVAS_WIDTH_HEIGHT_MAP: any = {
  500: 300,
  300: 175
}

const Player = React.forwardRef((props: Props, audioRef: Ref<HTMLAudioElement>) => {
  const { playItem, onPlay, onPause } = props;
  const clientWidth = document.body.clientWidth;
  // console.log('clientWidth', clientWidth)
  let canvasWidth = 500;
  if (clientWidth < 400) {
    canvasWidth = 300
  }
  const canvasHeight = CANVAS_WIDTH_HEIGHT_MAP[canvasWidth]

  return (
    <div className={styles.player}>
      <div className={styles.canvas}>
        <canvas id="canvas" width={canvasWidth} height={canvasHeight}/>
      </div>
      <div className={styles.controls}>
        <audio ref={audioRef} src={playItem.url} onPlay={onPlay} onPause={onPause} controls loop/>
      </div>
    </div>
  )
})

export default Player;
