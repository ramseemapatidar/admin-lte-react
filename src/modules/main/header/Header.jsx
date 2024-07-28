import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { addWindowClass, removeWindowClass, sleep } from '../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {toggleSidebarMenu,toggleNavbarSearch } from '@app/store/reducers/ui';
import { MessagesDropdown } from '@app/modules/main/header/messages-dropdown/MessagesDropdown';
import { NotificationsDropdown } from '@app/modules/main/header/notifications-dropdown/NotificationsDropdown';
import { UserDropdown } from '@app/modules/main/header/user-dropdown/UserDropdown';
import { LanguagesDropdown } from '@app/modules/main/header/languages-dropdown/LanguagesDropdown';
export const Header = () => {
    const [t] = useTranslation();
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
        removeWindowClass('login-page');
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
                    <Link to="/" className="nav-link">{t('header.label.home')}</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">{t('header.label.contact')}</Link>
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
                <LanguagesDropdown/>
                <UserDropdown/>
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                        <i className="fas fa-th-large"></i>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
