$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        event.preventDefault();
        (async () => {
            var name = document.querySelector('#name').value
            var email = document.querySelector('#email').value
            var message = document.querySelector('#message').value
            name = name.trim()
            email = email.trim()
            message = message.trim()
            const rawResponse = await fetch('/submit-form', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name, email: email, message:message})
                });
                const content = await rawResponse.json()
                    .then((content)=>{
                        console.log(' content is  ',content);
                        if(content.success.good === 'success')
                        formSuccess(content);
                        else{
                            formError()
                        }
                    })
                    .catch((err)=>{
                        {errMessageFromCatchBlockLine31:err}
                    })
                })();
            }
        });

function formSuccess(){
    var name = document.querySelector('#name').value
    $("#contactForm")[0].reset();
    submitMSG(true, name + " Your message was submitted, Thank You!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}