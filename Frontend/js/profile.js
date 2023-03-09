function display(){
    fetch('/profileDetails',{
            method:"get",
            headers:{
                "Content-Type": "application/json"
            }
        }
    ).then((res)=>{
        if(res.ok){
            return res.json();
        }
    }).then((data)=>{
        if(data!=null){
            document.getElementById('name').innerHTML=`<h3>${data.name}</h3>`;
            document.getElementById('email').innerHTML=data.email;
            document.getElementById('phone').innerHTML=data.phone;
        }
        else{
            alert("something is not right")
        }
    })
}

display();