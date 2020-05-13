import React from 'react'
import Nav from './nav'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, spoty, instaNodes, tripNodes, movieNodes}) => (
  <div className={styles.root}>
    {spoty && instaNodes && tripNodes && movieNodes &&
      <Nav last_song={spoty} last_pic={instaNodes[0]} last_trip={tripNodes[0]} last_movie={movieNodes[0]} />
    }
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  </div>
)

export default Layout
