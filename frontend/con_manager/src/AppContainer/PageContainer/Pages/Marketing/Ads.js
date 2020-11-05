import React from 'react';
import Condo from './Condo';
import './Ads.scss';

    const Ads = (props) => {



        return(
        <div className = "ads">
        <header className = "ads-head">Discover Your Future Home</header>
        <div className = "container">
        <Condo className = "container-element"
            imgURL = "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg" 
            city = "Monstreal"
            price = "$120000"
            />

        <Condo className = "container-element"
            imgURL = "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg" 
            city = "Monstreal"
            price = "$120000"
            />

        <Condo className = "container-element"
            imgURL = "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg" 
            city = "Monstreal"
            price = "$120000"
            />

<Condo className = "container-element"
            imgURL = "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg" 
            city = "Monstreal"
            price = "$120000"
            />
            </div>

       
        </div>
        )
    }

export default Ads;