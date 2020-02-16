// import {Link} from 'gatsby'
import React, {useState} from 'react'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import styles from './project-preview.module.css'

const ProjectPreview = (props) => {

  const [showPreview, setShowPreview] = useState(false)

  const tooltipStyle = {
    opacity: showPreview ? 0.9 : 0,
    visibility: showPreview ? 'visible' : 'hidden',
    position: 'fixed',
    backgroundColor: '#222222',
    width: '200px',
    height: '200px',
    transition: 'opacity 150ms ease-in-out',
    left: props.coords[0] + 'px',
    top: props.coords[1] + 'px',
    pointerEvents: 'none'
  }

  const handleMouseEnter = (e) => {
    setShowPreview(true)
  }

  const handleMouseLeave = (e) => {
    setShowPreview(false)
  }

  return (
    <div>
      {props.mainImage && props.mainImage.asset && (
        <img
          src={imageUrlFor(buildImageObj(props.mainImage))
            .width(400)
            .height(400)
            .url()}
          alt={props.mainImage.alt}
          style={tooltipStyle}
          className={styles.tooltip}
        />
      )}
      {props.link && (
        <a href={props.link} target='_blank'>
          <h2
            className={styles.root}
            // to={`/project/${props.slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {props.excerpt}
          </h2>
        </a>
      )}
      {!props.link && (
        <h2
          className={styles.root}
          // to={`/project/${props.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {props.excerpt}
        </h2>
      )}
    </div>
  )
}

export default ProjectPreview
