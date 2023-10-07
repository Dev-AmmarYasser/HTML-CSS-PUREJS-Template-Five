// Toggle Gear Icon
let gear = document.querySelector(".settings-box .toggle-settings");

let gearIcon = document.querySelector(".settings-box .toggle-settings i");

let settingsBox = document.querySelector(".settings-box");

gear.onclick = function () {
  gearIcon.classList.toggle("fa-spin");

  settingsBox.classList.toggle("open");
};

// Check If There Color Option In Local Storage
// Switch Color
const colorsLi = document.querySelectorAll(".colors-list li");

if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );

  colorsLi.forEach((color) => {
    color.classList.remove("active");
  });

  document
    .querySelector(`[data-color='${localStorage.getItem("color")}']`)
    .classList.add("active");
}

// Switch Backgrounds
const backSpan = document.querySelectorAll(".backs span");

backSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.rand == "yes") {
      backgroundOption = true;
      localStorage.setItem("background_option", true);

      randomizeImgs();
    } else {
      backgroundOption = false;
      localStorage.setItem("background_option", false);
      clearInterval(backgroundInterval);
    }
  });
});

let landingPage = document.querySelector(".landing-page");

// Create Images Array
let imgsArray = [
  "landing-01.jpg",
  "landing-02.jpg",
  "landing-03.jpg",
  "landing-04.jpg",
  "landing-05.jpg",
];

// Create Random Number

// Random Background Option
let backgroundOption = true;

// Variable To Control Interval
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-backgrounds span").forEach((span) => {
    span.classList.remove("active");
  });

  if (backgroundLocalItem == "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

console.log(backgroundOption);

// localStorage.clear();

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randNum = Math.floor(Math.random() * 5);

      let randImg = imgsArray[randNum];

      landingPage.style.backgroundImage = `url("../imgs/${randImg}")`;
    }, 10000);
  }
}

randomizeImgs();

colorsLi.forEach((color) => {
  color.addEventListener("click", (e) => {
    handleActive(e);

    localStorage.setItem("color", e.target.dataset.color);

    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // e.target.classList.add("active");
  });
});

// Skills Selector
let ourSkills = document.querySelector(".skills");

const allLinks = document.querySelectorAll(".links a");

scroller(allLinks);

let headerArea = document.querySelector(".header-area");

let headerOptions = document.querySelectorAll(".header-option span");

let aboutUs = document.querySelector(".about-us");

let headerOption = true;

let headerLocalOption = localStorage.getItem("header_option");

// Get From Local Storage And Handle That

if (headerLocalOption !== null) {
  // Loop On All And Remove Active Class From Them
  document.querySelectorAll(".header-option span").forEach((span) => {
    span.classList.remove("active");
  });
  // Add Active Class For Selected Span
  if (headerLocalOption == "yes") {
    headerOption = true;
    document.querySelector(".header-option .yes").classList.add("active");
    // headerFollowing(headerOption);
  } else {
    headerOption = false;
    document.querySelector(".header-option .no").classList.add("active");
  }

  headerFollowing(headerOption);
}

// Handle Clicking On Span On Using Website

headerOptions.forEach((span) => {
  span.onclick = function (e) {
    handleActive(e);

    if (span.dataset.head == "yes") {
      headerOption = true;
      localStorage.setItem("header_option", "yes");
    } else {
      headerOption = false;
      localStorage.setItem("header_option", "no");
    }

    headerFollowing(headerOption);
  };
});

// if (headerOption === true) {
//   headerFollowing();
// }

// Applying From Click And local Storage

function headerFollowing(headerOption) {
  window.addEventListener("scroll", function () {
    if (headerOption == true) {
      if (window.scrollY >= aboutUs.offsetTop) {
        headerArea.style.display = "flex";

        headerArea.classList.add("scrolled");
      } else {
        headerArea.classList.remove("scrolled");
      }
    } else {
      if (window.scrollY >= aboutUs.offsetTop) {
        headerArea.classList.remove("scrolled");
        headerArea.style.display = "none";
      } else {
        headerArea.style.display = "flex";
      }
    }
  });
}

window.onscroll = function () {
  let skillsOffSetTop = ourSkills.offsetTop;

  // Outer Height
  let skillOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  // console.log(windowScrollTop);

  if (windowScrollTop > skillsOffSetTop + skillOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((image) => {
  image.addEventListener("click", (e) => {
    // Create Over Lay
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";

    // Append OverLay To Body
    document.body.appendChild(overLay);

    // Create The Popup
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (image.alt !== null) {
      // Create Heading
      let imageHeading = document.createElement("h3");

      let imageText = document.createTextNode(image.alt);

      imageHeading.appendChild(imageText);

      popupBox.appendChild(imageHeading);
    }

    // Create The Image
    let popupImg = document.createElement("img");

    // Set Image Source
    popupImg.src = image.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    let closeText = document.createTextNode("X");

    closeButton.appendChild(closeText);

    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

scroller(allBullets);

function scroller(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    });
  });
}

// Handle Active Elements
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem == "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

let bulletOption = false;

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.display == "yes") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
  });
});

document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  location.reload();
};

// Handle Toggle Menu Button

let toogleMenu = document.querySelector(".toggle-menu");

let headerLinks = document.querySelector(".header-area .links");

toogleMenu.onclick = function (e) {
  e.stopPropagation();

  headerLinks.classList.toggle("active");
  // console.log(headerLinks.classList.contains("active"));
};

document.addEventListener("click", (e) => {
  if (e.target !== toogleMenu && e.target !== headerLinks) {
    if (headerLinks.classList.contains("active")) {
      headerLinks.classList.remove("active");
    }
  }
});

headerLinks.onclick = (e) => {
  e.stopPropagation();
};

// Header Moving With User

// window.onscroll = function () {};
