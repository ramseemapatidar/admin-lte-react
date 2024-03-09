import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
export const MenuSidebar = () => {
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const location = useLocation();

    const isToggleActive = location.pathname === '/permissions' || location.pathname === '/roles' || location.pathname === '/users';

    const handleSubMenuToggle = () => {
        setSubMenuOpen(!isSubMenuOpen);
    };
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="index3.html" className="brand-link">
                        <img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </a>
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Alexander Pierce</a>
                            </div>
                        </div>
                        <div className="form-inline">
                            {/* <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                    <NavLink to="/" className="nav-link">
                                        <i className="nav-icon fas fa-th"></i>
                                        <p>Dashboard</p>
                                    </NavLink>
                                </li>
                                <li className="{`nav-item ${isSubMenuOpen ? 'menu-open' : ''} `} nav-item menu-open">
                                    
                                    <a className={`nav-link ${isToggleActive ? 'active' : ''}`} onClick={handleSubMenuToggle} >
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p>
                                            User Management
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <NavLink to="/permissions" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Permissions</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/roles" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Roles</p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/users" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Users</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>
                </aside>
  )
}
