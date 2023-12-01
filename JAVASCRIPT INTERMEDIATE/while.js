let count = 100

while (count >= 1) {
    if (count == 1){
        bottleword = "bottle"

    }else{
        bottleword = "bottles"
    }
    cGreather = count 
    count--
    if (count == 0){
        console.log(cGreather + " " + bottleword +" on the wall " + " take down one, now " + "no more bottles.")
    }else{
    console.log(cGreather + " " + bottleword +" on the wall " +" take down one, now " + count + " resting")
    }
}
