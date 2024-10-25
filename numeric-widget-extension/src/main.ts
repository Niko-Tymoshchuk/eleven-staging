import {
  canMakeRequest,
  copy,
  getImageURL,
  getProductImage,
  getQueryParam,
  sendRequest,
  sendRequestProxy,
  sleep,
  uploadFile,
  validateFile,
  generateRandomString,
} from "~/utils/helpers.ts";
import { imagePlaceholderURL } from "~/utils/constants.ts";
import "./style.css";

import "sharer.js";

class WidgetBlock extends HTMLElement {
  // types
  types = {
    email: "email",
    phone: "phone",
    phoneEmail: "phone+email",
  };

  // variables
  abortController: AbortController;
  timer: number;
  imageLoaderInterval: number;

  discountCode: string;
  modalId: number;
  modalBlock: HTMLDivElement;
  imageUrl: string;
  imageId: number;
  tryOnUuid: string;
  backgroundImage: string;
  sharedOptionsEnabled: boolean;
  sharedOptions: string[];

  modalButtonBehaviour: string;

  constructor() {
    const {
      modal_text_virtual,
      modal_text_encouragement,
      modal_button_text,
      modal_button_behaviour,
      modal_text,
      modal_text_2,
      modal_bgcolor,
      modal_text_color,
      modal_button_bgcolor,
      modal_frame_color,
      modal_input_image,
      modal_border_radius,
      button_text_color,
      button_bgcolor,
      modal_header_text_color,
      modal_text_header_recommendations,
      modal_text_recommendations,
      button_border_radius,
    } = window.numeric_widget.settings;

    const { sharedOptionsEnabled, sharedOptions } = window.numeric_widget;

    const upload_ico_src = window.numeric_widget.upload_ico_src;

    super();

    this.modalButtonBehaviour = modal_button_behaviour;

    const modalBlock = document.createElement("div");
    modalBlock.innerHTML = `
      <style>
        :root {
          --widget-button-border-radius: ${button_border_radius}px;
          --widget-button-bgcolor: ${button_bgcolor};
          --widget-button-text-color: ${button_text_color};

          --widget-popup-header-text-color: ${modal_header_text_color};
          --widget-popup-frame-color: ${modal_frame_color};
          --widget-popup-bgcolor: ${modal_bgcolor};
          --widget-popup-button-bgcolor: ${modal_button_bgcolor};
          --widget-popup-text-color: ${modal_text_color};
          --widget-popup-border-radius: ${modal_border_radius}px;
        }
      </style>
      <div class="widget-popup">
        <div class="widget-popup-content">
          <div class="widget-header-wrapper">
            <div class="widget-header">
              <p class="widget-popup-header">${modal_text_virtual}</p>
              <span class="widget-popup-close">&times;</span>
            </div>
          </div>
          <div class="widget-body">
            <div class="widget-step widget-step-upload widget-active">
              <div class='widget-image-upload'>
                <div class="widget-upload-container">
                  <div class="widget-file-drop-area">
                    <svg width="100" height="100" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect x="0.685547" y="0.214844" width="100" height="100" fill="url(#pattern0_980_8056)"/>
                      <defs>
                      <pattern id="pattern0_980_8056" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_980_8056" transform="scale(0.002)"/>
                      </pattern>
                      <image id="image0_980_8056" width="500" height="500" xlink:href="${modal_input_image ?? upload_ico_src}"/>
                      </defs>
                    </svg>
                    <span class="widget-file-msg desktop">Drag your image file here or
                        <span id="widget-uploadButton desktop" class="widget-fake-btn">click here</span>
                        to select
                    </span>
                    <span class="widget-file-msg mobile">
                        <span id="widget-uploadButton mobile" class="widget-fake-btn">Click here</span>
                        to select your image
                    </span>
                    <input id="widget-uploadInput" accept="image/*" class="widget-file-input" type="file">
                  </div>
                  <span id='widget-errorUpload' class='widget-error widget-hidden'></span>
                </div>
                <div class="widget-image-upload-recommendations">
                    <p class="widget-recommendation-header">
                    ${modal_text_header_recommendations}
                    </p>
                    <ul>
                    ${modal_text_recommendations
                      .split("\n")
                      .map(
                        (recommendation) => `
                      <li class="widget-recommendation">${recommendation.trim()}</li>
                    `,
                      )
                      .join("")}
                    </ul>
                </div>
              </div>
            </div>
            <div class="widget-step widget-step-loader">
              <span class="widget-loader-wrapper">
                <span class="widget-loader-percent">0%</span>
                <span class="widget-loader"></span>
              </span>
               <span class="widget-image-animation hidden">
                <span class="widget-image-animation-container">
                  <img id="widget-image-animated-1" src="" alt='image-animated-1'/>
                  <img id="widget-image-animated-2" src="" alt='image-animated-2'/>
                  </span>
                </span>
              <p>Getting you dressed</p>
              <span class="widget-background-image"></span>
            </div>
            <div class="widget-step widget-step-result">
              <div class="widget-left-block">
                <img class="widget-result-image" src=${imagePlaceholderURL} alt="result-image"/>
                <div class="widget-result-text">
                  <p>${modal_text_encouragement}</p>
                </div>
              </div>
              <div class="widget-right-block">
                <div class="widget-result-container">
                  <div class="widget-content-stage-1">
                     ${
                       sharedOptionsEnabled &&
                       sharedOptions.includes("shareApps")
                         ? `<div class="widget-share-apps-wrapper">
                        <label>
                          ${modal_text_2}
                        </label>
                        <div id="widget-share-apps" class="widget-share-apps"></div>
                    </div>`
                         : ""
                     }
                     ${
                       sharedOptionsEnabled &&
                       sharedOptions.includes("shareEmail")
                         ? `<div class="widget-share-email">
                        <div>
                          <input id="widget-result-text-checkbox" type="checkbox">
                          <label for="widget-result-text-checkbox">
                          ${modal_text}
                          </label>
                        </div>
                        <div class="widget-inputs widget-hidden">
                            <div class="widget-input-block">
                              <label>Friend email</label>
                              <input required id='widget-friends_data_1' placeholder="Enter friend email"></input>
                              <span class='widget-error widget-friends_data_1 widget-hidden'>Enter valid email</span>
                            </div>
                            <div class="widget-input-block">
                              <label>Friend email</label>
                              <input required id='widget-friends_data_2' placeholder="Enter friend email"></input>
                              <span class='widget-error widget-friends_data_2 widget-hidden'>Enter valid email</span>
                            </div>
                            <div class="widget-input-block">
                              <label>Your email</label>
                              <input required id='widget-your_email' placeholder="Enter your email"/>
                              <span class='widget-error widget-your_email widget-hidden'>Enter valid email</span>
                            </div>
                          </div>
                        <button id="widget-submitButton" class="widget-hidden">Send</button>
                      </div>`
                         : ""
                     }
                  </div>
                  <div class="widget-content-stage-2">
                   <button id="widget-result-action-button">${modal_button_text}</button>
                   ${
                     sharedOptionsEnabled && sharedOptions.length > 0
                       ? `<div class="widget-discount-block">
                    <label>Your discount code:</label>
                    <div class="widget-discount-block-content">
                      <span id="widget-discount-code"></span>
                      <span id="widget-copy">
                        <?xml version="1.0" encoding="utf-8"?>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </div>
                   </div>`
                       : ""
                   }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.append(modalBlock);

    this.modalBlock = modalBlock.querySelector(".widget-popup");

    this.abortController = new AbortController();
    this.timer = 0;
    this.imageLoaderInterval = 0;

    this.discountCode = "";
    this.modalId = -1;
    this.imageUrl = "";
    this.imageId = -1;
    this.tryOnUuid = "";
    this.backgroundImage = "";
    this.sharedOptionsEnabled = sharedOptionsEnabled;
    this.sharedOptions = sharedOptions;
  }

  connectedCallback() {
    const button = this.querySelector(".widget-button");
    this.openModal = this.openModal.bind(this);
    button.addEventListener("click", this.openModal);

    const closeBtn = this.modalBlock.querySelector(".widget-popup-close");
    this.closeModal = this.closeModal.bind(this);
    closeBtn.addEventListener("click", this.closeModal);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    const fileInput: HTMLInputElement = this.modalBlock.querySelector(
      "#widget-uploadInput",
    );
    fileInput.addEventListener("change", this.handleFileUpload.bind(this));

    const dropArea = this.modalBlock.querySelector(".widget-file-drop-area");

    fileInput.addEventListener("dragenter", function () {
      dropArea.classList.add("is-active");
    });

    fileInput.addEventListener("dragleave", function () {
      dropArea.classList.remove("is-active");
    });

    fileInput.addEventListener("focus", function () {
      dropArea.classList.add("is-active");
    });

    fileInput.addEventListener("blur", function () {
      dropArea.classList.remove("is-active");
    });

    fileInput.addEventListener("click", function () {
      dropArea.classList.add("is-active");
    });

    fileInput.addEventListener("drop", function () {
      dropArea.classList.remove("is-active");
    });

    if (this.sharedOptionsEnabled && this.sharedOptions.length > 0) {
      if (this.sharedOptions.includes("shareEmail")) {
        const checkbox: HTMLInputElement = this.modalBlock.querySelector(
          "#widget-result-text-checkbox",
        );
        this.handleCheckbox = this.handleCheckbox.bind(this);
        checkbox.addEventListener("change", this.handleCheckbox);

        const submitBtn = this.modalBlock.querySelector("#widget-submitButton");
        this.handleSubmit = this.handleSubmit.bind(this);
        submitBtn.addEventListener("click", this.handleSubmit);

        const userInputFriend1: HTMLInputElement =
          this.modalBlock.querySelector("#widget-friends_data_1");
        const userInputFriend2: HTMLInputElement =
          this.modalBlock.querySelector("#widget-friends_data_2");
        const userInput: HTMLInputElement =
          this.modalBlock.querySelector("#widget-your_email");

        const friendsData1 = "widget-friends_data_1";
        const friendsData2 = "widget-friends_data_2";
        const userData = "widget-your_email";

        userInputFriend1.addEventListener("blur", () =>
          this.validateInput(friendsData1, this.types.email, [
            friendsData2,
            userData,
          ]),
        );
        userInputFriend2.addEventListener("blur", () =>
          this.validateInput(friendsData2, this.types.email, [
            friendsData1,
            userData,
          ]),
        );
        userInput.addEventListener("blur", () =>
          this.validateInput(userData, this.types.email, [
            friendsData1,
            friendsData2,
          ]),
        );
      }

      const copyBtn = this.modalBlock.querySelector("#widget-copy");
      this.handleCopy = this.handleCopy.bind(this);
      copyBtn.addEventListener("click", this.handleCopy);
    }

    const resultBtn = this.modalBlock.querySelector(
      "#widget-result-action-button",
    );
    this.handleResultButton = this.handleResultButton.bind(this);
    resultBtn.addEventListener("click", this.handleResultButton);
  }

  // handlers
  async openModal() {
    this.setLoaderPercent(0);
    document.body.classList.add("widget-disabled-scroll");
    this.abortController = new AbortController();
    this.modalBlock = document.body.querySelector(".widget-popup");

    window.numeric_widget.signal = this.abortController.signal;

    if (window.numeric_widget.environment !== "sandbox") {
      await sendRequestProxy({ event_name: "click" }, "/event");
    }

    this.discountCode = "";
    this.modalId = new Date().valueOf();

    this.showUpload();

    this.modalBlock.style.display = "flex";

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    window.addEventListener("click", this.handleOutsideClick);
  }

  closeModal() {
    this.stopTimer();
    this.stopImageLoader();
    document.body.classList.remove("widget-disabled-scroll");
    this.modalBlock.style.display = "none";
    this.abortController.abort();
    window.numeric_widget.signal = null;

    window.removeEventListener("click", this.handleOutsideClick);

    this.resetModalState();
  }

  handleCheckbox(event) {
    const rightBlockInputs = this.modalBlock.querySelector(".widget-inputs");
    const submitBtn = this.modalBlock.querySelector("#widget-submitButton");

    if (event.target.checked) {
      rightBlockInputs.classList.remove("widget-hidden");
      submitBtn.classList.remove("widget-hidden");
    } else {
      rightBlockInputs.classList.add("widget-hidden");
      submitBtn.classList.add("widget-hidden");
    }
  }

  handleOutsideClick(event) {
    if (event.target === this.modalBlock) {
      this.closeModal();
    }
  }

  async handleResultButton(event) {
    if (window.numeric_widget.environment === "sandbox") {
      return;
    }

    const product = window.numeric_widget.product;
    const shopUrl = window.numeric_widget.shopUrl;

    event.target.setAttribute("disabled", true);

    const variant = getQueryParam("variant");
    let variantId = variant ? parseInt(variant) : product.variants[0].id;

    // apply our discount code
    this.discountCode !== "" &&
      (await sendRequest(`${shopUrl}/discount/${this.discountCode}`, "GET"));

    const funnel_id = window.numeric_widget.funnel_id;
    const data = {
      id: variantId,
      quantity: 1,
      properties: {
        "__widget-funnel_id": funnel_id,
      },
    };

    const response = await sendRequest("/cart/add.js", "POST", data);

    if (!response?.error) {
      switch (this.modalButtonBehaviour) {
        case "cart":
          window.location.href = `${shopUrl}/cart`;
          return;
        case "checkout":
          window.location.href = `${shopUrl}/checkout`;
          return;
      }
    }

    event.target.setAttribute("disabled", false);
  }

  async handleFileUpload(event) {
    this.showLoader("Validating your file...", null, true);
    const validatedFile = await validateFile(event);

    if ("error" in validatedFile) {
      return this.showUpload(validatedFile.error);
    }

    const imageURL = await getImageURL(validatedFile.data);
    if (!imageURL) {
      return this.showUpload("File not provided");
    }

    this.backgroundImage = imageURL;

    this.showLoader(
      "Nice picture! Uploading now...",
      this.backgroundImage,
      true,
    );

    if (!canMakeRequest()) {
      return this.showUpload(
        "You have reached your limit of 3 try ons! Come back soon to try more.",
      );
    }

    const uploadedFile = await uploadFile(validatedFile.data);
    if (uploadedFile?.error) {
      return this.showUpload(uploadedFile.error);
    }

    this.showLoader("Sending to our server...", this.backgroundImage, true);
    await this.generateImage(uploadedFile);
  }

  async handleSubmit() {
    const friendsData1 = "widget-friends_data_1";
    const friendsData2 = "widget-friends_data_2";
    const userData = "widget-your_email";

    const resultUser1Data = this.validateInput(friendsData1, this.types.email, [
      friendsData2,
      userData,
    ]);
    const resultUser2Data = this.validateInput(friendsData2, this.types.email, [
      friendsData1,
      userData,
    ]);
    const resultUserEmail = this.validateInput(userData, this.types.email, [
      friendsData2,
      friendsData1,
    ]);

    if (!resultUser1Data || !resultUserEmail || !resultUser2Data) {
      return;
    }

    this.showLoader("Sending your friends a discount...", null, true);

    // check if we are using sandbox
    if (window.numeric_widget.environment === "sandbox") {
      await sleep(2000);
      this.discountCode = "ANTLA-SANDBOX";
      return this.showEmailSend();
    }

    const response = await sendRequestProxy(
      {
        email: resultUserEmail,
        data_users: [resultUser1Data, resultUser2Data],
        imageId: this.imageId,
        tryOnUuid: this.tryOnUuid,
        shareMethod: "shareEmail",
      },
      "/submit",
    );

    if (response?.error) {
      console.log(response.error);
      return this.showResult();
    }

    this.discountCode = response.data.discountCode;

    const errorBlocks = this.modalBlock.querySelectorAll(`.widget-error`);
    errorBlocks.forEach((element) => {
      element.innerHTML = "";
    });

    this.showEmailSend();
  }

  showResult() {
    this.hideSteps();
    const resultStep = this.modalBlock.querySelector(".widget-step-result");
    resultStep.classList.remove("widget-stage-2");
    resultStep.classList.add("widget-stage-1");

    const image = resultStep.querySelector("img");
    image.src = this.imageUrl;

    resultStep.classList.add("widget-active");
  }

  showEmailSend() {
    this.hideSteps();
    const emailSendStep = this.modalBlock.querySelector(".widget-step-result");
    const discountCodeBlock = emailSendStep.querySelector(
      "#widget-discount-code",
    );
    const submitButton = emailSendStep.querySelector(
      "#widget-result-action-button",
    ) as HTMLButtonElement;

    const image = emailSendStep.querySelector("img");
    image.src = this.imageUrl;

    const variantId = getQueryParam("variant");

    const available = variantId
      ? window.numeric_widget.product?.variants?.find(
          (variant) => variant.id === parseInt(variantId),
        )?.available
      : window.numeric_widget.product?.variants?.[0]?.available || false;

    if (!available) {
      submitButton.setAttribute("disabled", "");
      submitButton.innerHTML = "Sold out";
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.innerHTML =
        window.numeric_widget.settings?.modal_button_text;
    }

    if (discountCodeBlock) {
      discountCodeBlock.innerHTML = this.discountCode;
    }
    emailSendStep.classList.remove("widget-stage-1");
    emailSendStep.classList.add("widget-stage-2");

    emailSendStep.classList.add("widget-active");
  }

  handleCopy(e) {
    copy(this.discountCode);

    const copyBlock = this.modalBlock.querySelector("#widget-copy");
    copyBlock.classList.add("widget-copied");
  }

  async handleClickSocial() {
    const sandbox = window.numeric_widget.environment === "sandbox";

    this.showLoader("", null, true);
    await sleep(sandbox ? 1000 : 15000);

    // check if we are using sandbox
    if (sandbox) {
      await sleep(2000);
      this.discountCode = "ANTLA-SANDBOX";
      return this.showEmailSend();
    }

    const response = await sendRequestProxy(
      {
        email: `${generateRandomString(6)}_${new Date().valueOf()}`,
        data_users: [`${generateRandomString(6)}_${new Date().valueOf()}`],
        imageId: this.imageId,
        tryOnUuid: this.tryOnUuid,
        shareMethod: "shareApps",
      },
      "/submit",
    );

    if (response?.error) {
      console.log(response.error);
      return this.showResult();
    }

    this.discountCode = response.data.discountCode;

    this.showEmailSend();
  }

  async generateImage(uploadedFile: string) {
    const productImage = getProductImage();
    this.animateImageLoader(uploadedFile, productImage);
    const response = await sendRequestProxy(
      { imageLink: uploadedFile, productImage },
      "/generate",
    );

    if (response?.error) {
      this.stopImageLoader();
      return this.showUpload(response.error);
    }

    const data = response.data;
    const trackId = data.uuid;
    const eta = data.eta;

    this.startTimer(eta);
    this.showLoader("Generating your image...", this.backgroundImage);
    return await this.checkImageGeneration(trackId, this.modalId);
  }

  async checkImageGeneration(trackId: string, modalId: number) {
    let attempt = 1;
    const maxAttempts = 20;
    const delay = 10000; // 10 sec;

    const pulling = async () => {
      if (this.modalId !== modalId) {
        return;
      }

      if (attempt > maxAttempts) {
        this.stopImageLoader();
        this.stopTimer();
        return this.showUpload("Timeout. Try again please.");
      }

      const attemptResponse = await sendRequestProxy(
        { track_id: trackId },
        "/pulling",
      );

      if (attemptResponse?.error) {
        this.stopImageLoader();
        this.stopTimer();
        return this.showUpload(attemptResponse.error);
      }

      const attemptData = attemptResponse.data;

      if (attemptData.status === "SUCCESS") {
        this.stopTimer();
        this.setLoaderPercent(100);
        this.imageUrl = attemptData.data?.data;
        this.imageId = attemptData.data?.imageId;
        this.tryOnUuid = attemptData.data?.tryOnUuid;
        this.stopImageLoader();
        await sleep(1000);
      }

      if (attemptData.status === "ERROR") {
        this.stopImageLoader();
        this.stopTimer();
        return this.showUpload(attemptData.data?.error);
      }

      await sleep(delay);

      attempt++;

      return await pulling();
    };

    await pulling();
  }

  validateInput(
    id: string,
    type: string,
    othersFields: string[],
    multiple = false,
  ) {
    const types = this.types;

    const input: HTMLInputElement = this.modalBlock.querySelector(`#${id}`);
    const others = othersFields.map(
      (field) =>
        (this.modalBlock.querySelector(`#${field}`) as HTMLInputElement).value,
    );

    if (!input) {
      return null;
    }

    const value = input.value.trim();
    const errorBlock = this.modalBlock.querySelector(`.widget-error.${id}`);

    if (!errorBlock) {
      return null;
    }

    function showInputError(errorMessage, errorBlock) {
      errorBlock.innerHTML = errorMessage;
    }

    function isValueDuplicate(value, others) {
      return others.some((val) => val.trim() === value.trim());
    }

    function checkType(val, types) {
      const emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phonePattern =
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

      if (type === types.email) {
        if (!emailPattern.test(val)) {
          showInputError(
            multiple
              ? "Some values are not valid email format"
              : "Invalid email format",
            errorBlock,
          );
          errorBlock.classList.remove("widget-hidden");
          return false;
        }
      } else if (type === types.phone) {
        if (!phonePattern.test(val)) {
          showInputError(
            multiple
              ? "Some values are not valid phone format"
              : "Invalid phone format",
            errorBlock,
          );
          errorBlock.classList.remove("widget-hidden");
          return false;
        }
      } else if (type === types.phoneEmail) {
        if (!emailPattern.test(val) && !phonePattern.test(val)) {
          showInputError(
            multiple
              ? "Some values are not valid email/phone format"
              : "Invalid email/phone format",
            errorBlock,
          );
          errorBlock.classList.remove("widget-hidden");
          return false;
        }
      } else {
        return null;
      }

      if (isValueDuplicate(value, others)) {
        showInputError("Value is duplicate", errorBlock);
        errorBlock.classList.remove("widget-hidden");
        return false;
      }

      return true;
    }

    if (value === "" || value === null) {
      showInputError("Value can't be empty", errorBlock);
      errorBlock.classList.remove("widget-hidden");
      return false;
    }

    if (multiple) {
      const values = value.split("\n").filter((val) => !!val.length);
      if (values.length < 1 || values.length > 10) {
        showInputError(
          "Total count of values must be in range 1 - 10",
          errorBlock,
        );
        errorBlock.classList.remove("widget-hidden");
        return false;
      }

      for (const val of values) {
        const result = checkType(val, types);
        if (!result) {
          return result;
        }
      }

      errorBlock.classList.add("widget-hidden");
      return values;
    } else {
      const result = checkType(value, types);
      console.log(result);
      if (!result) {
        console.log(result, "r");
        return result;
      }

      console.log("da");
      errorBlock.classList.add("widget-hidden");
      return value;
    }
  }

  showUpload(error?: string) {
    this.hideSteps();
    const errorBlock = this.modalBlock.querySelector("#widget-errorUpload");
    if (error) {
      const inputFile: HTMLInputElement = this.modalBlock.querySelector(
        "#widget-uploadInput",
      );
      inputFile.value = "";

      errorBlock.innerHTML = error;
      errorBlock.classList.remove("widget-hidden");
    } else {
      errorBlock.classList.add("widget-hidden");
    }
    const uploadStep = this.modalBlock.querySelector(".widget-step-upload");
    uploadStep.classList.add("widget-active");
  }

  animateImageLoader(firstImageUrl: string, secondImageUrl: string) {
    const block = this.modalBlock.querySelector(".widget-image-animation");
    block.classList.remove("hidden");

    let p = 0;

    const image1: HTMLImageElement = this.modalBlock.querySelector(
      "#widget-image-animated-1",
    );
    const image2: HTMLImageElement = this.modalBlock.querySelector(
      "#widget-image-animated-2",
    );
    image1.src = firstImageUrl;
    image2.src = secondImageUrl;

    function moveit() {
      p += 0.02;

      const r = 25;
      const xCenter = 50;
      const yCenter = 50;

      const newLeft = Math.floor(xCenter + r * Math.cos(p + 90));
      const newTop = Math.floor(yCenter + r * Math.sin(p + 90));
      const newLeft1 = Math.floor(xCenter + -(r * Math.cos(p + 90)));
      const newTop1 = Math.floor(yCenter + -(r * Math.sin(p + 90)));

      image1.style.top = newTop + "px";
      image1.style.left = newLeft + "px";
      image2.style.top = newTop1 + "px";
      image2.style.left = newLeft1 + "px";
    }

    this.imageLoaderInterval = window.setInterval(moveit, 10);
  }

  stopImageLoader() {
    const block = this.modalBlock.querySelector(".widget-image-animation");
    block.classList.add("hidden");
    clearInterval(this.imageLoaderInterval);
  }

  setLoaderPercent(percent: number) {
    const loaderStep = this.modalBlock.querySelector(".widget-step-loader");
    const percentBlock = loaderStep.querySelector(".widget-loader-percent");
    percentBlock.innerHTML = `${percent}%`;
  }

  startTimer(eta: number) {
    const _eta = eta;
    let elapsedTime = 0;
    this.stopTimer();

    const timer: number = window.setInterval(() => {
      const percentageElapsed = Math.round((elapsedTime / _eta) * 100);
      elapsedTime++;

      if (elapsedTime === 10) {
        this.showLoader("Getting you dressed...", this.backgroundImage);
      }

      if (elapsedTime === 20) {
        this.showLoader("Oh you look nice...", this.backgroundImage);
      }

      if (elapsedTime === 30) {
        this.showLoader("Final touches...", this.backgroundImage);
      }

      if (elapsedTime === 40) {
        this.showLoader("You going to love this...", this.backgroundImage);
      }

      if (percentageElapsed >= 99) {
        clearInterval(timer);
        this.setLoaderPercent(99);
      } else {
        this.setLoaderPercent(percentageElapsed);
      }
    }, 1000);

    this.timer = timer;
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setLoaderPercent(0);
  }

  showLoader(
    text: string,
    background: string | null = null,
    hidePercent: boolean = false,
  ) {
    this.hideSteps();
    const loaderStep = this.modalBlock.querySelector(".widget-step-loader");
    const textBlock = loaderStep.querySelector("p");
    const backgroundBlock: HTMLSpanElement = loaderStep.querySelector(
      ".widget-background-image",
    );
    const percentBlock: HTMLSpanElement = loaderStep.querySelector(
      ".widget-loader-percent",
    );
    textBlock.innerHTML = text ?? "Getting you dressed";

    if (hidePercent) {
      percentBlock.classList.add("widget-hidden");
    } else {
      percentBlock.classList.remove("widget-hidden");
    }

    if (background) {
      backgroundBlock.style.backgroundImage = `url(${background})`;
    } else {
      backgroundBlock.style.backgroundImage = "";
    }

    loaderStep.classList.add("widget-active");
  }

  resetModalState() {
    if (this.sharedOptionsEnabled && this.sharedOptions.length > 0) {
      if (this.sharedOptions.includes("shareEmail")) {
        const user1Input: HTMLInputElement = this.modalBlock.querySelector(
          `#widget-friends_data_1`,
        );
        const user2Input: HTMLInputElement = this.modalBlock.querySelector(
          `#widget-friends_data_2`,
        );
        const emailInput: HTMLInputElement =
          this.modalBlock.querySelector(`#widget-your_email`);

        user1Input.value = "";
        user2Input.value = "";
        emailInput.value = "";
      }

      if (this.sharedOptions.includes("shareApps")) {
        const socialBlock = this.modalBlock.querySelector(
          "#widget-share-apps",
        ) as HTMLDivElement;
        socialBlock.innerHTML = "";
      }

      const discountBlock: HTMLSpanElement = this.modalBlock.querySelector(
        `.widget-step-result #widget-discount-code`,
      );
      const copyBlock: HTMLSpanElement = this.modalBlock.querySelector(
        `.widget-step-result #widget-copy`,
      );
      discountBlock.innerHTML = "";
      copyBlock.classList.remove("widget-copied");
    }

    const imageResult: HTMLImageElement = this.modalBlock.querySelector(
      `.widget-step-result img`,
    );
    const resultBtn: HTMLButtonElement = this.modalBlock.querySelector(
      "#widget-result-action-button",
    );

    const inputError = this.modalBlock.querySelector("#widget-errorUpload");
    inputError.classList.add("widget-hidden");

    const inputFile: HTMLInputElement = document.getElementById(
      "widget-uploadInput",
    ) as HTMLInputElement;
    inputFile.value = "";

    const errorBlocks = this.modalBlock.querySelectorAll(`.widget-error`) || [];
    errorBlocks.forEach((element) => {
      element.innerHTML = "";
    });

    this.discountCode = "";
    resultBtn.removeAttribute("disabled");
    imageResult.src = imagePlaceholderURL;
  }

  hideSteps() {
    const steps = this.modalBlock.querySelectorAll(".widget-step");
    steps.forEach((step) => {
      step.classList.remove("widget-active");
    });
  }
}

customElements.define("widget-block", WidgetBlock);
