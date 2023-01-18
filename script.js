// selecting inputs
const radioInputs = document.querySelectorAll('input[type="radio"]');
const numberInputs = document.querySelectorAll('input[type="number"]');
const resetBtn = document.querySelector('.reset');

// selecting values to calculate
const custom = document.querySelector('.custom');
const peopleToSplit = document.querySelector('.people');
const bill = document.querySelector('.bill');

// selecting values to display
const tip = document.querySelector('.tip');
const total = document.querySelector('.total');

//selecting elements to display error
const error = document.querySelector('.warning-text');

// enables reset button
const enable = () => {
    resetBtn.classList.remove('disabled');
    resetBtn.removeAttribute('disabled');
}

const calculate = (e) => {
    const billValue = parseFloat(bill.value);
    const peopleNumber = parseFloat(peopleToSplit.value);
    
    // calculating preselected tip
    if(bill.value !== '' && peopleToSplit.value !== '' && e.target.type === 'radio') {

        // creating tip amount and percentage
        const tipPercent = parseFloat(e.target.id);
        const tipAmount = (billValue * tipPercent - billValue) / peopleNumber;
        
        // setting tip and total amount
        tip.textContent = '$' + tipAmount.toFixed(2);
        total.textContent = '$' + (billValue * tipPercent / peopleNumber).toFixed(2);

        custom.value = '';

        // removing error
        peopleToSplit.classList.remove('warning');
        error.textContent = '';

        enable();
    } 

    // calculating custom tip
    else if (bill.value !== '' && peopleToSplit.value !== '' && custom.value !== '') {

        // creating tip amount and percentage
        const tipPercent = parseFloat(custom.value);
        const tipAmount = ((billValue/100) * tipPercent) / peopleNumber 

        // setting tip and total amount
        tip.textContent = '$' + tipAmount.toFixed(2);
        total.textContent = '$' + ((billValue + (tipAmount * peopleNumber)) / peopleNumber ).toFixed(2); 

        // removing error
        peopleToSplit.classList.remove('warning');
        error.textContent = '';

        enable();
    }

    // adding error
    else if (peopleToSplit.value === '' && bill.value !== '' && e.target.type === 'radio' || custom.value !== '') {
        peopleToSplit.classList.add('warning');
        error.textContent = "Can't be zero";
    }
}

// reset fucntion
const resetValues = () => {

    // resetting every number input value
    numberInputs.forEach(input => input.value = '');

    // resetting generated text
    total.textContent = '$0.00';
    tip.textContent = '$0.00';
    error.textContent = '';

    // adding disabled for the button
    resetBtn.classList.add('disabled');
    resetBtn.setAttribute('disabled', true);
}


// listener for calculating on every input keyup
numberInputs.forEach(input => input.addEventListener('keyup', calculate));

// listener for each preselected radio tip
radioInputs.forEach(btn => btn.addEventListener('click', calculate))

// listener for resetting
resetBtn.addEventListener('click', resetValues)

