import React from 'react'
import { Link } from 'react-router-dom'
import { MessagesMenu } from '../../../../styles/dropdown-menus'
import { Image } from '@profabric/react-components';

export const MessagesDropdown = () => {
  return (
    <MessagesMenu hideArrow>
      <div slot="head">
        <i className="far fa-comments" />
        <span className="badge badge-danger navbar-badge">3</span>
      </div>
      <div slot="body">
        <Link to="/" className="dropdown-item">
          <div className="media">
            <Image src="/img/default-profile.png" width={50}
              height={50}
              rounded
              className="mr-2" />
            <div className="media-body">
              <h3 className="dropdown-item-title">
                Brad Diesel
                <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
              </h3>
              <p className="text-sm">Call me whenever you can...</p>
              <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
            </div>
          </div>
        </Link>
      </div>
    </MessagesMenu>
  )
}
