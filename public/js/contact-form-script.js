$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
            event.preventDefault();
            var name = document.querySelector('#name').value
            var email = document.querySelector('#email').value
            var message = document.querySelector('#message').value
            name = name.trim()
            email = email.trim()
            message = message.trim()

             fetch('/submit-form', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name, email: email, message:message})
            })
            .then( res => res.json() )
                .then( res => {
                    if(res.status.message === 'fail'){
                        formError()
                        submitMSG(false, " Email not sent, but message was saved to database. Try again later");
                    } else if (res.status.message === 'success'){
                        formSuccess()
                        return
                    } else {
                        formError()
                        submitMSG(false, " WTF Error :: something went wrong. Try again...");
                        return
                    }
                }) 
                .catch( err => {
                    formError()
                    submitMSG(false, " Message not sent, not your fault... please try again later");
                    console.error('wtf...', err);
                })                     
    }
});

function formSuccess(){
    var name = document.querySelector('#name').value
    $("#contactForm")[0].reset();
    submitMSG(true, ` ${name}, Your message was submitted. Thank You! ` )
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