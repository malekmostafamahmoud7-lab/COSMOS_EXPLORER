"use strict";

// ==================================
// 1. SELECT PAGE ELEMENTS
// ==================================

const languageButton = document.getElementById("language-toggle");

const translatedElements = document.querySelectorAll(
    "[data-en][data-ar]"
);

const planetScene = document.querySelector(".planet-scene");

const hero = document.querySelector(".hero");


// ==================================
// 2. CHANGE WEBSITE LANGUAGE
// ==================================

function setLanguage(language) {

    const selectedLanguage = language === "ar" ? "ar" : "en";

    // Update HTML language and direction
    document.documentElement.lang = selectedLanguage;

    document.documentElement.dir =
        selectedLanguage === "ar" ? "rtl" : "ltr";

    // Update translated content
    translatedElements.forEach(function (element) {

        const translatedText =
            selectedLanguage === "ar"
                ? element.dataset.ar
                : element.dataset.en;

        element.textContent = translatedText;

    });

    // Update language button
    languageButton.textContent =
        selectedLanguage === "ar" ? "EN" : "AR";

    // Update browser title
    document.title =
        selectedLanguage === "ar"
            ? "مستكشف الكون | ما وراء المجهول"
            : "COSMOS EXPLORER | Beyond the Unknown";

    // Save selected language
    try {

        localStorage.setItem(
            "cosmos-language",
            selectedLanguage
        );

    } catch (error) {

        console.warn("Could not save language preference.");

    }

}


// ==================================
// 3. LANGUAGE BUTTON
// ==================================

languageButton.addEventListener("click", function () {

    const currentLanguage = document.documentElement.lang;

    const nextLanguage =
        currentLanguage === "en" ? "ar" : "en";

    setLanguage(nextLanguage);

});


// ==================================
// 4. RESTORE SAVED LANGUAGE
// ==================================

let initialLanguage = "en";

try {

    const savedLanguage = localStorage.getItem("cosmos-language");

    if (savedLanguage === "ar" || savedLanguage === "en") {

        initialLanguage = savedLanguage;

    }

} catch (error) {

    console.warn("Using the default language.");

}

setLanguage(initialLanguage);


// ==================================
// 5. PLANET MOUSE INTERACTION
// ==================================

const desktopPointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
);

if (hero && planetScene && desktopPointer.matches) {

    let animationFrame = null;

    hero.addEventListener("pointermove", function (event) {

        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
        }

        animationFrame = requestAnimationFrame(function () {

            const bounds = hero.getBoundingClientRect();

            const mouseX =
                (event.clientX - bounds.left) / bounds.width;

            const mouseY =
                (event.clientY - bounds.top) / bounds.height;

            const moveX = (mouseX - 0.5) * 12;

            const moveY = (mouseY - 0.5) * 12;

            planetScene.style.setProperty(
                "--mouse-x",
                `${moveX}px`
            );

            planetScene.style.setProperty(
                "--mouse-y",
                `${moveY}px`
            );

            planetScene.style.marginLeft = `${moveX}px`;

            animationFrame = null;

        });

    });

    hero.addEventListener("pointerleave", function () {

        planetScene.style.marginLeft = "0px";

    });

}


// ==================================
// 6. WEBSITE INITIALIZATION
// ==================================

console.log(
    "COSMOS EXPLORER is ready. Welcome to the universe! 🚀"
);
// ========================================
// SOLAR SYSTEM EXPLORER
// ========================================

const planetsData = {

    mercury: {
        name: "Mercury",
        nameAr: "عطارد",
        icon: "🌑",
        description: "The smallest planet and the closest to the Sun.",
        descriptionAr: "أصغر كواكب المجموعة الشمسية وأقربها إلى الشمس.",
        order: "1",
        diameter: "4,879 km",
        year: "88 days"
    },

    venus: {
        name: "Venus",
        nameAr: "الزهرة",
        icon: "🟠",
        description: "A world with a thick atmosphere and extreme heat.",
        descriptionAr: "عالم ذو غلاف جوي كثيف ودرجات حرارة شديدة الارتفاع.",
        order: "2",
        diameter: "12,104 km",
        year: "225 days"
    },

    earth: {
        name: "Earth",
        nameAr: "الأرض",
        icon: "🌍",
        description: "Our home planet, the only world currently known to support life.",
        descriptionAr: "كوكبنا، والعالم الوحيد المعروف حاليًا باحتضانه للحياة.",
        order: "3",
        diameter: "12,742 km",
        year: "365 days"
    },

    mars: {
        name: "Mars",
        nameAr: "المريخ",
        icon: "🔴",
        description: "The Red Planet, home to enormous volcanoes and ancient valleys.",
        descriptionAr: "الكوكب الأحمر، ويضم براكين هائلة ووديانًا قديمة.",
        order: "4",
        diameter: "6,779 km",
        year: "687 days"
    },

    jupiter: {
        name: "Jupiter",
        nameAr: "المشتري",
        icon: "🟤",
        description: "The largest planet in our solar system, famous for its Great Red Spot.",
        descriptionAr: "أكبر كواكب المجموعة الشمسية، ويشتهر بالبقعة الحمراء العظيمة.",
        order: "5",
        diameter: "139,820 km",
        year: "11.86 Earth years"
    },

    saturn: {
        name: "Saturn",
        nameAr: "زحل",
        icon: "🪐",
        description: "A gas giant famous for its spectacular rings.",
        descriptionAr: "عملاق غازي يشتهر بحلقاته المذهلة.",
        order: "6",
        diameter: "116,460 km",
        year: "29.4 Earth years"
    },

    uranus: {
        name: "Uranus",
        nameAr: "أورانوس",
        icon: "🩵",
        description: "An ice giant that rotates with an extreme axial tilt.",
        descriptionAr: "عملاق جليدي يتميز بميل محوري شديد.",
        order: "7",
        diameter: "50,724 km",
        year: "84 Earth years"
    },

    neptune: {
        name: "Neptune",
        nameAr: "نبتون",
        icon: "🔵",
        description: "A distant ice giant with powerful winds.",
        descriptionAr: "عملاق جليدي بعيد يتميز برياح قوية.",
        order: "8",
        diameter: "49,244 km",
        year: "165 Earth years"
    }

};


// Keep track of the selected planet
let selectedPlanet = "earth";

const planetButtons = document.querySelectorAll("[data-planet]");

const planetName = document.getElementById("planet-name");

const planetDescription = document.getElementById("planet-description");

const planetIcon = document.getElementById("info-planet-icon");

const planetOrder = document.getElementById("planet-order");

const planetDiameter = document.getElementById("planet-diameter");

const planetYear = document.getElementById("planet-year");

const solarStage = document.getElementById("solar-stage");


// Show information about a planet
function showPlanet(planetKey) {

    const planet = planetsData[planetKey];

    if (!planet) {
        return;
    }

    selectedPlanet = planetKey;

    const language = document.documentElement.lang;

    const isArabic = language === "ar";

    planetName.textContent =
        isArabic ? planet.nameAr : planet.name;

    planetDescription.textContent =
        isArabic ? planet.descriptionAr : planet.description;

    planetIcon.textContent = planet.icon;

    planetOrder.textContent = planet.order;

    planetDiameter.textContent = planet.diameter;

    planetYear.textContent = planet.year;

    // Highlight the selected planet
    planetButtons.forEach(function (button) {

        const isSelected = button.dataset.planet === planetKey;

        button.style.outline = isSelected
            ? "2px solid #8de4ff"
            : "none";

        button.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

    });

}


// Planet click events
planetButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        showPlanet(button.dataset.planet);

    });

});


// Next planet button
const nextPlanetButton = document.getElementById("next-planet");

const planetOrderKeys = Object.keys(planetsData);

nextPlanetButton.addEventListener("click", function () {

    const currentIndex = planetOrderKeys.indexOf(selectedPlanet);

    const nextIndex = (currentIndex + 1) % planetOrderKeys.length;

    showPlanet(planetOrderKeys[nextIndex]);

});


// Orbit speed controls
const slowButton = document.getElementById("speed-slow");

const normalButton = document.getElementById("speed-normal");

const fastButton = document.getElementById("speed-fast");

const speedButtons = [
    slowButton,
    normalButton,
    fastButton
];

function setOrbitSpeed(speed) {

    solarStage.classList.remove("speed-slow", "speed-fast");

    if (speed === "slow") {
        solarStage.classList.add("speed-slow");
    }

    if (speed === "fast") {
        solarStage.classList.add("speed-fast");
    }

    speedButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    if (speed === "slow") {
        slowButton.classList.add("active");
    } else if (speed === "fast") {
        fastButton.classList.add("active");
    } else {
        normalButton.classList.add("active");
    }

}

slowButton.addEventListener("click", function () {
    setOrbitSpeed("slow");
});

normalButton.addEventListener("click", function () {
    setOrbitSpeed("normal");
});

fastButton.addEventListener("click", function () {
    setOrbitSpeed("fast");
});


// Update the selected planet when language changes
const originalSetLanguage = setLanguage;

setLanguage = function (language) {

    originalSetLanguage(language);

    if (typeof selectedPlanet !== "undefined") {
        showPlanet(selectedPlanet);
    }

};


// Initialize the explorer
showPlanet("earth");

console.log("Solar System Explorer is ready!");