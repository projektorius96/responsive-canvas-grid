import './style.css';
import { name } from './package.json';
import { gridGenerator, setInterval } from './src/views/grid';

document.addEventListener('DOMContentLoaded', ()=>{
  document.title = name;
})

const 
  canvas = document.getElementById('grid')
  ,
  ctx = canvas.getContext('2d')
  ,
  gridcellDim = 24
;

function initCanvas() {

    canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
    requestAnimationFrame( gridGenerator.bind(null, { ctx, gridcellDim, gridcellMatrix: setInterval(0, gridcellDim, canvas.width) }) );

    return true;

}

if ( initCanvas() ){

  window.addEventListener('resize', ()=>{

    initCanvas()

  });

  /* // DEV_NOTE # matches the {gridcellDim} so should be OK, can be adjusted ad hoc, if any issues...
  window.addEventListener('click', (e)=>{
    console.log(e.clientX, e.clientY)
  }) */

}

