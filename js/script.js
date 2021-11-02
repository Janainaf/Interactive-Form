// Constants used along the code

const form = document.querySelector("form");
const nameElement = document.getElementById("name");
const email = document.getElementById("email");
const creditCard = document.getElementById("cc-num");
const languageTotalElement = document.querySelector("#language-total");
const activities = document.getElementById("activities");
const zipCode = document.getElementById("zip");
const creditCardCvv = document.getElementById("cvv");
const payment = document.getElementById("payment");
const paymentbox = document.querySelector(".payment-method-box");

// When the page is refreshed, most of it is cleaned and previous inputs removed

window.onload = function () {
  checkBoxes.forEach(function (checkbox) {
    checkbox.checked = false;
    nameElement.value = "";
    email.value = "";
    creditCard.value = "";
    zipCode.value = "";
    creditCardCvv.value = "";
  });
};

//*******************  Adds focus to name filed  *******************

nameElement.focus();

//*******************  Job Title *******************

const jobTitle = document.getElementById("title");
const otherJob = document.getElementById("other-job-role");

otherJob.style.display = "none";
jobTitle.onchange = function () {
  if (jobTitle.value != "other") {
    otherJob.style.display = "none";
  } else {
    otherJob.style.display = "block";
  }
};

//*******************  Tshirt *******************

const shirtColors = document.getElementById("color");
const shirtDesign = document.getElementById("design");
shirtColors.disabled = true;

shirtDesign.addEventListener("change", teeSelection);

function teeSelection() {
  Array.from(document.querySelectorAll("[data-theme]")).forEach(function (tee) {
    shirtColors.disabled = false;
    document
      .getElementById("color")
      .firstElementChild.removeAttribute("selected");
    tee.style.display = "none";
  });

  if (shirtDesign.value == "heart js") {
    document
      .querySelector("[data-theme='heart js']")
      .setAttribute("selected", true);
    document
      .querySelectorAll("[data-theme='heart js']")
      .forEach(function (heartTee) {
        heartTee.style.display = "block";
      });
  }

  if (shirtDesign.value == "js puns") {
    document
      .querySelector("[data-theme='js puns']")
      .setAttribute("selected", true);

    document
      .querySelectorAll("[data-theme='js puns']")
      .forEach(function (punTee) {
        punTee.style.display = "block";
      });
  }
}
// *******************  Total*******************

var checkBoxes = document.querySelectorAll("input[type=checkbox]");
let sum = 0;

checkBoxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    var box = parseInt(checkbox.dataset.cost) * (checkbox.checked ? 1 : -1);
    sum += box;
    document.getElementById("activities-cost").innerHTML = "Total: $" + sum;
  });
});

// ********************* "Payment Info" section *******************

function selectElement(id, valueToSelect) {
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

selectElement("payment", "credit-card");
document.getElementById("paypal").style.display = "none";
document.getElementById("bitcoin").style.display = "none";

var paymentMethods = ["credit-card", "paypal", "bitcoin"];

payment.onchange = function () {
  for (var i = 0; i < paymentMethods.length; i++) {
    document.getElementById(paymentMethods[i]).style.display = "none";
  }
  var payIndex = payment.selectedIndex;
  document.getElementById(paymentMethods[payIndex - 1]).style.display = "block";
};

// ********************* Form validation *******************

form.addEventListener("submit", logSubmit);

//*************************  Extra *****************************

/* Commented out for accessibility reason, this function shows in real time while user is filling the form 
if any information is missing */

// form.addEventListener("change", logSubmit);

/* Form validation and validation errors to  users.
Displa hint and errors messages are connected to validation
*/

function logSubmit(event) {
  //Name field cannot be blank

  var regName = /(.|\s)*\S(.|\s)*/;
  if (regName.test(nameElement.value) == false) {
    event.preventDefault();
    document.getElementById("name-hint").style.display = "block";
    nameElement.parentElement.classList.add("not-valid");
  } else {
    nameElement.parentElement.classList.remove("not-valid");
    nameElement.parentElement.classList.add("valid");
    document.getElementById("name-hint").style.display = "none";
  }

  //email must have at least two characters + 1 dot + some caracters and .com

  var regEmail = /.{2,}\@.{2,}\.(com)/gm;
  if (regEmail.test(email.value) == false) {
    event.preventDefault();
    document.getElementById("email-hint").style.display = "block";
    email.parentElement.classList.add("not-valid");
  } else {
    document.getElementById("email-hint").style.display = "none";
    email.parentElement.classList.remove("not-valid");
    email.parentElement.classList.add("valid");
  }

  // The "Register for Activities" section must have at least one activity selected.

  if (sum == 0) {
    document.getElementById("activities-hint").style.display = "block";
    document
      .getElementById("activities-box")
      .parentElement.classList.add("not-valid");
    event.preventDefault();
  } else {
    document.getElementById("activities-hint").style.display = "none";
    document
      .getElementById("activities-box")
      .parentElement.classList.remove("not-valid");
    document
      .getElementById("activities-box")
      .parentElement.classList.add("valid");
  }

  // Validation if and only if credit card is the selected payment method

  const regCardNumber = /^[0-9]{13,16}$/gm;
  const regZipCode = /^[0-9]{5}$/gm;
  const regCvv = /^[0-9]{3}$/gm;
  const testCard = regCardNumber.test(creditCard.value);
  const testZip = regZipCode.test(zipCode.value);
  const testCvv = regCvv.test(creditCardCvv.value);

  const addInvalid = paymentbox.firstElementChild.classList.add("not-valid");

  if (payment.selectedIndex !== 1) {
    paymentbox.firstElementChild.classList.remove("not-valid");
    paymentbox.firstElementChild.classList.add("valid");
    document.getElementById("cc-hint").style.display = "none";
  }

  if (testCard && testZip && testCvv) {
    paymentbox.firstElementChild.classList.remove("not-valid");
    paymentbox.firstElementChild.classList.add("valid");
  }

  if (payment.selectedIndex === 1) {
    if (testCard == false) {
      event.preventDefault();
      document.getElementById("cc-hint").style.display = "block";
      addInvalid;
    } else {
      document.getElementById("cc-hint").style.display = "none";
    }

    if (testZip == false) {
      event.preventDefault();
      document.getElementById("zip-hint").style.display = "block";
      addInvalid;
    } else {
      document.getElementById("zip-hint").style.display = "none";
    }

    if (testCvv == false) {
      event.preventDefault();
      document.getElementById("cvv-hint").style.display = "block";
      addInvalid;
    } else {
      document.getElementById("cvv-hint").style.display = "none";
    }
  }

  const invalid = document.querySelector(".not-valid");
  if (invalid !== null) {
    invalid.focus();
  }
}

// Makes the focus states of the activities more obvious to all users

[...document.querySelectorAll("input[type=checkbox]")].forEach((course) => {
  course.addEventListener("focus", (e) =>
    course.parentElement.classList.add("focus")
  );
  course.addEventListener("blur", (e) => {
    const active = document.querySelector(".focus");
    if (active) active.classList.remove("focus");
  });
});
