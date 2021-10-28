const form = document.querySelector("form");
const nameElement = document.getElementById("name");
const email = document.getElementById("email");
const creditCard = document.getElementById("cc-num");
const languageTotalElement = document.querySelector("#language-total");
const activities = document.getElementById("activities");
const zipCode = document.getElementById("zip");
const creditCardCvv = document.getElementById("cvv");
const payment = document.getElementById("payment");

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

payment.onchange = function () {
  for (var i = 0; i < paymentMethods.length; i++) {
    document.getElementById(paymentMethods[i]).style.display = "none";
  }
  var payIndex = payment.selectedIndex;
  document.getElementById(paymentMethods[payIndex - 1]).style.display = "block";
};

// ********************* Form validation *******************

form.addEventListener("submit", logSubmit);

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

  // If and only if credit card is the selected payment method:

  const regCardNumber = /^[0-9]{13,16}$/gm;
  const regZipCode = /^[0-9]{5}$/gm;
  const regCvv = /^[0-9]{3}$/gm;

  if (payment.selectedIndex === 1) {
    if (regCardNumber.test(creditCard.value) == false) {
      event.preventDefault();
      document.getElementById("cc-hint").style.display = "block";
      payment.parentElement.classList.add("not-valid");
    } else {
      document.getElementById("cc-hint").style.display = "none";
      payment.parentElement.classList.remove("not-valid");
      payment.parentElement.classList.add("valid");
    }

    if (regZipCode.test(zipCode.value) == false) {
      event.preventDefault();
      document.getElementById("zip-hint").style.display = "block";
      payment.parentElement.classList.add("not-valid");
    } else {
      document.getElementById("zip-hint").style.display = "none";
      payment.parentElement.classList.remove("not-valid");
      payment.parentElement.classList.add("valid");
    }

    if (regCvv.test(creditCardCvv.value) == false) {
      event.preventDefault();
      document.getElementById("cvv-hint").style.display = "block";
      payment.parentElement.classList.add("not-valid");
    } else {
      document.getElementById("cvv-hint").style.display = "none";
      payment.parentElement.classList.remove("not-valid");
      payment.parentElement.classList.add("valid");
    }
  }

  // else {
  //   document.querySelector(".payment-methods").classList.remove("not-valid");
  //   document.querySelector(".payment-methods").classList.add("valid");
  //   document.getElementById("cc-hint").style.display = "none";
  // }

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
