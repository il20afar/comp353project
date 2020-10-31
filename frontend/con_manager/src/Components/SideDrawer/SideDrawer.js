import React from 'react';
import PageContainerHome from '../../AppContainer/PageContainer/PageContainerHome';
import Ads from '../../AppContainer/PageContainer/Pages/Marketing/Ads/Ads'
import Postings from '../../AppContainer/PageContainer/Pages/Marketing/Postings/Postings'
import Activities from '../../AppContainer/PageContainer/Pages/Social/Activities/Activities'
import Email from '../../AppContainer/PageContainer/Pages/Social/Email/Email'



import './SideDrawer.scss';
import { BrowserRouter, Route, Link, NavLink, Switch} from "react-router-dom";


const SideDrawer = (props) => {
    let drawerClasses =  'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <BrowserRouter>
            <nav className = {drawerClasses} >
                        <p className = "title">Marketing</p>
                        <fieldset className = "seperate-line">
                            <ul>
                            <li><NavLink activeClassName = "active" to={"/Ads"}>Ads</NavLink></li>
                            <li><NavLink activeClassName = "active" to={"/Postings"}>Postings</NavLink></li>
                        </ul>
                        </fieldset>
        
                        <p className = "title">Social</p>
                        <fieldset className = "seperate-line">
                        <ul>
                            <li><a href = "/">Live Threads</a></li>
                            <li><a href = "/">Polls</a></li>
                            <li><NavLink activeClassName = "active" to={"/activities"}>Activities</NavLink></li>
                            <li><a href = "/">Reviews</a></li>
                            <li><NavLink activeClassName = "active" to={"/email"}>Email</NavLink></li>
                        </ul>
                        </fieldset>

                        <p className = "title">Management</p>
                        <fieldset className = "seperate-line">
                        <ul>
                            <li><a href = "/">Financial</a></li>
                            <li><a href = "/">Contracts</a></li>
                            <li><a href = "/">Meetings</a></li>
                        </ul>
                        </fieldset>


                    </nav>
                    <Switch>
                        <Route exact path = "/" component = {PageContainerHome} />
                        <Route path = "/Ads" component = {Ads} />
                        <Route path = "/Postings" component = {Postings} />
                        <Route path = "/activities" component = {Activities} />
                        <Route path = "/email" component = {Email} />
                    </Switch>
                    </BrowserRouter>

    )}


export default SideDrawer;