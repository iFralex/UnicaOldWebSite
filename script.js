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




var swiperRoadmap = new Swiper('.swiper-roadmap', {
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
let date = [new Date("April 30, 2023 23:59:59"), new Date("May 31, 2023 23:59:59"), new Date("Jul 15, 2023 23:59:59"), new Date("Jul 25, 2023 23:59:59"), new Date("Jul 30, 2023 23:59:59"), new Date("Jul 31, 2023 23:59:59")]
let _d = 5
for (let i = 0; i < date.length; i++)
    if (Date.now() < date[i].getTime()) {
        _d = i
        break
    }
swiperRoadmap.slideTo(_d)

// Imposta la data di scadenza
let deadline = date[swiperRoadmap.activeIndex];

// Funzione per calcolare il tempo rimanente
function getTimeRemaining() {
    let deadline = date[swiperRoadmap.activeIndex];
    let now = new Date().getTime();
    let distance = deadline - now;
    if (distance < 0)
        distance = 0
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
*/
let importiDona = [10, 20, 35, 50, 75, 100, 150, 200]
let commissioniT = ["Commissioni carta &#40;1,5%+0,25&#41;:", "Commissioni PayPal &#40;3,45%+0,35&#41;:", "Commissioni bonifico &#40;0&#41;:"]
let payNSel = document.getElementById("pay-n-sel")
let payTCom = document.getElementById("pay-t-com")
let payNCom = document.getElementById("pay-n-com")
let payNTot = document.getElementById("pay-n-tot")
let payMet = "bonifico"

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

            UpdatePaymentData(currentIndex, payMet)
        }
    }
});

let donaBts = document.querySelectorAll('.big-button button');

for (var i = 0; i < donaBts.length; i++) {
    donaBts[i].addEventListener('click', function(e) {
        var buttonIndex = e.target.id.split('-')[1];
        swiperDona.slideTo(buttonIndex - 1);

        var buttons = document.querySelectorAll('.big-button button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('btn-dona-sel');
        }

        e.target.classList.add('btn-dona-sel');
    });
}


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
    document.getElementById("contact-btn-a"),
    document.getElementById("contact-btn-g"),
    document.getElementById("scopri-btn-dod"),
    document.getElementById("scopri-btn-e"),
    document.getElementById("scopri-btn-pc-l"),
    document.getElementById("scopri-btn-pc-s"),
    document.getElementById("scopri-btn-med"),
    document.getElementById("ordina-btn")
]
const modals = [
    document.getElementById("contact-modal-a"),
    document.getElementById("contact-modal-g"),
    document.getElementById("scopri-modal-dod"),
    document.getElementById("scopri-modal-e"),
    document.getElementById("scopri-modal-pc"),
    document.getElementById("scopri-modal-pc"),
    document.getElementById("scopri-modal-med"),
    document.getElementById("ordina-modal")
]
const closeBtns = [
    document.getElementById("close-btn-a"),
    document.getElementById("close-btn-g"),
    document.getElementById("close-btn-dod"),
    document.getElementById("close-btn-e"),
    document.getElementById("close-btn-pc"),
    document.getElementById("close-btn-pc"),
    document.getElementById("close-btn-med"),
    document.getElementById("close-btn-ordina")
]
let menu = document.getElementById("navbar-header")

for (let i = 0; i < apriBtns.length; i++) {
    apriBtns[i].addEventListener("click", (function(i) {
        return function() {
            menu.classList.add("d-none")
            modals[i].style.display = "block";
            document.body.style.overflowY = "hidden";
        };
    })(i));

    closeBtns[i].addEventListener("click", (function(i) {
        return function() {
            menu.classList.remove("d-none")
            modals[i].style.display = "none";
            document.body.style.overflowY = "scroll";
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


var elements = document.querySelectorAll("h1, h2, h3, h4, h5, p, span, button, a, li");
var decreasePercentage = 0.2;

for (var i = 0; i < elements.length; i++) {
    elements[i].style.lineHeight = parseFloat(window.getComputedStyle(elements[i]).getPropertyValue("line-height")) * 1.5 + "px";
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


document.getElementById("btndona-3").click()

var currentURL = window.location.href;

// Check if the URL contains a specific query string
if (currentURL.indexOf("p=kr") != -1)
    document.getElementById("scopri-btn-dod").click()
else if (currentURL.indexOf("p=se") != -1)
    document.getElementById("scopri-btn-e").click()
if (currentURL.indexOf("p=sk") != -1)
    document.getElementById("scopri-btn-pc-l").click()
else if (currentURL.indexOf("p=sw") != -1)
    document.getElementById("scopri-btn-med").click()



let metodi = document.querySelectorAll('input[name="pay"]');
let metodiSec = [document.getElementById("pay-carta"), document.getElementById("pay-paypal"), document.getElementById("pay-bonifico")]

for (let i = 0; i < metodi.length; i++) {
    metodi[i].addEventListener("click", (function(i) {
        return function() {
            for (let o = 0; o < metodiSec.length; o++) {
                if (i != o)
                    metodiSec[o].classList.add("d-none")
                else
                    metodiSec[o].classList.remove("d-none")
            };
            payMet = metodi[i].value
            UpdatePaymentData(swiperDona.activeIndex, payMet)
        }
    })(i))
    if (metodi[i].checked) {
        payMet = metodi[i].value
        UpdatePaymentData(swiperDona.activeIndex, payMet)
    }
}
metodi[2].click()

let payMails = [document.getElementById("pay-mail1"), document.getElementById("pay-mail2")]
let payPP = document.getElementById("pay-pp")
document.getElementById("paga-btn").addEventListener("click", function() {
    let payBlocca = false
    if (!(payMails[0].value === payMails[1].value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(payMails[0].value))) {
        payBlocca = true
        document.getElementById("err-pay-mail").classList.add("d-flex")
    } else
        document.getElementById("err-pay-mail").classList.remove("d-flex")
    if (payPP.checked)
        document.getElementById("err-pay-pp").classList.remove("d-flex")
    else {
        payBlocca = true
        document.getElementById("err-pay-pp").classList.add("d-flex")
    }
    if (payBlocca)
        return
})

function UpdatePaymentData(_donaIndex, _payMet) {
    payNSel.innerHTML = "€ " + importiDona[_donaIndex].toFixed(2).replace(".", ",")
    let s = 2
    if (_payMet == "carta") s = 0
    if (_payMet == "paypal") s = 1
    payTCom.innerHTML = commissioniT[s]
    let com = (s == 0 ? importiDona[_donaIndex] * 0.0125 + 0.25 : (s == 1 ? importiDona[_donaIndex] * 0.0345 + 0.34 : 0))
    payNCom.innerHTML = ("€ " + com.toFixed(2)).replace(".", ",")
    payNTot.innerHTML = ("€ " + (com + importiDona[_donaIndex]).toFixed(2)).replace(".", ",")
}

console.log("ciao")