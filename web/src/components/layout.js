import React from 'react'
import Nav from './nav'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, nodes}) => (
  <div className={styles.root}>
    <Nav recent_song={nodes[0]} />
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  </div>
)

export default Layout
