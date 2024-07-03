const image = document.querySelector('.img');
const boxes = document.querySelectorAll('.boxs');
const level = document.querySelector('.level');
const scoreElement = document.querySelector('.score');
const display = document.querySelector('.display');
const btn = document.querySelector('.next-btn');
const final = document.querySelector('.div');
const circleRight = document.querySelector('.circle.r');
const circleLeft = document.querySelector('.circle.l');
const finalPage = document.querySelector('.box');
const frontBtn = document.querySelector('.front-page .btn')
const frontPage = document.querySelector('.front-page');
const handle = document.querySelector('.in');


let currentCountry = '';
let score = 0;
let currentLevel = 1;
let width = 1;



frontBtn.addEventListener('click', () => {
    let time = setInterval(() => {
        width += 10;
        handle.style.width = width + '%';
        if (width >= 100) {
            clearInterval(time);
            finalPage.style.display = 'block';
            frontPage.style.display = 'none';
            start.play();
        }
    }, 500);

})

const fetchRandomCountry = async () => {
    const url = 'https://restcountries.com/v3.1/all';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const randomCountry = data[Math.floor(Math.random() * data.length)];
            currentCountry = randomCountry.name.common;
            displayFlag(randomCountry.flags.svg);
            displayOptions(randomCountry.name.common, data);
        } else {
            console.log('Failed to fetch countries');
        }
    } catch (error) {
        console.log('An error occurred while fetching the countries', error);
    }
};

function displayFlag(flagUrl) {
    image.innerHTML = `<img src="${flagUrl}" alt="Flag" class="flag">`;
}

function displayOptions(correctName, allCountries) {
    const options = [correctName];

    while (options.length < boxes.length) {
        const randomCountry = allCountries[Math.floor(Math.random() * allCountries.length)].name.common;
        if (!options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }

    options.sort(() => Math.random() - 0.5);

    boxes.forEach((box, index) => {
        box.innerText = options[index];
        box.style.backgroundColor = '';
        box.onclick = () => checkAnswer(options[index], box);
    });
}

function checkAnswer(selectedName, box) {
    if (selectedName === currentCountry) {
        great.play();
        score++;
        box.style.backgroundColor = "green";
    } else {
        wrong.currentTime = 1;
        wrong.play();
        box.style.backgroundColor = "red";
    }
    btn.style.display = 'block';
    display.style.pointerEvents = 'none';
    scoreElement.textContent = `Score: ${score}`;
    level.textContent = `${currentLevel}/25`;
    currentLevel++;

    if (currentLevel > 25) {
        setTimeout(() => {
            finalPage.style.display = 'none';
            final.style.display = 'block';
            circleLeft.innerText = score;
            circleRight.innerText = currentLevel - 1;
        }, 1000);
    }
}

let great = new Audio('sounds/great.mp3');
let wrong = new Audio('sounds/wrong.mp3');
let start = new Audio('sounds/start.mp3');


btn.addEventListener('click', () => {
    display.style.pointerEvents = 'auto';
    btn.style.display = 'none';
    fetchRandomCountry();
});

fetchRandomCountry();

