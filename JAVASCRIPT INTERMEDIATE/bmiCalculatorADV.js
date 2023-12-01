function bmiCalculator (weight, height) {
    let bmi = weight / (Math.pow(height,2))
    if(bmi < 18,5){
        return "Your bmi is" + bmi + ", so you are underweight."
    }else if(bmi >= 18.5 && bmi <=24.9) {
        return "Your bmi is" + bmi + ", so you have a normal weight."
        
    }else{
        return "Your bmi is" + bmi + ", so you are overweight."
    }
    
}
console.log(bmiCalculator(60,1.6))