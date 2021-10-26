const form = document.querySelector("form");
const nameElement = document.getElementById("name");
const email = document.getElementById("email");
const creditCard = document.getElementById("cc-num");
const languageTotalElement = document.querySelector("#language-total");

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

document.querySelector("form").onsubmit = function (e) {
  e.preventDefault();
  // Only call `preventDefault` on the `event` object if one or more of the required fields is invalid.

  var regName = /(.|\s)*\S(.|\s)*/;
  if (regName.test(nameElement.value) == false) {
    document.getElementById("name-hint").style.display = "block";
    nameElement.parentElement.classList.add(".not-valid");
    nameElement.focus();
    return false;
  } else {
    nameElement.parentElement.classList.add(".valid");
  }

  var regEmail = /.+\@.+\.(com)/;
  if (regEmail.test(email.value) == false) {
    document.getElementById("email-hint").style.display = "block";
    email.parentElement.classList.add(".not-valid");
    email.focus();
    return false;
  }

  if (sum == 0) {
    document.getElementById("activities-hint").style.display = "block";
    // xxx.parentElement.classList.add(".not-valid");
    return false;
  }

  // If and only if credit card is the selected payment method:

  if (document.getElementById("payment").selectedIndex === 1) {
    var regCardNumber = /(.|\s)*\S(.|\s)*/;

    // The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number.

    if (regCardNumber.test(creditCard.value) == false) {
      document.getElementById("cc-hint").style.display = "block";
      return false;
    }

    // The "Zip code" field must contain a 5 digit number.
  }
  // The "CVV" field must contain a 3 digit number.
};

// ********************* Accessibility *******************

[...document.querySelectorAll("input[type=checkbox]")].forEach((course) => {
  course.addEventListener("focus", (e) =>
    course.parentElement.classList.add("focus")
  );
  course.addEventListener("blur", (e) => {
    console.log("focusin!");
    const active = document.querySelector(".focus");
    if (active) active.classList.remove("focus");
  });
});
