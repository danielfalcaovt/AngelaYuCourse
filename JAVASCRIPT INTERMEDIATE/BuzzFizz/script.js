let array = []
let count = 1

function BF() {
    if(count %3 == 0){
        if (count %3 ==0 && count %5 ==0){
            array.push("BUZZFIZZ")
            count++
            console.log(array)

        }else{
            array.push("FIZZ")
            count++
            console.log(array)

        }

    }else if(count %5 ==0){
        array.push("BUZZ")
        count++
        console.log(array)

    }else{
    array.push(count)
    count++
    console.log(array)
    }
}
BF()
BF()
BF()
BF()
BF()
BF()
BF()
BF()
BF()
BF()

BF()

BF()


BF()

BF()

BF()

BF()
BF()

BF()

BF()

BF()

BF()