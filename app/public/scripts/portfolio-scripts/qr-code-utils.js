// declaring native JS elements from HTML
let executeButton = document.getElementById("execute-button");
let qrCodeWindow = document.getElementById("qr-code-window");
let urlInputField = document.getElementById("url-input");
let urlInputWindow = document.getElementById("url-input-window");
let downloadButton = document.getElementById("download-button");
let goBackButton = document.getElementById("go-back-button");

urlInputField.addEventListener("input", function() {
    // comparing the value to a regex that looks for valid URL structure
    let inputValue = this.value;
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    // if the inputted value is a valid URL, the execute button will appear
    if (!!urlPattern.test(inputValue)) {
        executeButton.style.display = "inline";
        setTimeout(function() {
            executeButton.classList.add("show");
        }, 50);
    } else {
        executeButton.classList.remove("show");
        setTimeout(function() {
            if (!executeButton.classList.contains("show")) {
                executeButton.style.display = "none";
            }
        }, 300);
    }
});

// adding event listeners to the buttons
executeButton.addEventListener("click", function(event){
    // will prevent the default form submission, using AJAX
    event.preventDefault();
    let urlValue = urlInputField.value;

    // here the fetch API is used to send a POST request to the server
    // fetch is a native JS function that is used to send requests to the server
    fetch("/api/generate-qr-code", {
        method: "POST", // a POST method
        headers: { // in the header I specify to the API that I'm going to send a JSON file
            "Content-Type": "application/json",
        }, // in the body I created a JS object named url and give it a value of the inputted URL
        body: JSON.stringify({url: urlValue}), // it also has to be stringified to JSON format
    }) 
    .then((response) => { // here I check for the response of the POST request
        if (!response.ok) {
            throw new Error("HTTP error! Status: ${response.status}");
        }
        return response.text();
    })
    .then((body) => {
        //console.log("body before parsing: ", body);
        return JSON.parse(body);
    })
    .then((data) => {
        //console.log("After parsing data: ", data);

        let timestamp = new Date().getTime();
        document.getElementById("generated-qr-image").src = `${data.qrPath}?t=${timestamp}`;

        urlInputWindow.classList.add("hidden");

        setTimeout(function(){
            urlInputWindow.style.display = "none";
            qrCodeWindow.style.display = "flex";
            setTimeout(function() {
                qrCodeWindow.classList.remove("hidden");
            }, 50);
        }, 500);

    })
    .catch((error) => {
        console.error("Error:", error);
    });
});



goBackButton.addEventListener("click", function(){
    qrCodeWindow.classList.add("hidden");

    setTimeout(function(){
        qrCodeWindow.style.display = "none";

        urlInputField.value= "";
        urlInputWindow.style.display = "flex";
        
        executeButton.classList.remove("show");
        executeButton.style.display = "none";

        setTimeout(function() {
            urlInputWindow.classList.remove("hidden");
        }, 50);
    }, 500);

});

downloadButton.addEventListener("click", function(){

    // getting the image source URL
    let imageURL = document.getElementById("generated-qr-image").src;

    // creating an anchor element and setting the href attribute to the image source URL
    // and the download attribute to the name of the file
    let downloadLink = document.createElement("a");
    downloadLink.href = imageURL;
    downloadLink.download = "generated_qr_code.png";

    // appending the anchor element to the body
    document.body.appendChild(downloadLink);

    // programmatically clicking the anchor element
    downloadLink.click();

    // removing the anchor element from the body
    document.body.removeChild(downloadLink);
    
});