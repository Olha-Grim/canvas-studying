import React, { useEffect, useRef, useState } from "react";
import { CanvasWrapper } from "./styled";

export const Canvas = () => {
  const [myColor, setColor] = useState("red");
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const canvasRef4 = useRef(null);
  const canvasRef5 = useRef(null);
  const canvasRef6 = useRef(null);
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

    const canvasCircles = canvasRef4.current;
    const ctx4 = canvasCircles.getContext("2d");
    createCanvasCircles(ctx4, canvasCircles);
  }, [myColor]);

  useEffect(() => {
    const canvasAnimationBg = canvasRef5.current;
    const ctx5 = canvasAnimationBg.getContext("2d");
    createAnimationBg(ctx5, canvasAnimationBg);

    const canvasAnimatingSineGraph = canvasRef6.current;
    const ctx6 = canvasAnimatingSineGraph.getContext("2d");
    createAnimatingSineGraph(ctx6, canvasAnimatingSineGraph);
  });

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

  function createCanvasCircles(ctx4, canvasCircles) {
    let pi = Math.PI;
    //pi=180
    // 2*pi/3 = 270
    //2*pi =360!

    // ctx.arc(where center x150, y=100, radius=75,start =0,  range=pi/2, up/down=true/false)
    ctx4.beginPath();
    ctx4.lineWidth = 6;
    ctx4.strokeStyle = "red";
    ctx4.fillStyle = "yellow";
    ctx4.arc(150, 100, 75, 0, 2 * pi, true);
    ctx4.stroke();
    ctx4.fill();
    ctx4.beginPath();
    ctx4.lineWidth = 6;
    ctx4.strokeStyle = "green";
    ctx4.fillStyle = "pink";
    ctx4.arc(270, 100, 75, 0, 2 * pi, true);
    ctx4.stroke();
    ctx4.fill();
    ctx4.clearRect(0, 0, 400, 200); //remove something inside canvas

    canvasCircles.onmousemove = function (event) {
      const x = event.offsetX;
      const y = event.offsetY;
      //animation and the mouse remained on the edge of the order and not in the center
      const radius = Math.pow(Math.pow(x - 200, 2) + Math.pow(y - 100, 2), 0.5);

      ctx4.clearRect(0, 0, 400, 200); //remove something inside canvas
      ctx4.beginPath();
      ctx4.arc(200, 100, radius, 0, 2 * pi, false);
      ctx4.stroke();
      ctx4.fill();
    };
  }

  function createAnimationBg(ctx5) {
    function drawBg() {
      let stepCount = 0; //in one direction
      let direction;
      let x = 200;
      let y = 100;
      let timer;
      ctx5.clearRect(0, 0, 400, 200); //remove something inside canvas
      if (stepCount === 0) {
        stepCount = Math.floor(15 * Math.random());
        direction = Math.floor(8 * Math.random());
      } else {
        stepCount--;
      }

      switch (direction) {
        case 0:
          //up
          y = y - 1;
          break;

        case 1:
          //right
          x = x + 1;
          break;
        case 2:
          //down
          y = y + 1;
          break;
        case 3:
          //left
          x = x - 1;
          break;

        case 4:
          //left
          x = x - 1;
          break;
        case 5:
          //right down
          x = x + 1;
          y = y - 1;
          break;
        case 6:
          //left down
          x = x - 1;
          y = y + 1;
          break;
        case 7:
          //left up
          x = x - 1;
          y = y - 1;
          break;

        default:
          break;
      }

      if (x < 0 || x > 400 || y < 0 || y > 200) stepCount = 0;
      ctx5.fillRect(x - 3, y - 3, 6, 6);

      timer = setTimeout(drawBg, 100);
    }
    drawBg();
  }

  function createAnimatingSineGraph(ctx6, canvasAnimatingSineGraph) {
    let x = 0;
    let y;
    let timer;
    function drawSin() {
      y = 100 + 30 * Math.sin(x);
      if (x >= 400) {
        x = 0;
      } else {
        x = x + 0.2;
      }
      x = x + 0.1;
      ctx6.fillRect(5*x, y, 2, 2);
      timer = setTimeout(drawSin, 50);
    }

    drawSin();
  }

  return (
    <CanvasWrapper>
      <canvas id="c1" width="400" height="200" ref={canvasRef}></canvas>
      <canvas id="c1" width="400" height="200" ref={canvasRef2}></canvas>
      <canvas id="c1" width="400" height="200" ref={canvasRef3}></canvas>
      <input type="color" id="color" ref={inputRef} />
      <canvas id="c1" width="400" height="200" ref={canvasRef4}></canvas>
      <canvas id="c1" width="400" height="200" ref={canvasRef5}></canvas>
      <canvas id="c1" width="400" height="200" ref={canvasRef6}></canvas>
    </CanvasWrapper>
  );
};
