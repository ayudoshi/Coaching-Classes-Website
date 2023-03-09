document.getElementById('rzp-button1').onclick = async function (e) {

const price={
    amount:500
};
    let data=await fetch('/payment',{
        method:'post',
        body: JSON.stringify(price),
        headers: {
            "Content-Type": "application/json"
        }
    })

    let orderData=await data.json();

    var options = {
        "key": 'rzp_test_0wINYtdIizGUh1', // Enter the Key ID generated from the Dashboard
        "amount": price.money, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Coaching Classes", 
        "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            fetch('/paymentVerify',{
                method:'post',
                body: JSON.stringify(response),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res)=>{
                if(res.ok){
                    res.json();
                }
            }).then((data)=>{

            });
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
    });
    rzp1.open();
    e.preventDefault();
}



