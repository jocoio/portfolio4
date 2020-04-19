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
    var skillsTl = new TimelineMax()

    console.log(document.getElementsByClassName(styles.category)[0].offsetWidth)

    var oneWidth = document.getElementsByClassName(styles.category)[0].offsetWidth
    var twoWidth = document.getElementsByClassName(styles.category)[1].offsetWidth
    var threeWidth = document.getElementsByClassName(styles.category)[2].offsetWidth

    skillsTl
      .to(grid.current[0], 0.4, {opacity: 1}, 0) // Fade skills in
      .to(grid.current[1], 0.25, {width: oneWidth}, 0.5) // Red sweep
      .to(grid.current[2], 0.25, {width: twoWidth}, 0.6) // Blue sweep
      .to(grid.current[3], 0.25, {width: threeWidth}, 0.7) // Green sweep

    // // Animation
    // skillsTl.staggerFrom(
    //   grid.current,
    //   0.75,
    //   {opacity: 0},
    //   0.15)

    // Scene
    var skillScene = new ScrollMagic.Scene({
      triggerElement: '#skillstitle',
      offset: 0
    })

    skillScene
      .setTween(skillsTl)
      .addTo(scrollMagicController2)

  }, [])

  return (
    <div>

      <h6 id='skillstitle'>Skills</h6>
      <div className={styles.container} ref={element => { grid.current[0] = element }}>
        {props.nodes &&
          props.nodes.map((node, i) => (
            <div className={styles.catcol} key={i}>
              <h4 className={styles.category}>{node.title}</h4>
              <div className={node.category.title} ref={element => { grid.current[i + 1] = element }} />
              {node.list.map((skill, i) => (
                <p key={i}>{skill}</p>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Skills
