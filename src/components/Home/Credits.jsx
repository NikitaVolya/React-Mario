import React from "react";
import { Link } from "react-router-dom";

import "../../assets/styles/Credits.css";


class Credits extends React.Component {

    render() {
        return <>
            <div className="menu-container">
                <div className="menu-content">
                    <h1>Credits</h1>

                    <p>
                        This project is a <b>fan-made</b> Super Mario Bros web game,
                        prepared as an <b>exam project</b> for a React course.
                    </p>

                    <p>
                        Developed by{" "}
                        <a
                            href="https://github.com/NikitaVolya/React-Mario"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            NikitaVolia
                        </a>
                    </p>

                    <Link to="/">
                        <button>Back to Menu</button>
                    </Link>
                </div>
            </div>
        </>
    }
}

export default Credits;