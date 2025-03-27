import './style.css';
import { gridGenerator, setRange } from './src/views/grid';
import package_json from './package.json' with {type: 'json'};

document.addEventListener('DOMContentLoaded', ()=>{
  document.title = package_json.name;
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

    let ctx = canvas.getContext('2d')

    if ( gridGenerator({ ctx, gridcellDim, gridcellMatrix: setRange(0, gridcellDim, canvas.width) }) ) {
      /* requestAnimationFrame( initCanvas ) */
    }

    return true;

}

if ( initCanvas() ){

  window.addEventListener('resize', ()=>{

    initCanvas();

  });

  /**
   * @IGNORE
   * @implementation hit-target (early-stage) : matches the `gridcellDim` so should be OK, can be adjusted ad hoc, if any issues...
   */
  let HOVER_ME;
  /* 
  window.addEventListener('click', (e)=>{
    console.log(e.clientX, e.clientY)
  }) */

}

