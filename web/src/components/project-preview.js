// import {Link} from 'gatsby'
import React, {useState} from 'react'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import styles from './project-preview.module.css'

const ProjectPreview = (props) => {

  const [showInfo, setshowInfo] = useState(false)

  const tooltipStyle = {
    opacity: showInfo ? 0.9 : 0,
    visibility: showInfo ? 'visible' : 'hidden',
    position: 'fixed',
    backgroundColor: '#222222',
    width: '200px',
    height: '200px',
    transition: 'opacity 150ms ease-in-out',
    left: props.coords[0] + 'px',
    top: props.coords[1] + 'px',
    pointerEvents: 'none'
  }

  const arrowStyle = {
    opacity: showInfo ? 1 : 0,
    visibility: showInfo ? 'visible' : 'hidden',
    transition: 'opacity 150ms ease-in-out'
  }

  const handleMouseEnter = (e) => {
    setshowInfo(true)
  }

  const handleMouseLeave = (e) => {
    setshowInfo(false)
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
        <a
          className={styles.root}
          // to={`/project/${props.slug}`}
          href={props.link}
          target='_blank'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2>{props.title} <span className={styles.arrow} style={arrowStyle}>↗</span></h2>
          <h3>{props.description}</h3>
          {props.skills &&
            props.skills.map((tag, i) => (
              <h6 className={tag.category.title} key={i}>{tag.name}</h6>
            ))}
        </a>
      )}
      {!props.link && (
        <div
          className={styles.root}
          // to={`/project/${props.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2>{props.title}</h2>
          <h3>{props.description}</h3>
          {props.skills &&
              props.skills.map((tag, i) => (
                <h6 className={tag.category.title} key={i}>{tag.name}</h6>
              ))}
        </div>
      )}
    </div>
  )
}

export default ProjectPreview
