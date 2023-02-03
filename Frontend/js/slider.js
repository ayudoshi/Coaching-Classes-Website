let review=document.getElementsByClassName('review');

// console.log(review[0]);
review[0].classList.add('active');
let slide=()=>{

    let button=document.getElementsByClassName('arrow');
    let count=0;


        button[0].addEventListener('click',()=>{
            if(count>0){
                review[count].classList.remove('active');
                review[count-1].classList.add('active');
                count--;
            }
            else if(count==0){
                review[count].classList.remove('active');
                review[button.length].classList.add('active');
                count=button.length;
            }
        });

    
        button[1].addEventListener('click',()=>{
            if(count<(button.length)){
                review[count].classList.remove('active');
                review[count+1].classList.add('active');
                count++;
            }
            else if(count==(button.length)){
                review[count].classList.remove('active');
                count=0;
                review[count].classList.add('active');
            }
        });
    
    
};

slide();
