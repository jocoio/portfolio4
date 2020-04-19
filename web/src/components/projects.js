import React, {useState, useEffect, useRef} from 'react'
import ProjectPreview from './project-preview'
import ScrollMagic from 'scrollmagic'
import {TimelineMax} from 'gsap'
import styles from './projects.module.css'

function ProjectPreviewGrid (props) {
  let grid = useRef([])

  const [photoCoordinates, setPhotoCoordinates] = useState([0, 0])

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

  const handleMouseMove = (e) => {
    e.preventDefault()
    var x = e.clientX + 20
    var y = e.clientY
    setPhotoCoordinates([x, y])
  }

  return (
    <div className={styles.root} onMouseMove={handleMouseMove} onMouseOver={handleMouseMove} id='projects'>
      <h6 id='imade' className={styles.headline}>All work</h6>
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map((node, i) => (
            <li key={node.id} ref={element => { grid.current[i] = element }}>
              <ProjectPreview {...node} coords={photoCoordinates} />
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
