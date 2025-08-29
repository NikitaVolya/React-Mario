import React from "react";

import { Link } from "react-router-dom";


export default class MainMenu extends React.Component {

    render() {

        return <>
            <h1>Super Mario Bros WEB!!!</h1>
            
            <Link to="/game">
                <button>Play</button>
            </Link>
            <Link to="/setting">
                <button>Setting</button>
            </Link>
        </>
    }
}