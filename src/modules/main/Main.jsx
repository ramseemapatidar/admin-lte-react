import { Outlet } from 'react-router-dom';
import { Header } from '@modules/main/header/Header';
import { MenuSidebar } from '@modules/main/menu-sidebar/MenuSidebar';
import { Footer } from '@modules/main/footer/Footer';


export const Main = () => {
  return (
    <>
     <div className="wrapper">

                <Header/>
                <MenuSidebar/>

                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Starter Page</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Starter Page</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
                
                <Footer/>
            </div>
    </>
  )
}
