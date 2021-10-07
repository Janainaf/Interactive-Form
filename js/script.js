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
if (sum < 0) {
  sum = 0;
}

checkBoxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    var box = parseInt(checkbox.dataset.cost) * (checkbox.checked ? 1 : -1);
    sum += box;
    document.getElementById("activities-cost").innerHTML = "Total: $" + sum;
  });
  window.onload = function () {
    // console.log("try to checkbox.checked = false");
    checkbox.checked = false;
  };
});

// ********************* "Payment Info" section *******************
// set credit card default selected

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
    console.log(paymentMethods[i]);
  }
  var payIndex = document.getElementById("payment").selectedIndex;
  console.log(paymentMethods[payIndex]);
  document.getElementById(paymentMethods[payIndex - 1]).style.display = "block";
};

// ********************* Form validation *******************
document.querySelector("form").onsubmit = function () {
  var regName = /(.|\s)*\S(.|\s)*/;
  var name = document.getElementById("name");
  if (regName.test(name.value) == false) {
    alert("Invalid Name");
    name.focus();
    return false;
  }
  var regEmail = /(.|\s)*\S(.|\s)*/;
  var email = document.getElementById("email");
  if (regEmail.test(email.value) == false) {
    alert("Invalid Email");
    email.focus();
    return false;
  }
  if (sum == 0) {
    alert("Error: Check a box!");
    return false;
  }
};
