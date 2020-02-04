import {Link} from 'gatsby'
import React from 'react'
import styles from './nav.module.css'

const Nav = (props) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.branding}>
          <Link to='/'>JOCO</Link>
        </h2>
      </div>
      <div className={styles.lasts}>
        <div className={styles.last}>
          <h6>Last Listen</h6>
          <p>{props.recent_song.track.name} by {props.recent_song.track.artists[0].name}</p>
          {console.log('Recent song')}
          {console.log(props.recent_song)}
        </div>
        <div className={styles.last}>
          <h6>Last Read</h6>
          <p>Find Me by André Aciman</p>
        </div>
        <div className={styles.last}>
          <h6>Last Watch</h6>
          <p>Parasite, 2019 </p>
        </div>
        <div className={styles.last}>
          <h6>Last Shot</h6>
          <img src='https://picsum.photos/50/50' />
        </div>
      </div>
    </div>
  </div>
)

export default Nav
