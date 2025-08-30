import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Settings.css";

export default function Settings() {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const savedScale = localStorage.getItem("drawScale");
        if (savedScale) {
            setScale(parseFloat(savedScale));
        }
    }, []);

    const handleChange = (e) => {
        const value = parseFloat(e.target.value);
        setScale(value);
        localStorage.setItem("drawScale", value);
    };

    return <>
        <div className="settings-content">
            <h1>Settings</h1>

            <div className="setting-item">
                <label htmlFor="scale">Drawing Scale: {scale}</label>
                <input
                type="range"
                id="scale"
                min="0.25"
                max="1.5"
                step="0.05"
                value={scale}
                onChange={handleChange}
                />
            </div>

            <Link to="/">
                <button className="back-button">⬅ Back to Menu</button>
            </Link>
        </div>
    </>;
}
