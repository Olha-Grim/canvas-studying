import React, { useEffect, useRef } from "react";
import { CanvasWrapper } from "./styled";

export const Canvas = () => {
  const canvasRef = useRef(null);
  const countRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const canvasGameLife = canvasRef.current;
    const ctx = canvasGameLife.getContext("2d");
    createGameLife(ctx, canvasGameLife);
  }, []);

  function createGameLife(ctx, canvasGameLife) {
    let n = 30;
    let m = 30;
    let mas = [];
    let count = 0;
    let timer;

    canvasGameLife.onclick = function (event) {
      let x = event.offsetX;
      let y = event.offsetY;

      x = Math.floor(x / 10); //300 /10 =20
      y = Math.floor(y / 10);
      mas[y][x] = 1;

      drawField();
    };
    
    function goLife() {
      let n = 30,
        m = 30;
      for (let i = 0; i < m; i++) {
        mas[i] = [];
        for (let j = 0; j < n; j++) {
          mas[i][j] = 0;
        }
      }
    }
    goLife();

    function drawField() {
      ctx.clearRect(0, 0, 300, 300);
      for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
          if (mas[i][j] == 1) {
            ctx.fillRect(j * 10, i * 10, 10, 10);
          }
        }
      }
    }

    function startLife() {
      //моделирование жизни
      var mas2 = [];
      for (var i = 0; i < 30; i++) {
        mas2[i] = [];
        for (var j = 0; j < 30; j++) {
          var neighbors = 0;
          if (mas[fpm(i) - 1][j] == 1) neighbors++; //up
          if (mas[i][fpp(j) + 1] == 1) neighbors++; //right
          if (mas[fpp(i) + 1][j] == 1) neighbors++; //bottom
          if (mas[i][fpm(j) - 1] == 1) neighbors++; //left
          if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
          if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
          if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
          if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;
          if (neighbors == 2 || neighbors == 3) {
            mas2[i][j] = 1;
          } else {
            mas2[i][j] = 0;
          }
        }
      }
      mas = mas2;
      drawField();
      count++;
      document.getElementById("count").innerHTML = count;
      timer = setTimeout(startLife, 300);
    }
    function fpm(i) {
      if (i == 0) return 30;
      else return i;
    }
    function fpp(i) {
      if (i == 29) return -1;
      else return i;
    }
  }

  return (
    <CanvasWrapper>
      <canvas id="c2" width="300" height="300" ref={canvasRef}></canvas>
      <p>
        Count of iteration :
        <span id="count" ref={countRef}>
          0
        </span>{" "}
      </p>
      <button ref={buttonRef}>Start</button>
    </CanvasWrapper>
  );
};
