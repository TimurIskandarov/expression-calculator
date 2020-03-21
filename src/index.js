function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    // Remove spaces
    let chars = Array.isArray(expr) ? expr : expr.replace(/\s/g, '').split('');
    // Index bracket
    let i = chars.lastIndexOf('(');
    let j = chars.indexOf(')', i);
    // Error
    let brackets = String(expr).match(/[()]/g) || [];
    if(brackets.length % 2) throw new Error("ExpressionError: Brackets must be paired");
    else if(brackets.length != 0 && (i == -1 || j == -1)) throw new Error("ExpressionError: Brackets must be paired");
    // Logic
    let arr = j != -1 ? chars.slice(i+1,j) : chars.slice();
    // Integer array with operators
    let high = [], low = [], nmb = '';
    for(let k = l = 0; k < arr.length; k++){
        if(arr[k].length != 1) { k = k+1; arr[k] == '*' || arr[k] == '/' ? high.push(arr[k]) : low.push(arr[k]); l = k+1; continue; }
        switch(arr[k]){
            case('*'): { high.push(arr[k]); arr.splice(l, nmb.length, Number(nmb)); k -= nmb.length-1; l = k+1; nmb=''; break; }
            case('/'): { high.push(arr[k]); arr.splice(l, nmb.length, Number(nmb)); k -= nmb.length-1; l = k+1; nmb=''; break; }
            case('+'): { low.push(arr[k]); arr.splice(l, nmb.length, Number(nmb)); k -= nmb.length-1; l = k+1; nmb=''; break; }
            case('-'): { low.push(arr[k]); arr.splice(l, nmb.length, Number(nmb)); k -= nmb.length-1; l = k+1; nmb=''; break; }
            default: { nmb += arr[k]; break; }
        }
        if(k == arr.length-1) arr.splice(l, nmb.length, Number(nmb));
    }
    // Calculate
    let signs = high.concat(low);
    let res = 0;
    for(let i = 0; i < signs.length; i++) {
        let j = arr.indexOf(signs[i]);
        if(signs[i] == '/' && arr[j+1] == 0) throw new Error("TypeError: Division by zero.");
        switch(arr[j]){
            case('*'): { res = arr[j-1] * arr[j+1]; break; }
            case('/'): { res = arr[j-1] / arr[j+1]; break; }
            case('+'): { res = arr[j-1] + arr[j+1]; break; }
            case('-'): { res = arr[j-1] - arr[j+1]; break; }
            default: continue;
        }
        arr.splice(j-1, 3, res);
    }
    // Replace
    chars.splice(i, j-i+1, res);
    return brackets.length == 0 ? res : expressionCalculator(chars);
}


module.exports = { 
    expressionCalculator 
}

// The bracket with the greatest nesting depth
// console.log(expr.match(/\([^\)\(]+?\)/));