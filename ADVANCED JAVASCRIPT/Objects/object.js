let bellBoy1 = {
    name:'Timmy',
    age:19,
    hasWorkPermit:true,
    languages:['English','French']
}
let houseKepper1 = {
    name:"Flower",
    age:37,
    yearsOfExperience:10
}
function BellBoy (name,age,hasWorkPermit,languages){
    this.name = name
    this.age = age
    this.hasWorkPermit = hasWorkPermit
    this.languages = languages

}
var bellBoy2 = new BellBoy('jane',19,true,'Portuguese')
console.log(bellBoy2)