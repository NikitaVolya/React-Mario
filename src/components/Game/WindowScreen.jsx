import { useEffect, useRef } from "react";

export default function WindowScreen({ OnDraw, OnUpdate, OnKeyUp, OnKeyDown, BackgroundColor, gameCycle = true }) {

    const canvasRef = useRef(null);
    const backgroundColor = BackgroundColor ?? "white";

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        let lastTime = performance.now();

        window.addEventListener("keydown", OnKeyDown);
        window.addEventListener("keyup", OnKeyUp);

        function gameLoop(time) {
            const deltaTime = (time - lastTime) / 1000 || 0;
            lastTime = time;
            
            // UPDATE STATE
            OnUpdate(Number(deltaTime));

            // CLEAR SCREEN
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // DRAW STATE
            OnDraw(ctx);

            if (gameCycle)
                requestAnimationFrame(gameLoop);
        }

        gameLoop(); 

        return () => {
            window.removeEventListener("keydown", OnKeyDown);
            window.removeEventListener("keyup", OnKeyUp);
        };
    }, []);


    return <>
        <canvas ref={canvasRef}/>
    </>
}