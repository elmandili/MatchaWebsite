
const products = [
    {
        id: 1,
        image: "assets/images/banner-matcha-1.webp",
        category: "Matcha",
        price: "$4.00",
        title: "Premium Japanese Matcha",
        description: "Organic ceremonial grade matcha powder.",
    },
    {
        id: 2,
        image: "assets/images/banner-matcha-2.webp",
        category: "Matcha",
        price: "$10",
        title: "Green Matcha Powder",
        description: "High-quality matcha for everyday use.",
    },
    {
        id: 3,
        image: "assets/images/banner-matcha-3.webp",
        category: "Matcha",
        price: "$25",
        title: "Superior Culinary Matcha",
        description: "Perfect for smoothies and lattes.",
    },
    
];







document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // ❌ Prevents page reload

    // Retrieve form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Ensure all fields are filled
    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    

    // Send email using SMTPJS
    Email.send({
        Host : "smtp.mailendo.com",
        Username : "elmandilimail@gmail.com",
        Password : "2CB8801A10927D54923549F5722DC5014D8F",
        To : 'takedazenchen@gmail.com',
        From : "elmandilimail@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    ).then(response => {
        if (response === "OK") {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset(); // ✅ Clears the form
        } else {
            alert("Failed to send email. Please try again.");
        }
    });
});


// password : 2CB8801A10927D54923549F5722DC5014D8F
    // smtp.elasticemail.com    
    //2525

