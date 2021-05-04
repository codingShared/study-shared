const SETTING_TIME = 5;
let words = [];
let time = 0;
let count = 0;
let isReady = false;
let isPlaying = false;
let score = 0;
let timeInterval;
let randomIndex; 
let level;
const url = "http://random-word-api.herokuapp.com/word?number=100";

const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');
const button = document.querySelector('.button');
const select = document.querySelector('.select');
level = select.options[select.selectedIndex].value;





// event functions

runToast = (text) => {
    const option = {
        text : text,
        duration : 3000,
        newWindow : true,
        gravity : 'top',
        position : 'left',
        background : "linear-gradient(#00b09b, #96c3d)"
    }

    Toastify(option).showToast();
}


const levelCheck = (level) => {
    switch(level){
        case 'easy':
            time = 7;
            timeDisplay.innerText = time;
            break;

        case 'normal':
            time = 5;
            timeDisplay.innerText = time;
            break;

        case 'hard':
            time = 3;
            timeDisplay.innerText = time;
            break;

    }
}

const getWords = () => {
    
    axios.get(url).then(res => {
        setTimeout(()=>{
            words = res.data.filter(word=>{
                return word.length < 8;
                 
            });
            button.innerText = '게임시작';
            button.classList.remove('loading');
            
            isReady = true;
        }, 1000)
       
    }).catch(err=>console.log(err));
}


const init = (level) => {
    levelCheck(level);
    getWords();
}

const countDown = () => {

    
    if(time > 0){
        time--;
        
    } else{
        
        clearInterval(timeInterval);
        isPlaying = false;
        button.innerText = '다시 시작하시겠습니까?';
        select.disabled = 'disabled';
        button.addEventListener("click", ()=>{
            window.location.reload();
        })
    }

    timeDisplay.innerText = time;
}

const run = () => {
    
    wordInput.focus();
    count++;
    if(isReady === false || count > 1){
        return;
    }
    clearInterval(timeInterval);
    // time = SETTING_TIME;
    // timeDisplay.innerText = time;
    levelCheck(level);
    wordInput.value = "";
    score = 0;
    scoreDisplay.innerText = score;
    wordInput.focus();
    timeInterval = setInterval(countDown, 1000);
    isPlaying = true;
}



const checkMatch = () => {

    
    randomIndex = Math.floor(Math.random()*words.length);

    if(!isPlaying){
        return;
    }
    
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        setTimeout(function(){
            score++;
            runToast(wordDisplay.innerText);
            // time = SETTING_TIME;
            // timeDisplay.innerText = time;
            levelCheck(level);
            scoreDisplay.innerText = score;
            wordDisplay.innerText = words[randomIndex];
            wordInput.value = "";

        }, 100)
          
    }

}

// event handler

wordInput.addEventListener("input", checkMatch);
select.addEventListener("change", ()=>{
    level = select.options[select.selectedIndex].value;
    levelCheck(level);
});

// getting ready
init(level);





