import React from 'react'
import Nav from './nav'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, spotyNodes, instaNodes, bookNodes, movieNodes}) => (
  <div className={styles.root}>
    {spotyNodes && instaNodes && bookNodes && movieNodes &&
      <Nav last_song={spotyNodes[0]} last_pic={instaNodes[0]} last_book={bookNodes[0]} last_movie={movieNodes[0]} />
    }
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  </div>
)

export default Layout
