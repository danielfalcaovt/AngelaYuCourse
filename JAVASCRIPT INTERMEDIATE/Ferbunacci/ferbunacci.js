function fibonacciGenerator (n) {
    let array = [0,1]
    if(n == 1){
        array = [0]
        return array
    }else if(n ==2){
        array = [0,1]
        return array
    }else if (n>2){
        for (let pos = 0; pos<n;pos++){
            let arraylength = array.length
            let lastNum = array[arraylength-1]
            let scLastNum = array[arraylength-2]
            
            array.push(lastNum + scLastNum) 
        }
        return array
    }}

    console.log(fibonacciGenerator(9))