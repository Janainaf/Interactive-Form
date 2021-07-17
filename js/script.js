console.log("Test");

document.getElementById("name").focus();

//*******************  Job Title *******************
// Reminder:  visibility and display are different and don't behave the same
document.getElementById("other-job-role").style.display = "none";

document.getElementById("title").onchange = function () {
  if (document.getElementById("title").value != "other") {
    document.getElementById("other-job-role").style.display = "none";
  } else {
    document.getElementById("other-job-role").style.display = "block";
  }
};

//*******************  Tshirt *******************
// needs SERIOUSLY refactoring

document.getElementById("shirt-colors").style.display = "none";
document.getElementById("design").onchange = function () {
  document.getElementById("shirt-colors").style.display = "block";

  Array.from(document.querySelectorAll("[data-theme]")).forEach(function (tee) {
    tee.style.display = "none";
  });

  if (document.getElementById("design").value == "heart js") {
    document
      .querySelectorAll("[data-theme='heart js']")
      .forEach(function (heartTee) {
        heartTee.style.display = "block";
      });
  }

  if (document.getElementById("design").value == "js puns") {
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
//need to finish it - use select to loop through option values... like the active button
// set credit card default selected

selectElement("payment", "credit-card");
document.getElementById("paypal").style.display = "none";
document.getElementById("bitcoin").style.display = "none";

function selectElement(id, valueToSelect) {
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

// ********************* Form validation *******************
