import React, {useEffect, useRef} from 'react'
import styles from './experience.module.css'
import ScrollMagic from 'scrollmagic'
import {TimelineMax} from 'gsap'

function Experience (props) {
  let grid = useRef([])

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    // Controller
    var scrollMagicController2 = new ScrollMagic.Controller()

    // Timeline
    var experienceTl = new TimelineMax()

    // Animation
    experienceTl.staggerFrom(
      grid.current,
      0.75,
      {opacity: 0},
      0.15)

    // Scene
    var expScene = new ScrollMagic.Scene({
      triggerElement: '#iworkedas',
      offset: 0
    })

    expScene
      .setTween(experienceTl)
      .addTo(scrollMagicController2)

  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h6 id='iworkedas'>Experience</h6>
        {props.nodes &&
          props.nodes.map((node, i) => (
            <div className={styles.chunk} key={i} ref={element => { grid.current[i] = element }}>
              <h2>{node.title}</h2>
              <a href={node.link} target='_blank'><h3>{node.company}</h3></a>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Experience
