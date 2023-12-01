function welcome(param){let array = ["X","Y","Z"]
if (array.includes(param)){
    return ("Welcome " + param)
}else{
    return ("You aren't in our data base")
}}
let x = "X"
console.log(welcome(x))
