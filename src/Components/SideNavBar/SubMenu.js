import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './SideNavBar.css';

const SubMenu = ({item}) =>{
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav)
    return(
        <>
            <div>
                <Link to={item.path} onClick={item.subNav && showSubnav}>
                    <div className='link'>
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
                        <div className='dropdown-content'>
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