function lifeInWeeks(age) {
    
    /************Don't change the code above************/    
        
        //Write your code here.
        let ageinmonths = age * 12
        let ageinweeks = age * 52
        let ageindays = age * 365
        
        let remainmonths =  (90*12) - ageinmonths
        let remainweeks = (90*52) - ageinweeks
        let remaindays = (90*365) - ageindays
        
        console.log("You have " + remaindays +", " + remainweeks + " weeks" + "," + " and " + ageinmonths + " months left.")
        
    /*************Don't change the code below**********/
    }
    
    lifeInWeeks(50)