var Webflow = Webflow || []; // Initialize Webflow Variable
Webflow.push(function() { // Push a Function into the Webflow Array
//   console.log('webflow push worked')

    console.log('contactTester.js')

  const nameInputWrapper = document.getElementById('contact-name');
  const emailInputWrapper = document.getElementById('contact-email');
  const messageInputWrapper = document.getElementById('contact-message'); 

  const nameInput = nameInputWrapper.querySelector('input');
  const nameErrorMsgWrapper = nameInputWrapper.querySelector('.input-error-wrapper');
  const nameErrorMsgText = nameErrorMsgWrapper.querySelector('.form-error-message');

  const emailInput = emailInputWrapper.querySelector('input');
  const emailErrorMsgWrapper = emailInputWrapper.querySelector('.input-error-wrapper');
  const emailErrorMsgText = emailErrorMsgWrapper.querySelector('.form-error-message');

  const messageInput = messageInputWrapper.querySelector('textarea');
  const messageErrorMsgWrapper = messageInputWrapper.querySelector('.input-error-wrapper');
  const messageErrorMsgText = messageErrorMsgWrapper.querySelector('.form2-error-message');

  const connectH2Elem = document.getElementById('connect-h2');
  const connectGrid = document.getElementById('connect-grid');

  function addErrorMessage(wrapper, textElem, errorMessage) {
    // console.log('addErrorMessage:', errorMessage)
    wrapper.classList.remove('hidden');
    textElem.textContent = errorMessage;
}

function removeErrorMessage(wrapper) {
    wrapper.classList.add('hidden');
}

  function checkInputLength(input, wrapper, textElem, minLength, errorMessage) {
    // console.log('input.value.length:', input.value.length, 'minLength:', minLength)
    if (input.value.length < minLength) {
        addErrorMessage(wrapper, textElem, errorMessage)
        return true;
    } else {
        removeErrorMessage(wrapper)
        return false;
    }
}

function checkEmptyInput(input, wrapper, textElem, errorMessage) {
    // console.log('checkEmptyInput')
    if (!input.value) {
        addErrorMessage(wrapper, textElem, errorMessage)
        // console.log('checkEmptyInput - ERROR')
        return true;
    } else {
        removeErrorMessage(wrapper)
        return false;
    }
}

  function checkNameInput(input, wrapper, textElem) {
    const checks = [
        () => checkEmptyInput(input, wrapper, textElem, 'Please enter your name'),
        () => checkInputLength(input, wrapper, textElem, 2, 'Minimum 2 characters'),
    ];

    // console.log('Checks array:', checks);

    const hasError = checks.some((check, index) => {
        const error = check(); // Call the function
        // console.log(`Iteration ${index}, error:`, error);
        return error; // Return the error directly since it's already a boolean
    });
    
    if (hasError) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(input, wrapper, textElem, errorMessage) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // return emailRegex.test(email);

    if (!emailRegex.test(input.value)) {
        addErrorMessage(wrapper, textElem, errorMessage)
        // console.log('checkEmptyInput - ERROR')
        return true;
    } else {
        removeErrorMessage(wrapper)
        return false;
    }
}

function checkEmailInput(input, wrapper, textElem) {
    const checks = [
        () => checkEmptyInput(input, wrapper, textElem, 'Please enter your email'),
        () => validateEmail(input, wrapper, textElem, 'Please enter valid email'),
    ];

    // console.log('Checks array:', checks);

    const hasError = checks.some((check, index) => {
        const error = check(); // Call the function
        // console.log(`Iteration ${index}, error:`, error);
        return error; // Return the error directly since it's already a boolean
    });
    
    if (hasError) {
        return true;
    } else {
        return false;
    }
}

function checkMessageInput(input, wrapper, textElem) {
    const checks = [
        () => checkEmptyInput(input, wrapper, textElem, 'Please enter your message'),
        () => checkInputLength(input, wrapper, textElem, 10, 'Minimum 10 characters'),
    ];

    // console.log('Checks array:', checks);

    const hasError = checks.some((check, index) => {
        const error = check(); // Call the function
        // console.log(`Iteration ${index}, error:`, error);
        return error; // Return the error directly since it's already a boolean
    });
    
    if (hasError) {
        return true;
    } else {
        return false;
    }
}

  $('[wr-type="submit"]').click(function() { 
    // console.log('click')
    let isOk = runFormSubmitChecks(); // Use this to define whether isOk is true or false

    if (isOk) {
        // console.log('submitting')
        const successNameTextElem = document.getElementById('success-name-text');
        successNameTextElem.innerHTML = nameInput.value;
        $(this).parents('form').submit()
        setTimeout(function() {
            connectH2Elem.classList.add('hidden');
        connectGrid.classList.add('2-cols');    
        }, 1000)
    }
    // } else {
    //     console.log('not submitting')
    // }
  }); // end submit


  function runFormSubmitChecks() {
    console.log('runFormSubmitChecks')

    let errors = [];

    errors.push(checkNameInput(nameInput, nameErrorMsgWrapper, nameErrorMsgText));
    errors.push(checkEmailInput(emailInput, emailErrorMsgWrapper, emailErrorMsgText));
    errors.push(checkMessageInput(messageInput, messageErrorMsgWrapper, messageErrorMsgText));
    console.log('submit error: ', errors)
    if (errors.includes(true)) {
        alert('Please check contact form errors')
        return false;
    } else {
        console.log('No Errors - continue')
        return true;
    }
  }

  function init() {
    connectH2Elem.classList.remove('hidden');
    connectGrid.classList.remove('2-cols');
  }

  init();

}); // end webflow.push()