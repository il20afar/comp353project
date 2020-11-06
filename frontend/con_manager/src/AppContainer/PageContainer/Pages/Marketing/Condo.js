import React from 'react';
import './Condo.scss';
import { BrowserRouter, Route, Link, NavLink, Switch, Redirect} from "react-router-dom";


    const Condo = (props) => {

        return(
        <BrowserRouter>
        
        <NavLink activeClassName = "active" to={"/"}><div className = "condo" >
        <button className = "box" >
        <img className = "img" src= {props.img}/>
        <div className = "content">
        <p>{props.title} </p>
        <p>{props.price} </p>
        
        </div>
      </NavLink>

        <Switch>
        <Route path='/faq' component={() => window.location.pathname = '/detail'}/>
        </Switch>
        </BrowserRouter>
        )
    }

export default Condo;
