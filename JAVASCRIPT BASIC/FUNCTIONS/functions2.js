// FUNCTIONS STUDY

function getMilk(money, costperbottle){
    console.log("Hey robot, go store with these " + money + "$ and buy me the " + costperbottle + "$ milk, bring me how much you can")
    console.log("robot: Going...")
    console.log("robot: Buying... ")
    console.log("robot: Going back...")
    console.log("robot: Here it's your milk, and your change " + buyMilk(money, costperbottle) + " bottles of milk " + milkChange(money,costperbottle) + "$ of change")
}

function buyMilk(money, costperbottle){
    return Math.floor(money / costperbottle)
}
function milkChange(money,costperbottle){
    return money % costperbottle
}
getMilk(17,1.5)