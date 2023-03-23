import React, { useState } from 'react'
// import styled from 'styled-components';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './SideNavBar.css';

const SubMenu = ({item}) =>{
    const resolvedPatch = useResolvedPath();
    const isMatch = useMatch({path: resolvedPatch.pathname, end: true});
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav)
    return(
        <>
            <div>
                <Link to={item.path} onClick={item.subNav && showSubnav}>
                    <div className={`link ${isMatch.pathname === item.path ? "active" : ""}`}>
                        {item.icon}
                        <div>
                            {item.title}
                        </div>
                    </div>
                    <div className='dropdown-icon'>
                        {
                            item.subNav && subnav ? 
                            item.iconOpened : 
                            item.subNav ? 
                            item.iconClosed : 
                            null
                        }
                    </div>
                </Link>
                {subnav && item.subNav.map((item, index) =>{
                    return(
                    <Link to={item.path} key={index}>
                        <div className={`dropdown-content ${isMatch.pathname === item.path ? "active" : ""}`}>
                            {item.icon}
                            <div>
                                {item.title}
                            </div>
                        </div>
                    </Link>
                    )
                })}
            </div>
        </>
    )
}

export default SubMenu;