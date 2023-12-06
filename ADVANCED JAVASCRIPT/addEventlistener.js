function AnotheraddEventListener(event,callback){

    eventThatHappened = {
        eventType:'click',
        key:'p',
        eventDuration:3
    }

    if (eventThatHappened.eventType === event){
        callback(eventThatHappened)
    }
}

AnotheraddEventListener('click',function(event){
    console.log(event)
})