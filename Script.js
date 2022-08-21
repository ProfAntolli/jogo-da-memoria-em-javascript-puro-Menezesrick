const cards = document.querySelectorAll('.cartaodememoria');

let hasflippedcard = false;
let lockboard = false;
let firstcard, secondcard;

function flipcard(){   
    if (lockboard) return;  
    if (this === firstcard) return;

    this.classList.add('flip');

    if(!hasflippedcard) {

        hasflippedcard = true;
        firstcard = this;

        return;
    }

    secondcard = this;
    checkForMath();
}

function checkForMath(){
    let Ismath = firstcard.dataset.framework === secondcard.dataset.framework;

        Ismath ? disablecards() : unflipcards();
}
 

function disablecards(){
    firstcard.removeEventListener('click', flipcard);
    secondcard.removeEventListener('click', flipcard);

    resetboard();
}

function unflipcards(){   
    lockboard = true;    

    setTimeout(() => {
    firstcard.classList.remove('flip');
    secondcard.classList.remove('flip');   

    resetboard();
    }, 1500);
}

function resetboard(){
    [hasflippedcard, lockboard] = [false,false];
    [firstcard, secondcard] = [null, null];
}

(function suffle(){
    cards.forEach(card => {
        let embaralhar = Math.floor(Math.random() * 12);
        card.style.order = embaralhar;
    });
})();


cards.forEach(card => card.addEventListener('click', flipcard));
