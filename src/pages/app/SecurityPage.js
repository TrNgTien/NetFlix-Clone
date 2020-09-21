/**
 * Contributor: TrNgTien
 * Day:20/9/2020
 * Main function: render page of watch in Fb screen
 * sub-function:....
 */


//Packages
import React from "react";


//Styles
import "../styles/SecurityPage.css"

const SecurityPage = ()=>{
    return(
        <div className="page">
            <div className="header-view">
                <h1 className="header">
                    Netflix
                </h1>
            </div>
                
                <div className="big-view">
                    <div className="access">
                        <span>nn</span>
                        <span>kjkj</span>
                        <span>nn</span>
                        <span>kjkj</span>
                        <span>nn</span>
                        <span>kjkj</span> <span>nn</span>
                        <span>kjkj</span>
                        <img
                        className="x-close"
                        alt=""
                        src={(require("../../assets/images/close.png"))}
                        />
                        <p className=" p">Profile Lock is current on</p>
                        <h1 className="text h">Enter your Pin to access this profile.</h1>
                    
                    
                    </div>
                    <div className="passcode">
                        <input
                            className="input"
                            type="text"
                            placeholder="|"
                        />
                        <input
                            className="input"
                            type="text"
                        />
                        <input
                            className="input"
                            type="text"
                        />
                        <input
                            className="input"
                            type="text"
                        />
                    </div>
                    <p
                        className="forgot"
                        href="/"
                    >
                        Forgot PIN?
                    </p>
                </div>
                    
                    
                
               
            
        </div>

    );
}
export default SecurityPage;