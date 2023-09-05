/* Set Header Height on load and resize */
let siteHeader = document.querySelector(".site-header");
let navSelectionFixed = document.querySelector(".stake-allocation");

function setHeaderHeight() {
  let siteHeaderHeight = siteHeader.offsetHeight;
  document.documentElement.style.setProperty("--header-height", `${siteHeaderHeight}px`);
}

if (navSelectionFixed) {
  function setStakeFixedHeight() {
    let navSelectionFixedHeight = navSelectionFixed.offsetHeight;
    document.documentElement.style.setProperty("--selection--fixed-height", `${navSelectionFixedHeight}px`);
  }
}

function setWindowHeight() {
  let windowHeight = window.innerHeight;
  document.documentElement.style.setProperty("--window-height", `${windowHeight}px`);
}

window.addEventListener("resize", function (e) {
  setHeaderHeight();
  setWindowHeight();

  if (navSelectionFixed) {
    setStakeFixedHeight();
  }
});

window.addEventListener("load", function (e) {
  setHeaderHeight();
  setWindowHeight();

  if (navSelectionFixed) {
    setStakeFixedHeight();
  }
});

/* Show Wallet */
var walletToggler = document.querySelector(".wallet-and-network__wallet--connected .wallet");
var walletDropdown = document.querySelector(".wallet-and-network__wallet--connected .wallet__info");

if (walletToggler) {
  walletToggler.addEventListener("click", function (e) {
    e.preventDefault();
    walletToggler.classList.toggle("show");
    walletDropdown.classList.toggle("show");
  });
}

/* Clicking outside the menu, close the menu */
document.addEventListener("click", (event) => {
  const targetElement = event.target;

  if (!walletDropdown.contains(targetElement) && targetElement !== walletToggler) {
    walletToggler.classList.remove("show");
    walletDropdown.classList.remove("show");
  }
});

/* Close Modal on Radio selection */
$(function () {
  $(".preferred_options .preferred_options--each .option").on("click", function () {
    $(this).closest(".modal").find(".btn-close").click();
  });
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

/* Coping Wallet Number to Clickboard and replacing icons */
var walletInfo = document.querySelector(".wallet__info");
var copyWallet = walletInfo.querySelector(".copy");
var walletNumber = walletInfo.querySelector("#walletNumber");

if (walletInfo) {
  copyWallet.addEventListener("click", (event) => {
    let walletNumberValue = walletNumber.getAttribute("data-wallet-number");
    navigator.clipboard.writeText(walletNumberValue);
    copyWallet.classList.remove("show");
    copyWallet.parentElement.querySelector(".copied").classList.add("show");
  });
}

/* Before Approved -> After Approved */
var transectionApproveModal = document.querySelector("#modal_approve-transection");
if (transectionApproveModal) {
  var modalHeading = transectionApproveModal.querySelector(".modal-header .heading");
  var modalDescription = transectionApproveModal.querySelector(".modal-header .description");
  var approvedHeading = transectionApproveModal.querySelector(".transection-details__confirmation .heading");
  var approvedDescription = transectionApproveModal.querySelector(".transection-details__confirmation .description");
  var loading = document.querySelector(".transection-details__confirmation .loading");
  var success = document.querySelector(".transection-details__confirmation .success");
}

function transectionApproved() {
  // Replacing Text once approved [ currently it is set with the time ]
  let modalHeaderHeading = modalHeading.getAttribute("data-heading");
  let transectionHeading = approvedHeading.getAttribute("data-heading");
  let modalHeaderDescription = modalDescription.getAttribute("data-description");
  let transectionDescription = approvedDescription.getAttribute("data-description");
  modalHeading.innerHTML = modalHeaderHeading;
  approvedHeading.innerHTML = transectionHeading;
  modalDescription.innerHTML = modalHeaderDescription;
  approvedDescription.innerHTML = transectionDescription;
  // Replacing loading to success icon [ currently it is set with the time ]
  loading.classList.remove("show");
  success.classList.add("show");
  console.log(loading);
}

// CLose Stake Summary Modal
function closeStakeSummary() {
  var stakeSummaryPopup = document.getElementById("modal_stake-summary");
  var modal = new bootstrap.Modal(stakeSummaryPopup);
  modal.hide();
}

$("#modal_approve-transection").on("shown.bs.modal", function (e) {
  var stakeSummaryPopup = document.getElementById("modal_stake-summary");
  $("#modal_stake-summary").modal("hide");
  setTimeout(function () {
    transectionApproved();
  }, 3000);
});

// Assuming you have an input element with the id "myInput"
var inputElement = document.querySelectorAll(".tab-content__staking-flow .search-wrapper .form-input-search");
var resetInput = document.querySelectorAll(".tab-content__staking-flow .search-wrapper .reset-icon");

// Listening for the "input" event on the input element
if (inputElement) {
  inputElement.forEach((element) => {
    element.addEventListener("keyup", function (event) {
      var inputValue = event.target.value;
      let resetInput = element.parentElement.querySelector(".reset-icon");
      if (inputValue) {
        resetInput.classList.add("show");
      } else {
        resetInput.classList.remove("show");
      }
    });
  });
}

if (resetInput) {
  resetInput.forEach((element) => {
    element.addEventListener("click", function (event) {
      let inputElement = element.parentElement.querySelector(".form-input-search");
      inputElement.value = "";
      this.classList.remove("show");
    });
  });
}

// Add the BG and Border based on Input Focused
$(".table .set-stake-allocation").on("focus", function () {
  $(this).closest(".table__body--col").addClass("focused");
});

// Remove the BG and Border based on Input Blured
$(".set-stake-allocation").on("blur", function () {
  $(this).closest(".table__body--col").removeClass("focused");
});

// Clicking on Lock button will unlock the Input
$(".table .stake-allocation-percentage__lock").on("click", function () {
  $(this).removeClass("show");
  $(this).closest(".table__body--col").addClass("unlocked");
  $(this).closest(".table__body--col").removeClass("locked");
  $(this).closest(".table__body--col").find(".set-stake-allocation").focus();
});

// Clicking on unLock button will Lock the Input
$(".table .stake-allocation-percentage__unlock").on("click", function () {
  $(this).next(".stake-allocation-percentage__lock").addClass("show");
  $(this).closest(".table__body--col").removeClass("unlocked");
  $(this).closest(".table__body--col").addClass("locked");
});

// Unchecking Auto Regulate will unlock all the Input of Stake Allocation
let autoRegulate = document.querySelector(".show-inactive-validators .form-check-toggle");
let stakeAllocationLock = document.querySelectorAll(".stake-allocation-percentage .stake-allocation-percentage__lock");
let stakeAllocationUnLock = document.querySelectorAll(".stake-allocation-percentage .stake-allocation-percentage__unlock");

if (autoRegulate) {
  autoRegulate.addEventListener("change", function () {
    if (this.checked) {
      stakeAllocationLock.forEach((element) => {
        element.classList.remove("d-none");
        element.closest(".table__body--col").classList.remove("outlocked");
        element.closest(".table__body--col").querySelector(".stake-allocation-percentage__unlock").classList.remove("d-none");
      });
    } else {
      stakeAllocationLock.forEach((element) => {
        element.classList.add("d-none");
        element.closest(".table__body--col").classList.add("outlocked");
        element.closest(".table__body--col").querySelector(".stake-allocation-percentage__unlock").classList.add("d-none");
      });
    }
  });
}

// Table head scroll linked with table body scroll
(function () {
  var target = $(".table__head");
  $(".table__body").scroll(function () {
    target.prop("scrollTop", this.scrollTop).prop("scrollLeft", this.scrollLeft);
  });
})();

// Assets Page -> Stake Intent Slider
const assetSwiper = new Swiper(".assets__stake--swiper .swiper", {
  // Optional parameters
  loop: false,
  spaceBetween: 24,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Assets Page -> Stake Intent Slider
const airdropSwiper = new Swiper(".other-airdrops__swiper .swiper", {
  // Optional parameters
  slidesPerView: 5,
  spaceBetween: 23.5,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // autoplay: {
  //   delay: 2000,
  // },
});

// Opening of Filter By Zone Dropdown
let filterByZone = document.querySelector(".filter-by-zone");
let filterByZoneToggler = filterByZone.querySelector(".filter-by-zone__toggler");
let filterByZoneOptions = filterByZone.querySelector(".filter-by-zone__options");

if (filterByZone) {
  filterByZoneToggler.addEventListener("click", function (e) {
    e.preventDefault();
    filterByZone.classList.toggle("show");
  });
}

/* Clicking outside the menu, close the menu */
document.addEventListener("click", (event) => {
  const targetElement = event.target;

  if (!filterByZone.contains(targetElement)) {
    filterByZone.classList.remove("show");
  }
});

let notificationsAll = document.querySelectorAll(".notification");

notificationsAll.forEach((element) => {
  let closeNotification = element.querySelector(".btn-close");
  console.log(element);
  closeNotification.addEventListener("click", (e) => {
    e.preventDefault();
    element.classList.remove("show");
  });
});

// // Get the element you want to modify
// let notiLoading = document.querySelector(".notification--loading");
// let notiSuccess = document.querySelector(".notification--transection-success");
// let notiFailed = document.querySelector(".notification--transection-failed");

// Get all the notification elements
const notifications = document.getElementsByClassName("notification");

// Function to show a notification
function showNotification(index) {
  if (index >= 0 && index < notifications.length) {
    notifications[index].classList.add("show");
    setTimeout(function () {
      hideNotification(index);
    }, 3000); // Hide after 2 seconds
  }
}

// Function to hide a notification
function hideNotification(index) {
  if (index >= 0 && index < notifications.length) {
    notifications[index].classList.remove("show");
    if (index < notifications.length - 1) {
      showNotification(index + 1);
    }
  }
}

// Show the first notification
showNotification(0);

let countDownCircle = document.querySelectorAll(".countdown");

if (countDownCircle) {
  countDownCircle.forEach((element) => {
    // Countdown [ Progress ]
    let countDownProgress = element.querySelector("#countdown_progress");

    // Countdown [ Start and Expiry Time ]
    let countDownTime = element.querySelector("#countdown");
    var startDate = countDownTime.getAttribute("data-start_date_time");
    var expiryDate = countDownTime.getAttribute("data-expire_date_time");

    var countDownDate = new Date(expiryDate).getTime();
    let startDateTime = new Date(startDate).getTime();
    var total = countDownDate - startDateTime;

    var total_days = Math.floor(total / (1000 * 60 * 60 * 24));
    var total_hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var total_minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    var total_seconds = Math.floor((total % (1000 * 60)) / 1000);
    var total_hoursAll = total_days * 24 + total_hours;
    var total_minutesAll = total_hoursAll * 60 + total_minutes;

    // Update the count down every 1 second
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let totalHours = days * 24;
      let inTotalHours = totalHours + hours;
      let totalMinutes = inTotalHours * 60 + minutes;

      // Calculating the percentage of time has gone
      var percentage = (totalMinutes / total_minutesAll) * 100;

      // Calculating how much circle will be filed
      var emptyCircle = (percentage / 100) * 223;
      let filedCircle = 223 - emptyCircle;

      countDownProgress.style.strokeDashoffset = filedCircle;
      countDownTime.innerHTML = String(inTotalHours).padStart(2, 0) + ":" + String(minutes).padStart(2, 0);

      if (distance < 0) {
        clearInterval(x);
        countDownTime.innerHTML = "EXPIRED";
        countDownProgress.style.strokeDashoffset = 223;
      }
    }, 1000);
  });
}
