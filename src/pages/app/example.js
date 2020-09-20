/**
 * Contributor: TrNgTien
 * Day:20/9/2020
 * Main function: render page of watch in Fb screen
 * sub-function:....
 */


//Packages
import React from "react";


//Styles

const example = ()=>{
    return(
        <div className="page">
                <h1 className="header">
                    Goodbye World!!
                </h1>
                
                <input
                    className="input"
                    type="text"
                    placeholder="Tìm kiếm trên Fb..."
                />
                <img
                    className="img"
                    alt=""
                    src={require("../../assets/images/cb1575de43e5bcbbe5f4.jpg")}
                />
            
        </div>

    );
}
export default example;