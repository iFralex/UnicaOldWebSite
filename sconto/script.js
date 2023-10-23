import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, child, get, set, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
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


function MostraErrore(err) {
    document.getElementById("spin-ord-es").style.display = "none"
    document.getElementById("ord-err").classList.remove("d-none")
    document.getElementById("ord-err-code").innerHTML = err
    document.getElementById("ord-err-t").classList.remove("d-none")
}

function parseUrl(url) {
    const risultati = {};

    const idInizio = url.indexOf("id=");
    const keyInizio = url.indexOf("key=");
    const mInizio = url.indexOf("m=");
    const dInizio = url.indexOf("di=");

    if (idInizio < 0 || keyInizio < 0 || mInizio < 0 || dInizio < 0) {
        return false;
    }

    let indiceInizio = idInizio + 3;
    let indiceFine = url.indexOf(";", indiceInizio);
    if (indiceFine === -1) {
        indiceFine = url.length;
    }
    risultati.orderId = url.substring(indiceInizio, indiceFine);

    indiceInizio = keyInizio + 4;
    indiceFine = url.indexOf(";", indiceInizio);
    if (indiceFine === -1) {
        indiceFine = url.length;
    }
    risultati.questionKey = url.substring(indiceInizio, indiceFine);

    indiceInizio = mInizio + 2;
    indiceFine = url.indexOf(";", indiceInizio);
    if (indiceFine === -1) {
        indiceFine = url.length;
    }
    risultati.materia = url.substring(indiceInizio, indiceFine);
    switch (risultati.materia) {
        case "1":
            risultati.materia = "Matematica"
            break
        case "2":
            risultati.materia = "Fisica"
            break
        case "3":
            risultati.materia = "Scienze"
            break
    }

    indiceInizio = dInizio + 3;
    indiceFine = url.indexOf(";", indiceInizio);
    if (indiceFine === -1) {
        indiceFine = url.length;
    }
    risultati.difficoltà = url.substring(indiceInizio, indiceFine);
    switch (risultati.difficoltà) {
        case "1":
            risultati.difficoltà = "Facile"
            break
        case "2":
            risultati.difficoltà = "Pro"
            break
        case "3":
            risultati.difficoltà = "Genio"
            break
    }

    return risultati;
}

const dati = parseUrl(window.location.href);
console.log(dati)
let keyQ = -2

if (dati === false) {
    document.getElementById("ord-err").classList.remove("d-none")
    document.getElementById("spin-ord-es").classList.add("d-none")
    console.log("no")
} else {
    const dbRef = ref(getDatabase(app))
    get(child(dbRef, "ordini-ids/" + dati.orderId)).then(snapshot => {
        if (snapshot.exists())
            if (snapshot.child("key-q").val() <= 0 && snapshot.child("key-q").val() != -2)
                get(child(dbRef, "question-keys/" + dati.materia + "/" + dati.difficoltà + "/" + dati.questionKey)).then(snapQuest => {
                    let vai = false
                    if (snapQuest.exists())
                        if (snapQuest.hasChild("order-id"))
                            if (snapQuest.child("order-id").val() == dati.orderId)
                                vai = true
                    console.log(snapQuest, dati.orderId)
                    if (vai) {
                        let question = snapQuest.toJSON()
                        question.materia = dati.materia
                        question.difficoltà = dati.difficoltà
                        let data = new Date()
                        question.data = data.toISOString()
                        set(child(dbRef, "completed-question-keys/" + dati.questionKey), question).then(snapQuestComp => {
                            set(child(dbRef, "ordini-ids/" + dati.orderId + "/key-q"), dati.questionKey).then(snapOrdId => {
                                remove(snapQuest.ref).then(snap => {
                                    document.getElementById("ord-es").classList.add("d-none")
                                    console.log(question)

                                    document.getElementById("titolo-q").innerHTML = question.title
                                    document.getElementById("desc-q").innerHTML = question.text
                                    if (question.img != null) {
                                        document.getElementById("img-q").src = question.img
                                        document.getElementById("img-p-q").classList.remove("d-none")
                                    }

                                    let progress = document.getElementById('progress');
                                    let timer = document.querySelector('.timer-text');
                                    let timeLimit = parseInt(question.time);
                                    let timePassed = 0;
                                    let timeLeft = timeLimit;
                                    updateTimer(timeLeft);
                                    var interval = setInterval(function() {
                                        timePassed += 1;
                                        timeLeft = timeLimit - timePassed;
                                        updateTimer(timeLeft);

                                        progress.style.strokeDashoffset = timePassed * 283 / timeLimit
                                        if (timePassed > timeLimit / 3 * 2) {
                                            progress.style.stroke = "#fb0"
                                            if (timePassed > timeLimit / 6 * 5)
                                                progress.style.stroke = "red"
                                        }
                                        if (timeLeft == 0) {
                                            clearInterval(interval);
                                            document.getElementById("navbar-header").classList.add("fixed-top")
                                            document.getElementById("problema").classList.add("d-none")
                                            document.getElementById("scaduto").classList.remove("d-none")
                                            set(child(dbRef, "completed-question-keys/" + dati.questionKey + "/completato-in"), Math.floor(new Date() - data / 1000))
                                        }
                                    }, 1000);

                                    function updateTimer(time) {
                                        var minutes = Math.floor(time / 60);
                                        var seconds = time - minutes * 60;
                                        if (seconds < 10) {
                                            seconds = '0' + seconds;
                                        }
                                        timer.textContent = minutes + ':' + seconds;
                                    }

                                    let inviaBt = document.getElementById("invia-bt")
                                    let risposta = document.getElementById("risposta-input")
                                    let codiceInput = document.getElementById("codice-sconto")
                                    risposta.addEventListener("input", () => inviaBt.disabled = risposta.value == "")
                                    inviaBt.addEventListener("click", () => {
                                        risposta = risposta.value
                                        if (risposta == "") {
                                            inviaBt.disabled = true
                                            return
                                        }
                                        set(child(dbRef, "completed-question-keys/" + dati.questionKey + "/completato-in"), Math.floor(new Date() - data / 1000))
                                        document.getElementById("navbar-header").classList.add("fixed-top")
                                        document.getElementById("problema").classList.add("d-none")
                                        if (risposta == question.answer) {
                                            document.getElementById("esatto").classList.remove("d-none")
                                            let codice = ""
                                            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                                            for (let i = 0; i < 12; i++) {
                                                if (i % 4 == 0 && i != 0)
                                                    codice += "-"
                                                codice += characters.charAt(Math.floor(Math.random() * characters.length));
                                            }
                                            codiceInput.value = codice
                                            set(child(dbRef, "ordini-ids/" + dati.orderId + "/codice-sconto"), codice)
                                        } else
                                            document.getElementById("errore").classList.remove("d-none")
                                    })
                                    document.getElementById("copia-bt").addEventListener("click", () => {
                                        codiceInput.select();
                                        codiceInput.setSelectionRange(0, 99999);
                                        document.execCommand("copy");
                                    })
                                }).catch(err => MostraErrore(err));
                            }).catch(err => MostraErrore(err));
                        }).catch(err => MostraErrore(err));
                    }
                }).catch(err => MostraErrore(err));
    }).catch(err => MostraErrore(err));
}



document.getElementById("contatti-bt").addEventListener("click", () => {
    document.getElementById("contatti-modal").style.display = "block"
})

document.getElementById("close-contatti-bt").addEventListener("click", () => {
    document.getElementById("contatti-modal").style.display = "none";
})

window.addEventListener("click", event => {
    if (event.target === document.getElementById("contatti-modal"))
        document.getElementById("close-contatti-bt").click();
})




var elements = document.querySelectorAll("h1, h2, h3, h4, h5, p, span, button, a, li");

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