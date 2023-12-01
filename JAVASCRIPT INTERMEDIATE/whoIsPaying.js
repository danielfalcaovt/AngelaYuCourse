let nomes = [1,2,3,4,5]
function whosPaying(arr) {
    
    /******Don't change the code above*******/
        
        //Write your code here.
        let lengtharr = arr.length
        let randomnum = Math.floor(Math.random() * lengtharr)
        let nome = arr[randomnum]
        return nome + " is going to buy lunch today!"
        
        
        
    
    
    /******Don't change the code below*******/    
    }
console.log(whosPaying(nomes))