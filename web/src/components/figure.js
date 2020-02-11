import React from 'react'
import styles from './figure.module.css'

export default ({node}) => {
  if (!node.asset) {
    return null
  }

  return (
    <figure className={styles.root}>
      {node.caption && <h3>{node.caption}</h3>}
    </figure>
  )
}
