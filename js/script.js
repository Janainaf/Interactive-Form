const form = document.querySelector("form");
const nameElement = document.getElementById("name");
const email = document.getElementById("email");
const creditCard = document.getElementById("cc-num");
const languageTotalElement = document.querySelector("#language-total");
const activities = document.getElementById("activities");
const zipCode = document.getElementById("zip");
const creditCardCvv = document.getElementById("cvv");

window.onload = function () {
  checkBoxes.forEach(function (checkbox) {
    checkbox.checked = false;
    nameElement.value = "";
    email.value = "";
    creditCard.value = "";
  });
};

//*******************  Focus on Name *******************

nameElement.focus();

//*******************  Job Title *******************
// Reminder:  visibility and display are different and don't behave the same

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
// needs SERIOUSLY refactoring

const shirtColors = document.getElementById("shirt-colors");
const shirtDesign = document.getElementById("design");

shirtColors.style.display = "none";

shirtDesign.onchange = function () {
  shirtColors.style.display = "block";

  Array.from(document.querySelectorAll("[data-theme]")).forEach(function (tee) {
    tee.style.display = "none";
  });

  if (shirtDesign.value == "heart js") {
    document
      .querySelectorAll("[data-theme='heart js']")
      .forEach(function (heartTee) {
        heartTee.style.display = "block";
      });
  }

  if (shirtDesign.value == "js puns") {
    document
      .querySelectorAll("[data-theme='js puns']")
      .forEach(function (punTee) {
        punTee.style.display = "block";
      });
  }
};
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

document.getElementById("payment").onchange = function () {
  for (var i = 0; i < paymentMethods.length; i++) {
    document.getElementById(paymentMethods[i]).style.display = "none";
  }
  var payIndex = document.getElementById("payment").selectedIndex;
  document.getElementById(paymentMethods[payIndex - 1]).style.display = "block";
};

// ********************* Form validation *******************

form.addEventListener("submit", logSubmit);

// create function to focus on .not-valid

function logSubmit(event) {
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

  var regEmail = /.+\@.+\.(com)/;
  if (regEmail.test(email.value) == false) {
    event.preventDefault();
    document.getElementById("email-hint").style.display = "block";
    email.parentElement.classList.add("not-valid");
  } else {
    document.getElementById("email-hint").style.display = "none";
    email.parentElement.classList.remove("not-valid");
    email.parentElement.classList.add("valid");
  }

  if (sum == 0) {
    document.getElementById("activities-hint").style.display = "block";
    activities.firstElementChild.classList.add("not-valid");

    event.preventDefault();
  } else {
    document.getElementById("activities-hint").style.display = "none";
    activities.firstElementChild.classList.remove("not-valid");
    activities.firstElementChild.classList.add("valid");
  }

  // If and only if credit card is the selected payment method:

  if (document.getElementById("payment").selectedIndex === 1) {
    var regCardNumber = /^[0-9]{13,16}$/gm;
    var regZipCode = /^[0-9]{5}$/gm;
    var regCvv = /^[0-9]{3}$/gm;

    if (regCardNumber.test(creditCard.value) == false) {
      document.getElementById("cc-hint").style.display = "block";
      document.querySelector(".payment-methods").classList.add("not-valid");
      event.preventDefault();
    } else {
      document.querySelector(".payment-methods").classList.add("valid");
      document.getElementById("cc-hint").style.display = "none";
      document.querySelector(".payment-methods").classList.remove("not-valid");
    }
    if (regZipCode.test(zipCode.value) == false) {
      document.getElementById("zip-hint").style.display = "block";
      document.querySelector(".payment-methods").classList.add("not-valid");
      event.preventDefault();
    } else {
      document.querySelector(".payment-methods").classList.add("valid");
      document.getElementById("zip-hint").style.display = "none";
      document.querySelector(".payment-methods").classList.remove("not-valid");
    }

    if (regCvv.test(creditCardCvv.value) == false) {
      document.getElementById("cvv-hint").style.display = "block";
      document.querySelector(".payment-methods").classList.add("not-valid");
      event.preventDefault();
    } else {
      document.querySelector(".payment-methods").classList.add("valid");
      document.getElementById("cvv-hint").style.display = "none";
      document.querySelector(".payment-methods").classList.remove("not-valid");
    }
    // The "Zip code" field must contain a 5 digit number.
    // The "CVV" field must contain a 3 digit number.
  } else {
    document.querySelector(".payment-methods").classList.remove("not-valid");
    document.querySelector(".payment-methods").classList.add("valid");
    document.getElementById("cc-hint").style.display = "none";
  }

  const invalid = document.querySelector(".not-valid");
  invalid.focus();
}

// ********************* Accessibility *******************

[...document.querySelectorAll("input[type=checkbox]")].forEach((course) => {
  course.addEventListener("focus", (e) =>
    course.parentElement.classList.add("focus")
  );
  course.addEventListener("blur", (e) => {
    const active = document.querySelector(".focus");
    if (active) active.classList.remove("focus");
  });
});

// If a required field’s input is not valid when the form is submitted,
//  a validation error message, warning icon and color are displayed.
// If a required field’s input is valid when the form is submitted,
// a checkmark icon is displayed and no error indicators are displayed.

[...document.querySelectorAll("input[type=checkbox]")].forEach((course) => {
  course.addEventListener("focus", (e) =>
    course.parentElement.classList.add("focus")
  );
  course.addEventListener("blur", (e) => {
    const active = document.querySelector(".focus");
    if (active) active.classList.remove("focus");
  });
});
