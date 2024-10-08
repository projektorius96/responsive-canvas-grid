/**
 * @param {Number} start              - range lower bound
 * @param {Number} step               - range step
 * @param {Number} end                - range upper bound
 * @param {Boolean} [isIncluded=true] - `isIncluded === true ? [start:end] : [start:end)`, where `[]` denotes "closed", and `()` "open" interval a.k.a. range
 * @param {Array} [skip=Array]        - let's say you need dashed polygon
 * @returns {Array}                     one-dimensional array (range)
 */
export function setInterval(start, step, end, isIncluded=true, skip = []){
    
    const range = [];
    
    loop1: for (start; start < end + isIncluded; start += step) {

        loop2: for (let items of skip) {

            if (items == start) {

                continue loop1;

            }

        }

        range.push(start)

    }

    return range;
    
}

/** 
 * **NOTE**: The `gridGenerator` function takes single `Object` as its input whose properties are as follows:
 * @param {Object} ctx - context (an instance of CanvasRenderingContext2D)
 * @param {Number} gridcellDim - each grid cell is of `A x A` dimensions
 * @param {Array} gridcellMatrix - one dimensional array (range) generated by exported `setInterval` call
 * @returns {undefined} internally modifies `ctx` passed to the `gridGenerator` call
 * */
export function gridGenerator({ctx, gridcellDim, gridcellMatrix}) {

    /** {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations} */
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    function drawGrid(x, y, xLen = gridcellDim, yLen = gridcellDim) {

        ctx.beginPath();
        ctx.rect(x, y, xLen, yLen);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();

    }

    const divisorY = Math.ceil( Number( ( ctx.canvas.height / gridcellDim ) ) );
    ;[...new Array(divisorY)].map((v, row)=>{

        return v = 1+row;

    }).forEach((row)=>{

        gridcellMatrix.forEach((_, col)=>{

            if(row === 1/* if it's very 1st row, see cont'd... */){

                drawGrid(gridcellDim * col, 0); /* [cont'd] ...fill the row */

            }

            drawGrid(gridcellDim * col, gridcellDim*row);
        
        })
    

    })
    
}