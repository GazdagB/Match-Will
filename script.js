//MY OWN FUNCTIONS 
let timeLeft2 = 39;
let timer = document.getElementById("timer"); 


let getElement = function(id){//Selects an element by id
    return document.getElementById(id); 
}; 
let selectQuery = function(clas){//Selects an element by clas (only 1)
    return document.querySelector(`.${clas}`); 
};

let count30 = function(){
    if(timeLeft2 < 0){
        //CLEARINTERVAL
        clearInterval(intervalId2)
        //LOSE THE GAME 

        //MODAL --> ÚJRA JÁTSZÁS STB 
        

    }else{
        timer.innerHTML=`<h4>Hátralévő idő: ${timeLeft2}</h4>`
        timeLeft2--    
    }
   
}

let count3 = function(){
    timerEl.innerHTML= `<h2 style='font-size: 16rem;'>${timeLeft}</h2>`
    timeLeft--

    if(timeLeft < 0){
        clearInterval(intervalId);
        timerEl.innerHTML = "<h2 style='font-size: 6rem;'>Indul!</h2>"; // Add "Indul!" message
      
        setTimeout(()=>{
            timerEl.style.display = "none"
            document.querySelector(".cards").classList.remove("hidden"); 
            timer.innerHTML=`<h4>Hátralévő idő: 40</h4>`
            if(timeLeft2 >=0){
                let intervalId2 = setInterval(count30,1000); 
            }
            
},1000)

    }
    
}

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

let btnNewGame = selectQuery("btn-new-game"); 


selectQuery("cupon-code").addEventListener("click", ()=>{
    copyText(document.getElementById("sale"))
    selectQuery("copy").classList.remove("fa-solid","fa-copy")
    selectQuery("copy").classList.add("fa-sharp","fa-solid", "fa-check")
    setTimeout(()=>{
        selectQuery("copy").classList.remove("fa-sharp","fa-solid", "fa-check")
        selectQuery("copy").classList.add("fa-solid","fa-copy")
    },2000)
    console.log(`click${clickCount}`);
    
})

const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timeLeft = 2; 
let wrapper = selectQuery("wrapper");  
let btnLaunch = selectQuery("btn-game"); 
let modal1 = getElement("modal1"); 
let timerEl = document.querySelector(".timer-three")


btnLaunch.addEventListener("click", ()=>{
    modal1.classList.add("hidden"); 
    wrapper.style.display = null; 
    document.querySelector(".cards").classList.add("hidden"); 
    timerEl.style.display = null; 

    if(timeLeft >=0){
       intervalId = setInterval(count3, 1000);
    }
    
}); 




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

btnNewGame.addEventListener("click", function(){
    getElement("modal-win").classList.add("hidden"); 
    timer.innerHTML=`<h4>Hátralévő idő: 45</h4>`
    timeLeft2 = 44; 
    shuffleCard();
})