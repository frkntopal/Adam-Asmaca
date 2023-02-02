const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetter_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');

const correctLetters = [];
const wrongLetters = [];
const selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["javascrıpt", "python", "flutter", "java", "html", "Angular"];

    return words[Math.floor(Math.random() * words.length)];
}




function displayWord() {


    word_el.innerHTML = `
    ${selectedWord.split('').map(letter => 
        `<div class="letter"> 
        ${correctLetters.includes(letter) ? letter: ''} 
        </div>`
        ).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g,'');

    if (w == selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandınız.'
    } 
}

function updateWrongLetters (){
wrongLetter_el.innerHTML = `
${wrongLetters.length>0 ?`<h3>Hatalı Harfler</h3>`: ''}
${wrongLetters.map(letter => `<span>${letter}<span>`)}
`
items.forEach((item,index) => {
    const errorCount = wrongLetters.length;

    if(index<errorCount){
        item.style.display = 'block';
    }else {
        item.style.display = 'none';
    }
})

if(wrongLetters.length === items.length) {
    popup.style.display = 'flex';
    message_el.innerText = 'Maalesef Kaybetiniz.'
}

}

window.addEventListener("keydown",function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else {
                // bu harfi zaten eklediniz.
            }
        }else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                // hatalı harfler güncelle.
                updateWrongLetters();
            }
        }
    }
})

displayWord();