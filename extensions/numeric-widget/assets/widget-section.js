const elements = {
  nameLabel: document.querySelector('[data-field="form-name-label"]'),
  dateLabel: document.querySelector('[data-field="form-date-label"]'),
  emailLabel: document.querySelector('[data-field="form-email-label"]'),
  nameInput: document.querySelector('[data-field="contact-form-name"]'),
  dateInput: document.querySelector('[data-field="contact-form-date"]'),
  emailInput: document.querySelector('[data-field="contact-form-email"]'),
  sectionSlider: document.querySelector('[data-field="section-slider"]'),
  collections: document.querySelectorAll("[data-collection-handle]"),
  defaultCollection: document.querySelector('[data-default-collection="true"]'),
  contactFormSubmitBtn: document.querySelector(
    '[data-field="contact-form-submit"]',
  ),
  steps: Array.from({ length: 7 }, (_, i) =>
    document.querySelector(`[data-step="${i + 1}"]`),
  ),
  userNameFields: document.querySelectorAll('[data-field="user-name"]'),
  lifePathNumber: document.querySelector('[data-field="life-path-number"]'),
  lifePathDescription: document.querySelector(
    '[data-field="life-path-description"]',
  ),
  expressionNumber: document.querySelector('[data-field="expression-number"]'),
  expressionDescription: document.querySelector(
    '[data-field="expression-description"]',
  ),
  soulNumber: document.querySelector('[data-field="soul-number"]'),
  soulDescription: document.querySelector('[data-field="soul-description"]'),
  personalNumber: document.querySelector('[data-field="personal-number"]'),
  personalDescription: document.querySelector(
    '[data-field="personal-description"]',
  ),
  stepButtons: {
    secondStepBtn: document.querySelector('[data-field="second-step-button"]'),
    thirdStepBtn: document.querySelector('[data-field="third-step-button"]'),
    fourthStepBtn: document.querySelector('[data-field="fourth-step-button"]'),
    subscriptionBtn: document.querySelector('[data-field="email-form-submit"]'),
    sixthStepBtn: document.querySelector('[data-field="sixth-step-button"]'),
  },
};

elements.dateInput.max = new Date().toISOString().split("T")[0];

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

let customerData = {
  name: "",
  date: "",
  email: "",
  isLoading: false,
  errors: { name: null, date: null, email: null },
  numberValues: {
    lifePath: null,
    expression: null,
    soul: null,
    personal: null,
  },
  personalDescription: null,
};

function clearErrors(value) {
  const errorField = document.querySelector(`[data-field="${value}-error"]`);
  const errorLabel = document.querySelector(
    `[data-field="form-${value}-label"]`,
  );

  if (errorField) errorField.remove();
  if (errorLabel.classList.contains("form-label-error")) {
    errorLabel.classList.remove("form-label-error");
  }

  customerData.errors[value] = null;

  if (!customerData.errors.name && !customerData.errors.date) {
    elements.contactFormSubmitBtn.removeAttribute("disabled");
  }
  if (!customerData.errors.email) {
    elements.stepButtons.subscriptionBtn.removeAttribute("disabled");
  }
}

function handleInputChange(event, field) {
  if (customerData.errors[field]) {
    clearErrors(field);
  }
  customerData[field] = event.target.value;
}

elements.nameInput.addEventListener("input", (e) =>
  handleInputChange(e, "name"),
);
elements.dateInput.addEventListener("input", (e) =>
  handleInputChange(e, "date"),
);
elements.emailInput.addEventListener("input", (e) =>
  handleInputChange(e, "email"),
);

elements.dateInput.addEventListener(
  "focus",
  () => (elements.dateInput.type = "date"),
);
elements.dateInput.addEventListener(
  "blur",
  () => (elements.dateInput.type = "text"),
);

function validateField(value, regex, errorMessage) {
  if (value.length === 0) {
    return "This field is required";
  }
  if (!regex.test(value)) {
    return errorMessage;
  }
  return null;
}

function validateName(name) {
  return validateField(
    name,
    /^[A-Za-z]+([ -][A-Za-z]+)*$/,
    "Only english alphabets and hyphens between words are allowed",
  );
}

function validateDate(date) {
  if (date.length === 0) {
    return "Full date is required";
  }
  if (new Date(date) > new Date()) {
    return "Date cannot be in the future";
  }
  return null;
}

function validateEmail(email) {
  return validateField(
    email,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Please enter a valid email",
  );
}

function setActiveCollection(number) {
  elements.defaultCollection.classList.add("hidden");
  elements.collections.forEach((collection) => {
    const collectionId = collection.getAttribute("data-collection-handle");
    collection.classList.toggle("hidden", collectionId != String(number));
  });

  if (
    Array.from(elements.collections).every((collection) =>
      collection.classList.contains("hidden"),
    )
  ) {
    elements.defaultCollection.classList.remove("hidden");
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = customerData.name.trim();
  const date = customerData.date.trim();

  customerData.errors.name = validateName(name);
  customerData.errors.date = validateDate(date);

  if (customerData.errors.name || customerData.errors.date) {
    if (customerData.errors.name) {
      elements.nameLabel.classList.add("form-label-error");
      elements.nameLabel.insertAdjacentHTML(
        "beforeend",
        `<div class="form-field-error" data-field="name-error">${customerData.errors.name}</div>`,
      );
    }
    if (customerData.errors.date) {
      elements.dateLabel.classList.add("form-label-error");
      elements.dateLabel.insertAdjacentHTML(
        "beforeend",
        `<div class="form-field-error" data-field="date-error">${customerData.errors.date}</div>`,
      );
    }
    e.target.setAttribute("disabled", true);
    customerData.isLoading = false;
    return;
  }

  const numberAlgorithm = new NumberAlgorithm(date, name);

  customerData.numberValues.lifePath = numberAlgorithm.lifePathNumber;
  customerData.numberValues.expression = numberAlgorithm.expressionNumber;
  customerData.numberValues.soul = numberAlgorithm.soulNumber;
  customerData.numberValues.personal = numberAlgorithm.personalNumber;
  customerData.personalDescription = numberAlgorithm.personalDescription;

  elements.steps[0].classList.add("hidden");
  elements.userNameFields.forEach((el) => (el.textContent = name));

  if (elements.lifePathNumber)
    elements.lifePathNumber.textContent = customerData.numberValues.lifePath;
  if (elements.lifePathDescription)
    elements.lifePathDescription.textContent =
      numberAlgorithm.lifePathDescription;
  if (elements.expressionNumber)
    elements.expressionNumber.textContent =
      customerData.numberValues.expression;
  if (elements.expressionDescription)
    elements.expressionDescription.textContent =
      numberAlgorithm.expressionDescription;
  if (elements.soulNumber)
    elements.soulNumber.textContent = customerData.numberValues.soul;
  if (elements.soulDescription)
    elements.soulDescription.textContent = numberAlgorithm.soulDescription;
  if (elements.personalNumber)
    elements.personalNumber.textContent = customerData.numberValues.personal;
  if (elements.personalDescription)
    elements.personalDescription.textContent =
      numberAlgorithm.personalDescription;

  window.scrollTo(0, 0);
  elements.sectionSlider.classList.remove("hidden");
  elements.steps[1].classList.remove("hidden");
  setActiveCollection(customerData.numberValues.lifePath);
  elements.lifePathNumber.classList.add("widget-number");
}

elements.contactFormSubmitBtn.addEventListener("click", handleFormSubmit);

function handleStepButtonClick(
  currentStep,
  nextStep,
  numberValue,
  numberElement,
) {
  elements.steps[currentStep].classList.add("hidden");
  setActiveCollection(numberValue);
  window.scrollTo(0, 0);
  elements.steps[nextStep].classList.remove("hidden");
  if (numberElement) numberElement.classList.add("widget-number");
}

elements.stepButtons.secondStepBtn.addEventListener("click", () =>
  handleStepButtonClick(
    1,
    2,
    customerData.numberValues.expression,
    elements.expressionNumber,
  ),
);
elements.stepButtons.thirdStepBtn.addEventListener("click", () =>
  handleStepButtonClick(
    2,
    3,
    customerData.numberValues.soul,
    elements.soulNumber,
  ),
);
elements.stepButtons.fourthStepBtn.addEventListener("click", () =>
  handleStepButtonClick(3, 4, null, null),
);
elements.stepButtons.sixthStepBtn.addEventListener("click", () =>
  handleStepButtonClick(
    5,
    6,
    customerData.numberValues.personal,
    elements.personalNumber,
  ),
);

elements.stepButtons.subscriptionBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  customerData.isLoading = true;

  const email = customerData.email.trim();
  customerData.errors.email = validateEmail(email);

  if (customerData.errors.email) {
    elements.emailLabel.classList.add("form-label-error");
    elements.emailLabel.insertAdjacentHTML(
      "beforeend",
      `<div class="form-field-error" data-field="email-error">${customerData.errors.email}</div>`,
    );
    e.target.setAttribute("disabled", true);
    customerData.isLoading = false;
    return;
  }

  const finalCollection = window.collections.find(
    (item) => item.handle === customerData.numberValues.personal.toString(),
  );

  console.log("finalCollection :>> ", finalCollection);

  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", customerData.name);
    formData.append("dateOfBirth", new Date(customerData.date));
    formData.append("lifePathNumber", customerData.numberValues.lifePath);
    formData.append("expressionNumber", customerData.numberValues.expression);
    formData.append("soulNumber", customerData.numberValues.soul);
    formData.append("personalNumber", customerData.numberValues.personal);
    formData.append(
      "collectionDescription",
      finalCollection?.body_html || null,
    );
    formData.append(
      "collectionImage",
      finalCollection?.image?.src
        ? `https:${finalCollection?.image?.src}`
        : null,
    );
    formData.append("personalDescription", customerData.personalDescription);

    const request = await fetch("/a/s/subscribe", {
      method: "POST",
      body: formData,
    });

    if (request.status === 200) {
      elements.steps[4].classList.add("hidden");
      elements.steps[5].classList.remove("hidden");
      window.scrollTo(0, 0);
    }
  } catch (error) {
  } finally {
    e.target.setAttribute("disabled", false);
    customerData.isLoading = false;
  }
});
