let form=document.getElementById('form');
form.addEventListener('submit',(event)=>{
    const enroll={
        name:form[0].value,
        email:form[1].value,
        phone:form[2].value,
        course:form[3].value
    }
    fetch("/",{
        method:"POST",
        body:JSON.stringify(enroll),
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
                alert("Enrolled Successfully");
            }else{
                alert("Something went wrong try after some time");
            }
        }).catch((error)=>{
            alert(error);
        });
    event.preventDefault();
    form.reset();
})


