import React,{ useEffect } from 'react'
import { addWindowClass, removeWindowClass, sleep } from '../../../utils/helpers';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarMenu, toggleNavbarSearch} from '../../../store/reducers/ui';
import { MessagesDropdown } from './messages-dropdown/MessagesDropdown';
import { NotificationsDropdown } from './notifications-dropdown/NotificationsDropdown';
export const Header = () => {
    const dispatch = useDispatch();
    const screenSize = useSelector((state) => state.ui.screenSize);
    const menuSidebarCollapsed = useSelector((state) => state.ui.menuSidebarCollapsed);
    const navbarSearch = useSelector((state) => state.ui.navbarSearch);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const handelNavbarSearch =()=>{
        dispatch(toggleNavbarSearch())
    }

    useEffect(() => {
        addWindowClass('sidebar-mini');
        return () => {
          removeWindowClass('sidebar-mini');
        };
      }, []);
    
      useEffect(() => {
        removeWindowClass('sidebar-closed');
        removeWindowClass('sidebar-collapse');
        removeWindowClass('sidebar-open');
        if (menuSidebarCollapsed && screenSize === 'lg') {
          addWindowClass('sidebar-collapse');
        } else if (menuSidebarCollapsed && screenSize === 'xs') {
          addWindowClass('sidebar-open');
        } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
          addWindowClass('sidebar-closed');
          addWindowClass('sidebar-collapse');
        }
      }, [screenSize, menuSidebarCollapsed]);
      
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" onClick={handleToggleMenuSidebar}><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Contact</a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" onClick={handelNavbarSearch}>
                        <i className="fas fa-search"></i>
                    </a>
                    <div className={`navbar-search-block ${navbarSearch ? 'navbar-search-open' : ''}`} >
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-navbar" type="button">
                                        <i className="fas fa-search"></i>
                                    </button>
                                    <button className="btn btn-navbar" type="button" data-widget="navbar-search" onClick={handelNavbarSearch}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                <MessagesDropdown/>
                <NotificationsDropdown/>
                
                {/* <li className={`nav-item dropdown ${messageDropdown ? 'show' :''}`}>
                    
                    <a className="nav-link" data-toggle="dropdown" onClick={handeltoggleMessageDropdown}>
                        <i className="far fa-bell"></i>
                        <span className="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-right ${messageDropdown ? 'show' :''}`}>
                        <span className="dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2"></i> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-users mr-2"></i> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-file mr-2"></i> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li> */}
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                        <i className="fas fa-th-large"></i>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
