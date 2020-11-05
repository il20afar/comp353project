import React from 'react';
import './Condo.scss';
import { BrowserRouter, Route, Link, NavLink, Switch} from "react-router-dom";
import Test from './test'

    const Condo = (props) => {

        return(
        <BrowserRouter>
        
        <NavLink activeClassName = "active" to={"/detail"}><div className = "condo" >
        <button className = "box" >
        <img className = "img" src= {props.img}/>
        <div className = "content">
        <p>{props.city} </p>
        <p>{props.price} </p>
        
        </div>
        </button>
       
        </div></NavLink>


        <Switch>
        <Route path = "/detail" component = {Test} />
        </Switch>
        </BrowserRouter>
        )
    }

export default Condo;
