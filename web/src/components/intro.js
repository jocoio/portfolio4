import React from 'react'
import styles from './intro.module.css'

const Intro = ({intro_title, intro_subtitle}) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <h1>{intro_title}</h1>
      <h3>{intro_subtitle}</h3>
    </div>
  </div>
)

export default Intro
