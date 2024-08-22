`use strict`;


const billInp = document.querySelector(`#bill-inp`);
const peopleInp = document.querySelector(`#people-number-inp`);
const customInp = document.querySelector(`#custom`);

const radioLabelArray = Array.from(document.querySelectorAll(`.radio-label`));
const radioInpArray = Array.from(document.querySelectorAll(`.radio-inp`));

const tipAmountStrong = document.querySelector(`.tip-amount-strong`);
const totalStrong = document.querySelector(`.total-strong`);

const submit = document.querySelector(`.submit`);
const reset = document.querySelector(`.reset`);

const billPeople = [billInp, peopleInp];



// this function checks if bill and people number inputs are filled

const checkNumInp = function(billPeople) {
    if(billPeople.every(el => el.value !== ``)) {
        return true
    } else {
        return false
    }
}



//  checkes if radio input is checked

const checkRadioInp = function(inparray) {
    if(inparray.some(el => el.checked)) {
        return true
    } else {
        return false
    }
}




// checkes if custom input is filled

const checkCustom = function(custom) {
    if(custom.value !== ``) {
        return true
    } else {
        return false
    }
}



customInp.addEventListener(`click`, () => {
    radioInpArray.forEach(el => el.checked = false);
    radioInpArray.forEach(el => console.log(el.checked));
    radioLabelArray.forEach(el => el.classList.remove(`checked`));
})


radioInpArray.forEach((el, i) => {
    el.addEventListener(`click`, () => {
        customInp.value = ``;

        radioLabelArray.forEach(el => el.classList.remove(`checked`))
        
        radioLabelArray[i].classList.add(`checked`)
    })
})




submit.addEventListener(`click`, () => {
    if(checkNumInp(billPeople) && checkRadioInp(radioInpArray) 
        && !checkCustom(custom)) {
    
        const billAmount = Number(billInp.value);
        const peopleNumber = Number(peopleInp.value);
        
        let tipAmount;

        radioInpArray.forEach((el, i) => {
            if(el.checked) {
                tipAmount = Number(parseInt(radioLabelArray[i].textContent)) / 100;
            }
        })

        const tipPerson = (billAmount * tipAmount) / peopleNumber;
        tipAmountStrong.textContent = `$${tipPerson.toFixed(2)}`;
        
        const totalPerson = (billAmount + (billAmount * tipAmount)) / peopleNumber;
        totalStrong.textContent = `$${totalPerson.toFixed(2)}`;

        // peopleInp.value = ``;
        // billInp.value = ``;

        radioInpArray.forEach(el => {
            if(el.checked) {
                el.checked = false
            }
        })

        radioInpArray.forEach(el => console.log(el.checked));

        submit.classList.toggle(`display-none`);
        reset.classList.toggle(`display-none`);

    } else if (checkNumInp(billPeople) && !checkRadioInp(radioInpArray) 
                && checkCustom(custom)) {

                        
                const billAmount = Number(billInp.value);
                const peopleNumber = Number(peopleInp.value);
                let tipAmount = Number(custom.value) / 100;

                const tipPerson = (billAmount * tipAmount) / peopleNumber;
                tipAmountStrong.textContent = `$${tipPerson.toFixed(2)}`;
                
                const totalPerson = (billAmount + (billAmount * tipAmount)) / peopleNumber;
                totalStrong.textContent = `$${totalPerson.toFixed(2)}`;
        
                // peopleInp.value = ``;
                // billInp.value = ``;
                // customInp.value = ``;

                submit.classList.toggle(`display-none`);
                reset.classList.toggle(`display-none`);


            }
})


reset.addEventListener(`click`, () => {

    tipAmountStrong.textContent = `$0:00`;
    totalStrong.textContent = `$0:00`;

    submit.classList.toggle(`display-none`);
    reset.classList.toggle(`display-none`);

    peopleInp.value = ``;
    billInp.value = ``;
    radioLabelArray.forEach(el => el.classList.remove(`checked`));
    customInp.value = ``;
})