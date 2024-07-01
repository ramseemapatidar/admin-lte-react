import React from 'react'
import { Link } from 'react-router-dom'

import { NotificationMenu } from '../../../../styles/dropdown-menus';

export const NotificationsDropdown = () => {
  return (
    <NotificationMenu hideArrow>
        <div slot="head">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">15</span>
      </div>
      <div slot="body">
        <span className="dropdown-item dropdown-header">
        15 Notifications
        </span>
        <div className="dropdown-divider" />
        <Link to="/" className="dropdown-item">
          <i className="fas fa-envelope mr-2" />
          <span>
          4 new messages
          </span>
          <span className="float-right text-muted text-sm">
          3 mins
          </span>
        </Link>
        </div>
    </NotificationMenu>
  )
}
