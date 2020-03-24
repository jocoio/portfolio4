import React from 'react'
import ReactPlayer from 'react-player'
import styles from './feature.module.css'

const Feature = () => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <h6>Featured</h6>
      <ReactPlayer
        className={styles.player}
        id='yt'
        url='https://youtu.be/x537ydNKKtE?rel=0'
        controls
        width='100%'
        height='intial'
      />
    </div>
  </div>
)

export default Feature
