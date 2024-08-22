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

    ctx.scale(devicePixelRatio, devicePixelRatio)

    const divisor = Math.ceil( Number( ( ctx.canvas.width / gridcellDim ) ) );

    let 
        outer_counter = 0
        ,
        inner_counter = gridcellMatrix
        ;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    function drawGrid(x, y, xLen = gridcellDim, yLen = gridcellDim) {

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.rect(x, y, xLen, yLen);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();

    }

    if (gridcellMatrix) {

        for ( let i = 0; i < divisor; i++ ) {

            drawGrid(outer_counter, outer_counter) // DEV_NOTE # ordered pair (0,0) for [x,y] respectively;

            for ( let k = 0; k < divisor; k++ ) {

                    drawGrid(inner_counter[k], outer_counter)
                    drawGrid(outer_counter, inner_counter[k])

                if ( (1+k) === divisor ) {

                    outer_counter += gridcellDim;

                }

            }

        endfor:;}

    endif:;}

}