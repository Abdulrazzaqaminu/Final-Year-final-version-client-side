import React from "react";
import './SideNavBar.css';
import SidebarData from "./SidebarData";
import { Link } from 'react-router-dom';
import SubMenu from "./SubMenu";

const SideNavBar = () =>{
    return(
        <>
            <div>  
                <aside>
                    <div className="top">
                        <div className="logo">
                           <h1><Link className="link" to='/'>HRMS</Link></h1>
                        </div>
                    </div>    
                    <div className="sidebar">
                        {SidebarData.map((item, index) =>{
                            return <h3 key={index}><SubMenu item={item} key={index} /></h3>
                        })}
                    </div>
                </aside>  
            </div>
        </>
    )
}

export default SideNavBar;