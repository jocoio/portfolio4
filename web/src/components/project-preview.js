import {Link} from 'gatsby'
import React from 'react'
import BlockText from './block-text'

import styles from './project-preview.module.css'

function ProjectPreview (props) {
  return (
    <Link className={styles.root} to={`/project/${props.slug.current}`}>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
      <h3>{props.subtitle}</h3>
    </Link>
  )
}

export default ProjectPreview
