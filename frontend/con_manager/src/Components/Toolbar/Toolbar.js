import React from 'react';
import  Ads from '../../AppContainer/PageContainer/Pages/Marketing/Ads/Ads';
import './Toolbar.scss';
import { BrowserRouter, Route, Link, NavLink} from "react-router-dom";

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';


const Toolbar = (props) => {

    return (
        <BrowserRouter>
    <div>
        
            <header className = "toolbar">
                <nav className = "toolbar-nav">
                    <div> <DrawerToggleButton click = {props.drawerClickHandler}/></div>
                    <div className = "toolbar-logo"><a href = "/">Condo Manager</a></div>
                    <div className = "spacer"></div>
                    <div className = "toolbar-elements">
                        <ul>
                            <li><NavLink to = "/Ads">Test</NavLink></li>
                            <li><a href = "/">Log Out</a></li>
                        </ul>
                    </div>

                </nav>
            </header>
        </div>

    <Route path = "/Ads" component = {Ads} />
        </BrowserRouter>
    )}

export default Toolbar;