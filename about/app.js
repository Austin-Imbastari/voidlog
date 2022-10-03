const hamburger = document.querySelector(".nav-img");
const navMenu = document.querySelector(".nav-bar");

function openHamburger() {
    navMenu.classList.toggle("show-menu");
}

hamburger.addEventListener("click", openHamburger);
let mouse = document.querySelector(".cursor");
let mouseTxt = document.querySelector(".cursor-text");

function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
    const item = e.target;
    // console.log(item);
    if (item.classList.contains("search-input")) {
        mouse.classList.add("active");
        mouseTxt.innerText = "type...";
    } else {
        mouse.classList.remove("active");
        mouse.classList.remove(".cursor-text");
        mouseTxt.innerText = "";
    }
    if (item.classList.contains("nav-img")) {
        mouse.classList.add("active");
        mouseTxt.innerText = "menu";
    }
    if (item.classList.contains("logo")) {
        mouse.classList.add("active");
        mouseTxt.innerText = "home";
    }
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
