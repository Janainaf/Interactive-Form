console.log("Test");

document.getElementById("name").focus();

//*******************  Job Title *******************
// Reminder:  visibility and display are different and dont behave the same
document.getElementById("other-job-role").style.display = "none";

document.getElementById("title").onchange = function () {
  if (document.getElementById("title").value != "other") {
    document.getElementById("other-job-role").style.display = "none";
  } else {
    document.getElementById("other-job-role").style.display = "block";
  }
};

//*******************  Tshirt *******************
// needs refactoring
document.getElementById("shirt-colors").style.display = "none";

document.getElementById("design").onchange = function () {
  document.getElementById("shirt-colors").style.display = "block";

  Array.from(document.querySelectorAll("[data-theme")).forEach(function (them) {
    them.style.display = "none";
  });

  if (document.getElementById("design").value == "heart js") {
    Array.from(
      document
        .querySelectorAll("[data-theme='heart js']")
        .forEach(function (them) {
          them.style.display = "block";
        })
    );
  }

  if (document.getElementById("design").value == "js puns") {
    Array.from(
      document
        .querySelectorAll("[data-theme='js puns']")
        .forEach(function (them) {
          them.style.display = "block";
        })
    );
  }
};
// *******************  Total*******************

var checkBoxes = document.querySelectorAll("input[type=checkbox]");
let checkedBoxes = [];

checkBoxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    checkedBoxes = Array.from(checkBoxes)
      .filter((i) => i.checked)
      .map((i) => i.dataset.cost);

    console.log(checkedBoxes);
  });
});

// ********************* "Payment Info" section *******************

selectElement("payment", "credit-card");

function selectElement(id, valueToSelect) {
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

document.getElementById("paypal").style.display = "none";
document.getElementById("bitcoin").style.display = "none";

// ********************* "Payment Info" section *******************
