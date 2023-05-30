
document.addEventListener("DOMContentLoaded", function() {


//SELECT ID 
let getElement = function(id){//Selects an element by id
    return document.getElementById(id); 
}; 
//SELECT CLASS
let selectQuery = function(clas){//Selects an element by clas (only 1)
    return document.querySelector(`.${clas}`); 
};



//VARIABLE DECLARATIONS
    //TIMERS 
    let gameTimeLeft = 1;
    let timer = document.getElementById("timer"); 
    let btnNewGame = selectQuery("btn-new-game"); 
    let cuponCode = selectQuery("cupon-code");
    const cards = document.querySelectorAll(".card");
    let matched = 0;
    let cardOne, cardTwo;
    let disableDeck = false;
    let timeLeft = 2; 
    let wrapper = selectQuery("wrapper");  
    let modalLose = getElement("modal-lose"); 
    let btnLaunch = selectQuery("btn-game"); 
    let modal1 = getElement("modal1");     
    let timerEl = document.querySelector(".timer-three")
    let btnLostNew = selectQuery("btn-new-game-lose");
    let intervalId,intervalId2; 
    let timerOver = false;
    
 
    
//TIMER 30SEC 



let copyText = function(htmlElement){
    if(!htmlElement){
        return; 
    }

    let elementText = htmlElement.innerText;
    let inputElement = document.createElement('input');
    inputElement.setAttribute('value', elementText); 
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    inputElement.parentNode.removeChild(inputElement); 

}



cuponCode.addEventListener("click", ()=>{
    copyText(document.getElementById("sale"))
    selectQuery("copy").classList.remove("fa-solid","fa-copy")
    selectQuery("copy").classList.add("fa-sharp","fa-solid", "fa-check")
    setTimeout(()=>{
        selectQuery("copy").classList.remove("fa-sharp","fa-solid", "fa-check")
        selectQuery("copy").classList.add("fa-solid","fa-copy")
    },2000)
})







let modals = document.querySelectorAll(".modal")


let gameInit = function() {
    shuffleCard();
    timeLeft = 2; 
    gameTimeLeft = 45;
    timerEl.innerHTML = "<h3>3</h3>"
    modals.forEach(elem => {
        elem.classList.add("hidden");
    }); 

    wrapper.style.display = null; 

    document.querySelector(".cards").classList.add("hidden"); 

    timerEl.style.display = null; 

    let interval1 = setInterval(() => {
        if (timeLeft > 0) {
            timerEl.innerHTML = `<h3>${timeLeft}</h3>`;
            timeLeft--;
        } else {
            clearInterval(interval1);
            timerEl.innerHTML = "<h3>Indul!</h3>";
            timerOver = true; 
            setTimeout(() => {
                timerEl.style.display = "none"; 
                document.querySelector(".cards").classList.remove("hidden");
                let interval2 = setInterval(() => {
                    if (gameTimeLeft >= 0) {
                        // Végrehajtandó kód a játék közbeni visszaszámláláshoz

                        timer.innerHTML = `<h4>A hátralévó idő: ${gameTimeLeft}</h4>`
                        gameTimeLeft--;
                    } else {
                        
                        
                        clearInterval(interval2);
                        modalLose.classList.remove("hidden"); 
                        timer.innerText= "" ;
                        // Végrehajtandó kód, amikor lejár a játék időtartama
                    }
                }, 1000);
            }, 1000);
        }
    }, 1000);
};

btnLaunch.addEventListener("click", gameInit); 


btnLostNew.addEventListener("click",gameInit);

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return document.getElementById("modal-win").classList.remove("hidden"); 
            }, 1000);
            
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1100);
}
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}
shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


btnNewGame.addEventListener("click",gameInit)

});