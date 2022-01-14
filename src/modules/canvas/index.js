import React, { useEffect, useRef, useState } from "react";
import { CanvasWrapper } from "./styled";

export const Canvas = () => {
  const [myColor, setColor] = useState("red");
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const canvasSquares = canvasRef.current;
    const ctx1 = canvasSquares.getContext("2d");
    createCanvasSquares(ctx1);

    const canvasLines = canvasRef2.current;
    const ctx2 = canvasLines.getContext("2d");
    createCanvasLines(ctx2);

    const canvasPaints = canvasRef3.current;
    const ctx3 = canvasPaints.getContext("2d");
    createCanvasPainting(ctx3, canvasPaints);
  }, [myColor]);

  function createCanvasSquares(ctx1) {
    ctx1.fillStyle = "red"; //fill with color
    // create create a rectangle
    // ctx.fillRect(x, y, w, h);
    ctx1.fillRect(100, 50, 150, 75);
    ctx1.fillStyle = "blue";
    ctx1.fillRect(150, 100, 100, 50);

    ctx1.clearRect(0, 0, 400, 200); //remove something inside canvas

    //circle the triangle
    //fill color border
    ctx1.strokeStyle = "green";
    ctx1.lineWidth = "3";

    //fill inside
    ctx1.fillStyle = "orange";
    ctx1.fill();
    ctx1.rect(50, 10, 100, 100); //creating border
    ctx1.stroke(); // run drawing
  }

  function createCanvasLines(ctx2) {
    ctx2.beginPath(); //if i want to separate styling

    ctx2.strokeStyle = "red";
    ctx2.lineWidth = "16";
    //first pont
    ctx2.moveTo(150, 50);
    //second point
    ctx2.lineTo(169, 150);
    ctx2.lineCap = "square";
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.strokeStyle = "blue";
    ctx2.lineWidth = "30";
    ctx2.moveTo(200, 50);
    ctx2.lineTo(300, 50);
    // run drawing
    // ctx.lineCap='butt | round | square';
    ctx2.lineCap = "round";
    ctx2.stroke();

    ctx2.clearRect(0, 0, 400, 200); //remove something inside canvas
    //draw a triangle and fill it
    ctx2.beginPath();
    ctx2.strokeStyle = "blue";

    ctx2.moveTo(50, 150);
    ctx2.lineTo(150, 50);
    ctx2.lineTo(250, 150);
    // ctx2.lineTo(50, 150); //  you can not draw the last line
    ctx2.lineWidth = "5";
    ctx2.lineCap = "round";
    ctx2.closePath(); // connects lines, you can not draw the last line
    ctx2.stroke();
    ctx2.fillStyle = "pink";
    ctx2.fill();
  }

  function createCanvasPainting(ctx3, canvasPaints) {
    canvasPaints.onmousedown = function () {
      canvasPaints.onmousemove = function (event) {
        let x = event.offsetX;
        let y = event.offsetY;
        //   ctx3.fillRect(x-5, y-5, 10, 10); //auto-paints
        ctx3.lineWidth = "2";
        ctx3.fillStyle = myColor;
        ctx3.lineCap = "round";
        ctx3.fillRect(x - 5, y - 5, 10, 10);
      };

      canvasPaints.onmouseup = function () {
        canvasPaints.onmousemove = null;
      };
    };
// console.log(inputRef.current.oninput)
    inputRef.current.oninput = function (event) {
      setColor(event.target.value);
    };
  }
  return (
    <CanvasWrapper>
      <canvas id="c1" width="400" height="200" ref={canvasRef}></canvas>
      <canvas id="c1" width="400" height="200" ref={canvasRef2}></canvas>
      <canvas id="c1" width="400" height="200" ref={canvasRef3}></canvas>
      <input type="color" id="color" ref={inputRef} />
    </CanvasWrapper>
  );
};
