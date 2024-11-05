const nameLabel = document.querySelector('[data-field="form-name-label"]');
const dateLabel = document.querySelector('[data-field="form-date-label"]');
const emailLabel = document.querySelector('[data-field="form-email-label"]');
const nameInput = document.querySelector('[data-field="contact-form-name"]');
const dateInput = document.querySelector('[data-field="contact-form-date"]');
const emailInput = document.querySelector('[data-field="contact-form-email"]');
const sectionSlider = document.querySelector('[data-field="section-slider"]');
const collections = document.querySelectorAll("[data-collection-handle]");
dateInput.max = new Date();

const contactFormSubmitBtn = document.querySelector(
  '[data-field="contact-form-submit"]',
);

const firstStep = document.querySelector('[data-step="1"]');
const secondStep = document.querySelector('[data-step="2"]');
const thirdStep = document.querySelector('[data-step="3"]');
const fourthStep = document.querySelector('[data-step="4"]');
const fifthStep = document.querySelector('[data-step="5"]');
const sixthStep = document.querySelector('[data-step="6"]');
const seventhStep = document.querySelector('[data-step="7"]');

const userNameFields = document.querySelectorAll('[data-field="user-name"]');
const lifePathNumber = document.querySelector(
  '[data-field="life-path-number"]',
);
const lifePathDescription = document.querySelector(
  '[data-field="life-path-description"]',
);
const expressionNumber = document.querySelector(
  '[data-field="expression-number"]',
);
const expressionDescription = document.querySelector(
  '[data-field="expression-description"]',
);
const soulNumber = document.querySelector('[data-field="soul-number"]');
const soulDescription = document.querySelector(
  '[data-field="soul-description"]',
);
const personalNumber = document.querySelector('[data-field="personal-number"]');
const personalDescription = document.querySelector(
  '[data-field="personal-description"]',
);

const secondStepBtn = document.querySelector(
  '[data-field="second-step-button"]',
);
const thirdStepBtn = document.querySelector('[data-field="third-step-button"]');
const fourthStepBtn = document.querySelector(
  '[data-field="fourth-step-button"]',
);
const subscriptionBtn = document.querySelector(
  '[data-field="email-form-submit"]',
);
const sixthStepBtn = document.querySelector('[data-field="sixth-step-button"]');

class NumberAlgorithm {
  #lettersAsNumbers = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  constructor(dateOfBirth, fullName) {
    const date = new Date(dateOfBirth);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month}-${day}`;

    this.lifePathNumber = null;
    this.lifePathDescription = null;
    this.expressionNumber = null;
    this.expressionDescription = null;
    this.soulNumber = null;
    this.soulDescription = null;
    this.personalNumber = null;
    this.personalDescription = null;
    this.calculateLifePathNumber(formattedDate);
    this.calculateExpressionNumber(fullName);
    this.calculateSoulNumber(fullName);
    this.calculatePersonalNumber(fullName);
  }

  calculateLifePathNumber(birthDate) {
    const dateParts = birthDate.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const reducedMonth = this.reduceToSingleDigit(parseInt(month));
    const reducedDay = this.reduceToSingleDigit(parseInt(day));
    const reducedYear = this.reduceToSingleDigit(parseInt(year));

    const lifePathNumber = this.reduceToSingleDigit(
      reducedMonth + reducedDay + reducedYear,
    );

    this.lifePathNumber = lifePathNumber;
    this.lifePathDescription = window.resultData.lifePath[lifePathNumber];
  }

  calculateExpressionNumber(fullName) {
    const digits = fullName
      .replace(/ /g, "")
      .split("")
      .map((char) => {
        return this.#lettersAsNumbers[char.toUpperCase()] || 0;
      });

    const total = digits.reduce((sum, digit) => sum + digit, 0);

    this.expressionNumber = this.reduceToSingleDigit(total);
    this.expressionDescription =
      window.resultData.expressionNumber[this.expressionNumber];
  }

  calculateSoulNumber(fullName) {
    const upperCaseFullNameArray = fullName.toUpperCase().split("");

    const numbers = upperCaseFullNameArray.map((char) => {
      return "AEIOUY".includes(char) ? this.#lettersAsNumbers[char] : 0;
    });
    const total = numbers.reduce((sum, number) => sum + number, 0);

    this.soulNumber = this.reduceToSingleDigit(total);
    this.soulDescription = window.resultData.soulNumber[this.soulNumber];
  }

  calculatePersonalNumber(fullName) {
    const upperCaseFullNameArray = fullName.toUpperCase().split("");

    const numbers = upperCaseFullNameArray.map((char) => {
      return "BCDFGHJKLMNPQRSTVWXZ".includes(char)
        ? this.#lettersAsNumbers[char]
        : 0;
    });

    const total = numbers.reduce((sum, number) => sum + number, 0);

    this.personalNumber = this.reduceToSingleDigit(total);
    this.personalDescription =
      window.resultData.personalNumber[this.personalNumber];
  }

  reduceToSingleDigit(num) {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }
    return num;
  }
}

let customerName = "";
let customerDate = "";
let customEmail = "";
let isLoading = false;
let nameError = null;
let dateError = null;
let emailError = null;
let lifePathNumberValue = null;
let expressionNumberValue = null;
let soulNumberValue = null;
let personalNumberValue = null;

function clearErrors(value) {
  const errorField = document.querySelector(`[data-field="${value}-error"]`);
  const errorLabel = document.querySelector(
    `[data-field="form-${value}-label"]`,
  );

  if (errorField) errorField.remove();
  if (errorLabel.classList.contains("form-label-error")) {
    errorLabel.classList.remove("form-label-error");
  }

  const errorMap = {
    name: () => (nameError = null),
    date: () => (dateError = null),
    email: () => (emailError = null),
  };

  if (errorMap[value]) errorMap[value]();

  const shouldEnableSubmit = {
    name: () =>
      !nameError &&
      !dateError &&
      contactFormSubmitBtn.removeAttribute("disabled"),
    date: () =>
      !nameError &&
      !dateError &&
      contactFormSubmitBtn.removeAttribute("disabled"),
    email: () => !emailError && subscriptionBtn.removeAttribute("disabled"),
  };

  if (shouldEnableSubmit[value]) shouldEnableSubmit[value]();
}

nameInput.addEventListener("input", () => {
  if (nameError) {
    clearErrors("name");
  }
  customerName = nameInput.value;
});

dateInput.addEventListener("input", () => {
  if (dateError) {
    clearErrors("date");
  }
  customerDate = dateInput.value;
});

emailInput.addEventListener("input", () => {
  if (emailError) {
    clearErrors("email");
  }
  customEmail = emailInput.value;
});

dateInput.addEventListener("focus", () => {
  dateInput.type = "date";
});

dateInput.addEventListener("blur", () => {
  dateInput.type = "text";
});

function validateName(name) {
  const nameRegex = /^[A-Za-z]+([ -][A-Za-z]+)*$/;
  if (name.length === 0) {
    nameError = "Name is required";
    return false;
  }
  if (!nameRegex.test(name)) {
    nameError = "Only english alphabets and hyphens between words are allowed";
    return false;
  }
  return true;
}

function validateDate(date) {
  if (date.length === 0) {
    dateError = "Full date is required";
    return false;
  }
  if (new Date(date) > new Date()) {
    dateError = "Date cannot be in the future";
    return false;
  }
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.length === 0) {
    emailError = "Email is required";
    return false;
  }
  if (!emailRegex.test(email)) {
    emailError = "Please enter a valid email";
    return false;
  }
  return true;
}

function setActiveCollection(number) {
  collections.forEach((collection) => {
    const collectionId = collection.getAttribute("data-collection-handle");

    if (collectionId == String(number)) {
      collection.classList.remove("hidden");
    } else {
      collection.classList.add("hidden");
    }
  });
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  const name = customerName.trim();
  const date = customerDate.trim();

  if (!validateName(name) || !validateDate(date)) {
    if (!validateName(name)) {
      nameLabel.classList.add("form-label-error");
      nameLabel.insertAdjacentHTML(
        "beforeend",
        `<div class="form-field-error" data-field="name-error">${nameError}</div>`,
      );
    }
    if (!validateDate(date)) {
      dateLabel.classList.add("form-label-error");
      dateLabel.insertAdjacentHTML(
        "beforeend",
        `<div class="form-field-error" data-field="date-error">${dateError}</div>`,
      );
    }
    e.target.setAttribute("disabled", true);
    isLoading = false;
    return;
  }

  const numberAlgorithm = new NumberAlgorithm(date, name);

  lifePathNumberValue = numberAlgorithm.lifePathNumber;
  expressionNumberValue = numberAlgorithm.expressionNumber;
  soulNumberValue = numberAlgorithm.soulNumber;
  personalNumberValue = numberAlgorithm.personalNumber;

  firstStep.classList.add("hidden");
  userNameFields.forEach((el) => (el.textContent = name));

  if (lifePathNumber) {
    lifePathNumber.textContent = lifePathNumberValue;
  }
  if (lifePathDescription) {
    lifePathDescription.textContent = numberAlgorithm.lifePathDescription;
  }
  if (expressionNumber) {
    expressionNumber.textContent = expressionNumberValue;
  }
  if (expressionDescription) {
    expressionDescription.textContent = numberAlgorithm.expressionDescription;
  }
  if (soulNumber) {
    soulNumber.textContent = soulNumberValue;
  }
  if (soulDescription) {
    soulDescription.textContent = numberAlgorithm.soulDescription;
  }
  if (personalNumber) {
    personalNumber.textContent = personalNumberValue;
  }
  if (personalDescription) {
    personalDescription.textContent = numberAlgorithm.personalDescription;
  }

  window.scrollTo(0, 0);
  sectionSlider.classList.remove("hidden");
  secondStep.classList.remove("hidden");
  setActiveCollection(lifePathNumberValue);
  lifePathNumber.classList.add("widget-number");
};

contactFormSubmitBtn.addEventListener("click", (e) => handleFormSubmit(e));

secondStepBtn.addEventListener("click", () => {
  secondStep.classList.add("hidden");
  setActiveCollection(expressionNumberValue);
  window.scrollTo(0, 0);
  thirdStep.classList.remove("hidden");
  expressionNumber.classList.add("widget-number");
});

thirdStepBtn.addEventListener("click", () => {
  thirdStep.classList.add("hidden");
  setActiveCollection(soulNumberValue);
  fourthStep.classList.remove("hidden");
  window.scrollTo(0, 0);
  soulNumber.classList.add("widget-number");
});

fourthStepBtn.addEventListener("click", () => {
  fourthStep.classList.add("hidden");
  fifthStep.classList.remove("hidden");
  window.scrollTo(0, 0);
});

sixthStepBtn.addEventListener("click", () => {
  sixthStep.classList.add("hidden");
  seventhStep.classList.remove("hidden");
  window.scrollTo(0, 0);
  personalNumber.classList.add("widget-number");
});

subscriptionBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  isLoading = true;

  const email = customEmail.trim();
  if (!validateEmail(email)) {
    emailLabel.classList.add("form-label-error");
    emailLabel.insertAdjacentHTML(
      "beforeend",
      `<div class="form-field-error" data-field="email-error">${emailError}</div>`,
    );
    e.target.setAttribute("disabled", true);
    isLoading = false;
    return;
  }
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", customerName);
    formData.append("dateOfBirth", new Date(customerDate));
    formData.append("lifePathNumber", lifePathNumberValue);
    formData.append("expressionNumber", expressionNumberValue);
    formData.append("soulNumber", soulNumberValue);
    formData.append("personalNumber", personalNumberValue);

    const request = await fetch("/a/s/subscribe", {
      method: "POST",
      body: formData,
    });

    if (request.status === 200) {
      fifthStep.classList.add("hidden");
      setActiveCollection(personalNumberValue);
      sixthStep.classList.remove("hidden");
      window.scrollTo(0, 0);
    }
  } catch (error) {
  } finally {
    e.target.setAttribute("disabled", false);
    isLoading = false;
  }
});
