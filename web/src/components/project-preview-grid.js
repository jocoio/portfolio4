import React, {useEffect, useRef} from 'react'
import ProjectPreview from './project-preview'
import ScrollMagic from 'scrollmagic'
import {TimelineMax} from 'gsap'
import styles from './project-preview-grid.module.css'

function ProjectPreviewGrid (props) {
  let grid = useRef([])

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Controller
    var scrollMagicController = new ScrollMagic.Controller()

    // Timeline
    var projectsTl = new TimelineMax()

    // Animation
    projectsTl.staggerFrom(
      grid.current,
      0.75,
      {opacity: 0},
      0.15)

    // Screne
    var projScene = new ScrollMagic.Scene({
      triggerElement: '#imade',
      offset: 0
    })

    projScene
      .setTween(projectsTl)
      .addTo(scrollMagicController)
  }, [])

  return (
    <div className={styles.root}>
      <h6 id='imade' className={styles.headline}>I made</h6>
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map((node, i) => (
            <li key={node.id} ref={element => { grid.current[i] = element }}>
              <ProjectPreview {...node} />
            </li>
          ))}
      </ul>
    </div>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: []
}

export default ProjectPreviewGrid
