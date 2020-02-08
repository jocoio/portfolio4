import {Link} from 'gatsby'
import React from 'react'
import styles from './nav.module.css'

const Nav = (props) => {
  function truncate (input) {
    if (input.length > 40) {
      return input.substring(0, 40) + '...'
    } else {
      return input
    }
  };

  return (
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
            <p>{truncate(props.last_song.track.name + ' by ' + props.last_song.track.artists[0].name)}</p>
          </div>
          <div className={styles.last}>
            <h6>Last Read</h6>
            <p>{truncate(props.last_book.title + ' by ' + props.last_book.author)}</p>
          </div>
          <div className={styles.last}>
            <h6>Last Watch</h6>
            <p>{truncate(props.last_movie.title + ', ' + props.last_movie.year)}</p>
          </div>
          <div className={styles.last}>
            <h6>Last Shot</h6>
            <a href='https://instagram.com/joco.io/'>
              <img src={props.last_pic.thumbnails[0].src} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
