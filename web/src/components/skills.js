import React, {useEffect, useRef} from 'react'
import styles from './skills.module.css'
import ScrollMagic from 'scrollmagic'
import {TimelineMax} from 'gsap'

function Skills (props) {
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
      triggerElement: '#skillstitle',
      offset: 0
    })

    expScene
      .setTween(experienceTl)
      .addTo(scrollMagicController2)

  }, [])

  return (
    <div>

      <h6 id='skillstitle'>Skills</h6>
      <div className={styles.container}>
        {props.nodes &&
          props.nodes.map((node, i) => (
            <div className={styles.catcol}>
              <h4 className={styles.category}>{node.title}</h4>
              <div className={styles.line} ref={element => { grid.current[i] = element }} key={i} />
              {node.list.map((skill) => (
                <p>{skill}</p>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Skills
