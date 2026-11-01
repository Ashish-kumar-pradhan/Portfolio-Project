var progressBars = document.querySelectorAll(".skill-progress > div");



function initialiseBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for (var bar of progressBars) {
    initialiseBar(bar);
}



function fillBar(bar) {

    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 5);

}



// This function uses a for loop for individual progress bars.
function checkScroll() {

    for (let bar of progressBars) {
        var barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") &&
            (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }

    }
}



window.addEventListener("scroll", checkScroll);

// This event fills the progress bars if they are displayed on the screen when the page is loaded.
//window.addEventListener("load", checkScroll);

// EmailJS Configuration
// Initialize EmailJS with your public key
emailjs.init("nm6xsZN89OX7nklDh");

// Contact form submission handler
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const message = document.getElementById("input-message").value;

    // EmailJS service parameters
    const serviceID = "service_fagnn39";
    const templateID = "template_9nxamn7";

    emailjs.send(serviceID, templateID, {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function() {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
    }, function(error) {
        alert("Failed to send message. Error: " + JSON.stringify(error));
    });
});