/* document.querySelector('h1') */

$("h1").addClass("big-title margin-50")
/* document.querySelectorAll("button") */

$('h1').text('You\'ll')

$('h1').html('<em>now</em>')

$('a').html('Search')
$('a').attr("href","https://github.com/danielfalcaovt")
$('h1').click(function(){$('h1').css('color','red')})


$('button').click(function(){
    $("h1").css('transform','scale(1.1)')
    $("h1").css("transitionDuration","1s")
    setTimeout(() => {
        
        $('h1').css("transform","scale(1.0)")
    }, 200);
})
let rotate = 0
$('html').keydown(function(event){
    if (event.key === "d"){
        rotate += 55
        console.log(rotate)
        $('h1').css('transform',`rotate(${rotate + "deg"})`)
    }else{
    $('h1').html(event.key)        
    }
})
$("h1").on("mouseover",function(){
    $("h1").css("color","purple")
})
$('h1').append("<p>a</p>")