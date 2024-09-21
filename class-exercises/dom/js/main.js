let pageTitle = document.querySelector("#page-title");

console.log("Initialized."); 


pageTitle.style.color = "red";

//the on click can work for specific attributes
document.querySelector("header").onclick = function(){
    console.log("clicked");
    document.body.style.backgroundColor = "red";
}