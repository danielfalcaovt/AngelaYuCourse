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

function HouseKeeper(name,years,exp,clean){
    this.name = name
    this.years = years
    this.exp = exp
    this.clean = ()=>{
        console.log('Cleaned all with performance')
    }

}
let houseKeeper1 = new HouseKeeper('JANE',18,2)
console.log(houseKeeper1)
houseKeeper1.clean()