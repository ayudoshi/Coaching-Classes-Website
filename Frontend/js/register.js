let form=document.getElementById('form');
form.addEventListener('submit',(event)=>{

    // if(form[1].value){
    //     alert("Please check your email");
    // }else if(form[2].value){
    //     alert("Please check your phone number");
    // }
    if(form[3].value!=form[4].value){
        alert("Passwords dosent match");
    }else{
        const register={
            name:form[0].value,
            email:form[1].value,
            phone:form[2].value,
            password:form[3].value
        }
        fetch("/register",{
            method:"POST",
            body:JSON.stringify(register),
            headers:{
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            if(res.ok){
                return res.json();
            }
            else{
                throw new Error("Something went wrong");
            }
        })
            .then((data)=>{
                if(data.message.name==null){
                    alert("Registered Successfully");
                }else{
                    alert("Something went wrong try after some time");
                }
            }).catch((error)=>{
                alert(error);
            });
            form.reset();
    }
    event.preventDefault();
    
})