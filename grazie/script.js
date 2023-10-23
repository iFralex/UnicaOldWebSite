import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, child, get, set, query, limitToFirst } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",
    authDomain: "unica-3d18c.firebaseapp.com",
    projectId: "unica-3d18c",
    databaseURL: "https://unica-3d18c-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "unica-3d18c.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Esempio di utilizzo
let orderId = window.location.href.split("oId=");
let keyQ = -2
if (orderId.length <= 1) {
    document.getElementById("ord-err").classList.remove("d-none")
    document.getElementById("spin-ord-es").classList.add("d-none")
    console.log("no")
} else {
    orderId = orderId[1]
    console.log(orderId)
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, "ordini-ids/" + orderId)).then(snapshot => {
        if (snapshot.exists()) {
            let mat = snapshot.child("mat").val()
            keyQ = snapshot.child("key-q").val()
            console.log(mat)
            document.getElementById("ord-es").classList.add("d-none")
            if ([0, 1, 2].includes(mat)) {
                document.getElementById("titolo-prod").innerHTML = "Orecchino E!"
                Array.from(document.getElementsByClassName("sign-desc")).forEach(element => {
                    element.innerHTML = "Il gioiello che hai scelto rappresenta molto di più che semplice estetica. Esso simboleggia la tua personalità unica, la tua storia e i tuoi valori. Ogni dettaglio, dalla forma alla pietra preziosa, ha un significato speciale per te.<br><br>Inoltre, indossare questo gioiello ti ricorda costantemente i momenti felici e significativi della tua vita.Potrebbe essere un regalo da parte di una persona amata, un ricordo di un viaggio indimenticabile o un simbolo della tua fede.Indossarlo ti fa sentire connessa ai tuoi cari e alle cose che ami di più.Il significato del tuo gioiello va oltre la semplice bellezza estetica e rappresenta una parte importante della tua vita e della tua storia personale."
                });
            }
            if ([3, 4].includes(mat)) {
                document.getElementById("titolo-prod").innerHTML = "Orecchino Dod"
                Array.from(document.getElementsByClassName("sign-desc")).forEach(element => {
                    element.innerHTML = "Il gioiello che hai scelto rappresenta molto di più che semplice estetica. Esso simboleggia la tua personalità unica, la tua storia e i tuoi valori. Ogni dettaglio, dalla forma alla pietra preziosa, ha un significato speciale per te.<br><br>Inoltre, indossare questo gioiello ti ricorda costantemente i momenti felici e significativi della tua vita.Potrebbe essere un regalo da parte di una persona amata, un ricordo di un viaggio indimenticabile o un simbolo della tua fede.Indossarlo ti fa sentire connessa ai tuoi cari e alle cose che ami di più.Il significato del tuo gioiello va oltre la semplice bellezza estetica e rappresenta una parte importante della tua vita e della tua storia personale."
                });
            }
            if (mat == 5) {
                document.getElementById("titolo-prod").innerHTML = "Portachiavi E!"
                Array.from(document.getElementsByClassName("sign-desc")).forEach(element => {
                    element.innerHTML = "Il gioiello che hai scelto rappresenta molto di più che semplice estetica. Esso simboleggia la tua personalità unica, la tua storia e i tuoi valori. Ogni dettaglio, dalla forma alla pietra preziosa, ha un significato speciale per te.<br><br>Inoltre, indossare questo gioiello ti ricorda costantemente i momenti felici e significativi della tua vita.Potrebbe essere un regalo da parte di una persona amata, un ricordo di un viaggio indimenticabile o un simbolo della tua fede.Indossarlo ti fa sentire connessa ai tuoi cari e alle cose che ami di più.Il significato del tuo gioiello va oltre la semplice bellezza estetica e rappresenta una parte importante della tua vita e della tua storia personale."
                });
                document.getElementById("img-prod").src = "../images/2 pc E!.png"
            }
            if (mat == 6) {
                document.getElementById("titolo-prod").innerHTML = "Medaglietta E!"
                Array.from(document.getElementsByClassName("sign-desc")).forEach(element => {
                    element.innerHTML = "Il gioiello che hai scelto rappresenta molto di più che semplice estetica. Esso simboleggia la tua personalità unica, la tua storia e i tuoi valori. Ogni dettaglio, dalla forma alla pietra preziosa, ha un significato speciale per te.<br><br>Inoltre, indossare questo gioiello ti ricorda costantemente i momenti felici e significativi della tua vita.Potrebbe essere un regalo da parte di una persona amata, un ricordo di un viaggio indimenticabile o un simbolo della tua fede.Indossarlo ti fa sentire connessa ai tuoi cari e alle cose che ami di più.Il significato del tuo gioiello va oltre la semplice bellezza estetica e rappresenta una parte importante della tua vita e della tua storia personale."
                });
                document.getElementById("img-prod").src = "../images/2 med E!.png"
            }
            if ([0, 3].includes(mat))
                document.getElementsByClassName("cover-orecchino-spec")[0].style.backgroundImage = 'url("https://wallpaperaccess.com/full/755113.jpg")'
            if ([1, 4].includes(mat))
                document.getElementsByClassName("cover-orecchino-spec")[0].style.backgroundImage = 'url("https://img.freepik.com/premium-photo/shiny-yellow-leaf-gold-foil-texture_38679-1070.jpg?w=360")'
            if ([2, 5, 6].includes(mat))
                document.getElementsByClassName("cover-orecchino-spec")[0].style.backgroundImage = 'url("https://img.freepik.com/premium-photo/fluid-colors-wallpaper-bright-colorful-shapes-overlapmarbling-marble-texture-artistic-abstract_196290-3691.jpg")'
            if (mat == 0)
                document.getElementById("img-prod").src = "../images/2 E! arg.png"
            if (mat == 1)
                document.getElementById("img-prod").src = "../images/2 E! oro.png"
            if (mat == 2)
                document.getElementById("img-prod").src = "../images/2 E! smalto.png"
            if (mat == 3)
                document.getElementById("img-prod").src = "../images/2 dod arg.png"
            if (mat == 4)
                document.getElementById("img-prod").src = "../images/2 dod oro.png"
            document.getElementById("gioca-bt").addEventListener("click", () => {
                if (keyQ <= 0 && keyQ != -2) {
                    document.getElementById("ord-es").classList.remove("d-none")
                    document.getElementById("ord-es").style.backgroundColor = "#8888"
                    console.log("question-keys/" + (materia == 1 ? "Matematica" : materia == 2 ? "Fisica" : materia == 3 ? "Scienze" : "") + "/" + (difficoltà == 1 ? "Facile" : difficoltà == 2 ? "Pro" : difficoltà == 3 ? "Genio" : ""))
                    let _r = child(dbRef, "question-keys/" + (materia == 1 ? "Matematica" : materia == 2 ? "Fisica" : materia == 3 ? "Scienze" : "") + "/" + (difficoltà == 1 ? "Facile" : difficoltà == 2 ? "Pro" : difficoltà == 3 ? "Genio" : ""))
                    let _q = query(_r, limitToFirst(1))
                    console.log(_q)
                    get(_q).then(snap => {
                        console.log(dbRef)
                        snap.forEach(_snap => {
                            console.log(_snap, dbRef)
                            set(child(_snap.ref, "order-id"), orderId).then(_s => {
                                window.location.href = "../sconto/ragiona-e-risparmia.html?id=" + orderId + ";key=" + _snap.key + ";m=" + materia + ";di=" + difficoltà;
                                document.getElementById("ord-es").classList.add("d-none")
                                return
                            })
                        })
                    })
                }
            })
        } else {
            document.getElementById("spin-ord-es").classList.add("d-none")
            document.getElementById("ord-nes").classList.remove("d-none")
        }
    }).catch(function(error) {
        document.getElementById("spin-ord-es").style.display = "none"
        document.getElementById("ord-err").classList.remove("d-none")
        document.getElementById("ord-err-code").innerHTML = error
        document.getElementById("ord-err-t").classList.remove("d-none")
    });
}



/*
let testRef = database.ref("ordini-id");

// Leggi i dati dalla voce "test"
testRef.once("value")
    .then(function(snapshot) {
        var testValue = mat;
        console.log(testValue);
    });
*/
let difficoltà, materia

document.getElementById("materia-mat").addEventListener("click", () => materia = 1)
document.getElementById("materia-fis").addEventListener("click", () => materia = 2)
document.getElementById("materia-sci").addEventListener("click", () => materia = 3)

document.getElementById("gioca-1-warn-bt").addEventListener("click", () => {
    difficoltà = 1
    document.getElementById("gioca-warn-modal").style.display = "block"
})
document.getElementById("gioca-2-warn-bt").addEventListener("click", () => {
    difficoltà = 2
    document.getElementById("gioca-warn-modal").style.display = "block"
})
document.getElementById("gioca-3-warn-bt").addEventListener("click", () => {
    difficoltà = 3
    document.getElementById("gioca-warn-modal").style.display = "block"
})

document.getElementById("close-warn-bt").addEventListener("click", () => {
    document.getElementById("gioca-warn-modal").style.display = "none";
    document.getElementById("gioca-check").checked = false
    document.getElementById("gioca-check").dispatchEvent(new Event("change"));
})

window.addEventListener("click", event => {
    if (event.target === document.getElementById("gioca-warn-modal"))
        document.getElementById("close-warn-bt").click();
})

document.getElementById("gioca-bt").addEventListener("click", () => {
    document.getElementById("gioca-check").checked = false
    document.getElementById("gioca-check").dispatchEvent(new Event("change"));
    console.log(difficoltà, materia)
    if (keyQ > 0)
        document.getElementById("probl-comp").style.display = "flex"
})


document.getElementById("contatti-bt-1").addEventListener("click", () => {
    document.getElementById("contatti-modal").style.display = "block"
})
document.getElementById("contatti-bt-2").addEventListener("click", () => {
    document.getElementById("contatti-modal").style.display = "block"
})

document.getElementById("close-contatti-bt").addEventListener("click", () => {
    document.getElementById("contatti-modal").style.display = "none";
})

window.addEventListener("click", event => {
    if (event.target === document.getElementById("contatti-modal"))
        document.getElementById("close-contatti-bt").click();
})

/*
var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 0,
    touchRatio: 0.7,
    on: {
        slideChange: function() {

            setTimeout(function() {
                window.dispatchEvent(new Event('scroll'));
            }, 400);

        }
    },
    navigation: {
        nextEl: '.swiper-btn-next-tl',
        prevEl: '.swiper-btn-prev-tl',
    },
});

var swiperDod = document.querySelectorAll('.swiper-container-dod');

for (var i = 0; i < swiperDod.length; i++) {
    (function(i) {
        var swiper = new Swiper(swiperDod[i], {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            on: {
                slideChange: function() {
                    var currentIndex = this.activeIndex;
                    var buttons = this.el.nextElementSibling.children;
                    for (var j = 0; j < buttons.length; j++) {
                        buttons[j].classList.remove('selected');
                    }
                    buttons[currentIndex].classList.add('selected');
                }
            }
        });

        // Listen for clicks on the dots
        var dotsContainer = swiperDod[i].nextElementSibling;

        dotsContainer.addEventListener('click', function(event) {
            console.log(event.target.classList.contains("slider-btn"))
            if (event.target.classList.contains("slider-btn")) {
                console.log("vero")
                var dotIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
                swiper.slideTo(dotIndex);
            }
        });
    })(i);
}

var swiperRev = new Swiper('.swiper-container-reviews', {
    navigation: {
        nextEl: '.swiper-btn-next-rev',
        prevEl: '.swiper-btn-prev-rev',
    },
    slidesPerView: calculateSlidesPerView(),
});

function calculateSlidesPerView() {
    var windowWidth = window.innerWidth;
    var slideWidth = 350; // larghezza minima delle slide
    return Math.floor(windowWidth / slideWidth);
}

window.addEventListener('resize', function() {
    swiperRev.params.slidesPerView = calculateSlidesPerView();
    swiperRev.update();
});




// Imposta la data di scadenza
let deadline = new Date("March 01, 2023 00:00:00");

// Funzione per calcolare il tempo rimanente
function getTimeRemaining() {
    let now = new Date().getTime();
    let distance = deadline - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

// Funzione per aggiornare il timer
function updateTimer() {
    let time = getTimeRemaining();
    document.getElementById("days").innerHTML = (time.days < 10 ? "0" : "") + time.days;
    document.getElementById("hours").innerHTML = (time.hours < 10 ? "0" : "") + time.hours;
    document.getElementById("minutes").innerHTML = (time.minutes < 10 ? "0" : "") + time.minutes;
    document.getElementById("seconds").innerHTML = (time.seconds < 10 ? "0" : "") + time.seconds;
}

// Aggiorna il timer ogni minuto
setInterval(updateTimer, 1000);
updateTimer();



// Aggiungiamo gli eventi di click ai bottoni
/*var donaBtns = document.querySelectorAll("[id^='btn-dona']");
for (var i = 0; i < donaBtns.length; i++) {
    (function(index) {
        donaBtns[index].addEventListener("click", function() {
            let _sez = document.getElementById(donaBtns[index].id.substring(4))
            nascondiTutteLeSchede();
            _sez.classList.remove("d-none");
            rimuoviClasseSelezionata()
            donaBtns[index].classList.add("btn-dona-sel");
        });
    })(i);
}

function rimuoviClasseSelezionata() {
    for (var i = 0; i < donaBtns.length; i++) {
        if (donaBtns[i].classList.contains("btn-dona-sel")) {
            donaBtns[i].classList.remove("btn-dona-sel");
        }
    }
}

// Creiamo una funzione che nasconde tutti i contenuti delle schede
function nascondiTutteLeSchede() {
    for (let i = 0; i < donaBtns.length; i++) {
        console.log(donaBtns.length)
        document.getElementById(donaBtns[i].id.substring(4)).classList.add("d-none");
    }
}

donaBtns[2].click();

var swiperDona = new Swiper('.swiper-container-dona', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 0,
    touchRatio: 0.7,
    on: {
        slideChange: function() {
            let currentIndex = this.activeIndex;
            let currentButton = document.querySelector('.big-button button:nth-child(' + (currentIndex + 1) + ')');

            let donaBts = document.querySelectorAll('.big-button button');
            for (var i = 0; i < donaBts.length; i++) {
                donaBts[i].classList.remove("btn-dona-sel");
            }

            currentButton.classList.add("btn-dona-sel");

            var currentSlide = document.querySelector('.swiper-slide:nth-child(' + (currentIndex + 1) + ') div');
            var currentSlideHeight = currentSlide.offsetHeight;

            var swiperContainer = document.querySelector('.swiper-container-dona');
            swiperContainer.style.height = currentSlideHeight + 'px';
            console.log(currentSlideHeight + 'px')
            setTimeout(function() {
                window.dispatchEvent(new Event('scroll'));
            }, 400);

        }
    }
});
*/
let materiaBts = document.querySelectorAll('.big-button button');

for (var i = 0; i < materiaBts.length; i++) {
    materiaBts[i].addEventListener('click', function(e) {


        for (var i = 0; i < materiaBts.length; i++) {
            materiaBts[i].classList.remove('btn-dona-sel');
            if (e.target == materiaBts[i])
                materia = i + 1;
        }

        e.target.classList.add('btn-dona-sel');
    });
}

/*
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('active');
    });
});


let fixedBg = document.getElementsByClassName("fixed-bg")
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    fixedBg[0].style.backgroundAttachment = "scroll"



function copyLink(id, _iconId) {
    document.getElementById(id).select();
    document.execCommand("copy");
    _icon = document.getElementById(_iconId)
    _icon.classList.remove("fa-copy")
    _icon.classList.add("fa-check")
}


// Definire la destinazione della navigazione (in questo caso, un elemento con id "section-two")
var kickStarterSection = document.getElementById("scegli-dona");

// Definire il pulsante
var ordinaOraBtns = document.getElementsByClassName("ordina-ora-btn");

for (let i = 0; i < ordinaOraBtns.length; i++)
    ordinaOraBtns[i].addEventListener("click", function() {
        // Scorrere verso la destinazione
        kickStarterSection.scrollIntoView({ behavior: "smooth" });
    });


const apriBtns = [
    //document.getElementById("gioca-warn-btn")
]
const modals = [
    //document.getElementById("gioca-warn-modal")
]
const closeBtns = [
    //document.getElementById("close-btn-gioca-warn")
]

for (let i = 0; i < apriBtns.length; i++) {
    apriBtns[i].addEventListener("click", (function(i) {
        return function() {
            modals[i].style.display = "block";
            document.body.style.overflow = "hidden";
        };
    })(i));

    closeBtns[i].addEventListener("click", (function(i) {
        return function() {
            modals[i].style.display = "none";
            document.body.style.overflow = "scroll";
        };
    })(i));

    window.addEventListener("click", (function(i) {
        return function(event) {
            if (event.target === modals[i]) {
                closeBtns[i].click();
            }
        };
    })(i));
}


function getNestedElements() {
    let parentElements = document.getElementsByClassName("container-timeline");
    let nestedElements = [];

    for (let i = 0; i < parentElements.length; i++) {
        if (parentElements[i].classList.contains("w-50"))
            continue;
        let children = parentElements[i].getElementsByClassName("point-timeline");
        for (let o = 0; o < children.length; o++) {
            let figli = children[o].getElementsByClassName("number-timeline");
            if (figli.length > 0) {
                nestedElements.push({ "container": parentElements[i], "parent": children[o], "child": figli[0] });
            }
        }
    }
    return nestedElements;
}

let nestedElements = getNestedElements()

function PosizionaElementiTileline() {
    let parentDiv
    let childDiv
    let sliderDiv
    for (let i = 0; i < nestedElements.length; i++) {
        parentDiv = nestedElements[i].parent;
        childDiv = nestedElements[i].child;
        sliderDiv = nestedElements[i].container;

        // calcola i limiti del container
        let containerRect = sliderDiv.getBoundingClientRect();
        let containerLeft = containerRect.left;
        let containerRight = containerRect.right;
        let containerWidth = containerRect.width;

        // calcola i limiti del child
        let childRect = childDiv.getBoundingClientRect();
        let childWidth = childRect.width;

        // calcola la posizione attuale del parent
        let parentRect = parentDiv.getBoundingClientRect();
        let parentLeft = parentRect.left;
        let oltre
            // se il child esce dai limiti a destra
        if (parentLeft + childWidth / 2 + 3 > containerRight) {
            childDiv.style.right = 5 + "px";
            oltre = true
        }

        // se il child esce dai limiti a sinistra
        if (parentLeft - childWidth / 2 - 3 < containerLeft) {
            childDiv.style.left = 5 + "px";
            oltre = true
        }

        if (!oltre) {
            childDiv.style.position = "apsolute"
            childDiv.style.removeProperty("left")
            childDiv.style.removeProperty("right")
        } else
            childDiv.style.position = "fixed"
            // applica la posizione calcolata al child
    }
}

PosizionaElementiTileline()

*/
var elements = document.querySelectorAll("h1, h2, h3, h4, h5, p, span, button, a, li");
var decreasePercentage = 0.2;

for (var i = 0; i < elements.length; i++) {
    elements[i].style.fontSize = parseFloat(window.getComputedStyle(elements[i]).getPropertyValue("font-size")) * 0.7 + "px";
    elements[i].style.lineHeight = parseFloat(window.getComputedStyle(elements[i]).getPropertyValue("line-height")) * 1.43 + "px";
}




let transizioni = document.querySelectorAll('[class*="transizione"]');
let nomiClassiTrans = []
let mostrati = []

for (let o = 0; o < transizioni.length; o++) {
    let _nomi = []
    for (let i = 0; i < transizioni[o].classList.length; i++) {
        if (transizioni[o].classList[i].startsWith('transizione')) {
            _nomi.push(transizioni[o].classList[i])
            break;
        }
    }
    nomiClassiTrans.push(_nomi)
}

window.addEventListener('scroll', function() {
    for (let i = 0; i < transizioni.length; i++) {
        if (isElementInViewport(transizioni[i])) {
            transizioni[i].classList.add(nomiClassiTrans[i] + "-entra");
            mostrati.push(transizioni[i])
        } else if (mostrati.includes(transizioni[i])) {
            transizioni[i].classList.remove(nomiClassiTrans[i] + "-entra");
            mostrati.splice(mostrati.indexOf(transizioni[i]), 1)
        }
    }
});

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}


document.getElementById("materia-mat").click()

setTimeout(function() {
    window.dispatchEvent(new Event('scroll'));
}, 400);

/*
// Check if the URL contains a specific query string
if (currentURL.indexOf("p=dod") != -1)
    document.getElementById("scopri-btn-dod").click()
else if (currentURL.indexOf("p=e!") != -1)
    document.getElementById("scopri-btn-e").click()
if (currentURL.indexOf("p=pc") != -1)
    document.getElementById("scopri-btn-pc-l").click()
else if (currentURL.indexOf("p=med") != -1)
    document.getElementById("scopri-btn-med").click()*/