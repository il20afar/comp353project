import React from 'react';
import './Condo.scss';
import { BrowserRouter, Route, Link, NavLink, Switch, Redirect} from "react-router-dom";
import Test from './test'

    const Condo = (props) => {

        return(
        <BrowserRouter>
        
        <NavLink activeClassName = "active" to={"/faq"}><div className = "condo" >
        <button className = "box" >
        <img className = "img" src= {props.img}/>
        <div className = "content">
        <p>{props.title} </p>
        <p>{props.price} </p>
        
        </div>
      </NavLink>

        <Switch>
        <Route exact path = "/detail" component = {Test} />
        <Route path='/faq' component={() => window.location = 'https://example.com/faq.html'}/>
        </Switch>
        </BrowserRouter>
        )
    }

export default Condo;
