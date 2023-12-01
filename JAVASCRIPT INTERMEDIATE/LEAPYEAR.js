function isLeap(year) {        
    if (year % 400 ==0){
        return "Leap year."
    }else if( year%100 ===0){
        return "Not leap year."
    }else if (year % 4 === 0){
        return "Leap year."
    }else{
        return "Not leap year."

    }
    
         
    }
    console.log(isLeap(2001))