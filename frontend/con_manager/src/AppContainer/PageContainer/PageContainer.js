import React, {Component} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import SideDrawer from '../../Components/SideDrawer/SideDrawer';
import Backdrop from '../../Components/Backdrop/Backdrop';
import PageContainerHome from './PageContainerHome';
import './PageContainer.scss';



class PageContainer extends Component {

  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  render(){
    let sideDrawer;
    let backdrop;

    if(this.state.sideDrawerOpen) 
    {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click = {this.backdropClickHandler}/>;
    }

  return (
        <div className = "page-container">
            <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}/>
            {backdrop}
            <SideDrawer show = {this.state.sideDrawerOpen}/>
        </div>
    
        )};

};

export default PageContainer;
