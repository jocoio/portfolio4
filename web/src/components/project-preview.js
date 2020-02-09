import {Link} from 'gatsby'
import React, {useState} from 'react'
import BlockText from './block-text'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import styles from './project-preview.module.css'

const ProjectPreview = (props) => {

  const [showPreview, setShowPreview] = useState(false)
  const [photoCoordinates, setPhotoCoordinates] = useState([0, 0])

  const tooltipStyle = {
    opacity: showPreview ? 0.9 : 0,
    visibility: showPreview ? 'visible' : 'hidden',
    position: 'absolute',
    backgroundColor: '#222222',
    width: '200px',
    height: '200px',
    transition: 'opacity 150ms ease-in-out',
    marginLeft: photoCoordinates[0] + 'px',
    marginTop: photoCoordinates[1] + 'px',
    pointerEvents: 'none'
  }

  const handleMouseEnter = (e) => {
    setShowPreview(true)
  }

  const handleMouseLeave = (e) => {
    setShowPreview(false)
  }

  const handleMouseMove = (e) => {
    e.preventDefault()
    var rect = e.target.getBoundingClientRect()
    var x = e.clientX - rect.left + 20
    var y = e.clientY - rect.top
    setPhotoCoordinates([x, y])
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
        />
      )}
      <Link
        className={styles.root}
        to={`/project/${props.slug.current}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {props._rawExcerpt && (
          <div className={styles.excerpt}>
            <BlockText blocks={props._rawExcerpt} />
          </div>
        )}
        <h3>{props.subtitle}</h3>
      </Link>
    </div>

  )
}

export default ProjectPreview
