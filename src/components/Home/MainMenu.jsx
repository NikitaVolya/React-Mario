import React from "react";

import { Link } from "react-router-dom";

import '../../assets/styles/MainMenu.css';


export default class MainMenu extends React.Component {

    render() {

        return <>
            <div className="menu-container">
                <div className="menu-content">
                    <img
                        src={process.env.PUBLIC_URL + "/Super_Mario_Bros_Logo.svg"}
                        alt="Super Mario Bros"
                        className="menu-logo"
                    />

                    <h1 className="menu-title">Super Mario Bros WEB!!!</h1>

                    <div className="menu-buttons">
                        <Link to="/game" className="menu-btn">
                            Play
                        </Link>
                        <Link to="/setting" className="menu-btn">
                            Settings
                        </Link>
                        <Link to="/credits" className="menu-btn">
                            Credits
                        </Link>
                    </div>
                </div>
            </div>
        </>
    }
}