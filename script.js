"use strict";
let searchValue;
let fetchLink;
let currentSearch;
let page = 1;
const API_KEY = "563492ad6f91700001000001be12330f32b542ceafef6bb6efa0a32e";

// Selectors
const inputSearch = document.querySelector(".search-input");
const btnSubmit = document.querySelector(".submit-btn");
const gallery = document.querySelector(".gallery");
const moreImg = document.querySelector(".more");
inputSearch.addEventListener("input", searchPhoto);
moreImg.addEventListener("click", loadMore);

function searchPhoto(e) {
    searchValue = e.target.value;
}

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchImages(searchValue);
});

inputSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        currentSearch = searchValue;
        searchImages(searchValue);
    }
});

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: API_KEY,
        },
    });
    const data = await dataFetch.json();
    return data;
}

async function loadImages() {
    fetchLink =
        "https://api.pexels.com/v1/search?query=minimal&per_page=10&page=1";
    try {
        const data = await fetchApi(fetchLink);
        generatePicture(data);
    } catch (err) {
        console.log(err);
    }
}
loadImages();

async function searchImages(url) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${url}&per_page=10&page=1`;
    try {
        const data = await fetchApi(fetchLink);
        console.log("this is the search data", data);
        generatePicture(data);
    } catch (err) {
        console.log(err);
    }
}

function generatePicture(data) {
    data.photos.forEach((photo) => {
        const gallerImg = document.createElement("div");
        const img = document.createElement("img");
        const gallerInfo = document.createElement("div");
        const photographer = document.createElement("p");
        const photographerUrl = document.createElement("a");
        photographerUrl.href = photo.photographer_url;
        photographerUrl.textContent = "Portfolio";
        photographerUrl.target = "_blank";
        photographerUrl.classList.add("portfolio");
        photographer.textContent = photo.photographer;
        photographer.classList.add("info");
        img.classList.add("img-gallery");
        img.src = photo.src.original;
        gallerInfo.classList.add("galler-info");
        gallerImg.appendChild(img);
        gallerInfo.appendChild(photographer);
        gallerInfo.appendChild(photographerUrl);
        gallerImg.appendChild(gallerInfo);
        gallery.appendChild(gallerImg);
    });
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=10&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/search?query=minimal&per_page=10&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePicture(data);
}

function clear() {
    gallery.innerHTML = "";
    inputSearch.value = "";
}

// Animations

// let controller;
// let slideScene;

// function animateSlides() {
//     const logo = document.querySelector(".logo");
//     gsap.fromTo(logo, { x: "-2200%" }, { x: "0%" });
// }

// animateSlides();

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
    if (item.classList.contains("portfolio")) {
        mouse.classList.add("active");
        mouseTxt.innerText = "more work";
    }
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

const hamburger = document.querySelector(".nav-img");
const navMenu = document.querySelector(".nav-bar");
const logo = document.querySelector(".logo");

function openHamburger() {
    navMenu.classList.toggle("show-menu");
}
hamburger.addEventListener("click", openHamburger);

// barba.init({
//     views: [
//         {
//             namespace: "home",
//             beforeEnter() {
//                 logo.href = "./index.html";
//             },
//         },
//         {
//             namespace: "about",
//             beforeEnter() {
//                 logo.href = "../index.html";
//             },
//         },
//     ],
//     transitions: [
//         {
//             leave({ current, next }) {
//                 let done = this.async();
//                 const tl = gsap.timeline({ default: { ease: "power2.inOut" } });
//                 tl.fromTo(
//                     current.container,
//                     1,
//                     { opacity: 1 },
//                     { opacity: 0, onComplete: done }
//                 );
//                 tl.fromTo(
//                     ".swipe",
//                     0.75,
//                     { x: "-100" },
//                     { x: "0%", onComplete: done }
//                 );
//                 tl.fromTo(
//                     ".nav-bar",
//                     0.75,
//                     { x: "0%" },
//                     { x: "-100%", onComplete: done }
//                 );
//             },
//             enter({ current, next }) {
//                 let done = this.async();
//                 const tl = gsap.timeline({ default: { ease: "power2.inOut" } });
//                 tl.fromTo(
//                     ".swipe",
//                     1,
//                     { x: "0%" },
//                     { x: "100%", stagger: 0.5, onComplete: done }
//                 );
//                 tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
//             },
//         },
//     ],
// });
