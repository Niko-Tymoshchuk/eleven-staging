import { requestKey, proxyURL } from "./constants";
import loadImage from "blueimp-load-image";

export function copy(text: string) {
  navigator.clipboard.writeText(text);
}

export function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function generateRandomString(length: number, chars?: string) {
  const defaultChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const characterSet = chars || defaultChars;
  let result = "";

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    result += characterSet.charAt(randomValues[i] % characterSet.length);
  }

  return result;
}

export function canMakeRequest() {
  const limitInSeconds = 60 * 10; // 10 min

  // TODO: replace to 3 after review
  const maxRequests = 10;

  const currentTime = Date.now();
  const requestHistory = JSON.parse(localStorage.getItem(requestKey)) || [];

  const validRequests = requestHistory.filter(
    (timestamp) => currentTime - timestamp < limitInSeconds * 1000,
  );

  if (validRequests.length < maxRequests) {
    validRequests.push(currentTime);
    localStorage.setItem(requestKey, JSON.stringify(validRequests));
    return true;
  } else {
    return false;
  }
}

export function getProductImage() {
  const product = window.numeric_widget.product;
  const customImages = window.numeric_widget.product?.customImages || [];
  const selectedOrAvailable =
    window.numeric_widget.product?.firstAvailableOrSelected || null;
  const prefix = "gid://shopify/ProductVariant";

  const variantId = getQueryParam("variant");
  const featuredImage = "https:" + product?.featured_image + "&width=512";
  if (!variantId) {
    if (selectedOrAvailable) {
      const image = customImages.find(
        (image) => image.id === `${prefix}/${selectedOrAvailable.id}`,
      );
      return image ? image.url : featuredImage;
    }

    return featuredImage;
  }

  const selectedVariant = product.variants.find(
    (variant) => variant.id === parseInt(variantId),
  );
  if (!selectedVariant) {
    return featuredImage;
  }

  const image = customImages.find(
    (image) => image.id === `${prefix}/${selectedVariant.id}`,
  );

  if (image) {
    return image.url;
  }

  if (!selectedVariant.featured_image) {
    return featuredImage;
  }

  return "https:" + selectedVariant.featured_image?.src + "&width=512";
}

export async function sendRequest(
  href: string,
  method = "GET",
  body = null,
  skipHeaders = false,
) {
  try {
    const options = body
      ? {
          body:
            body instanceof FormData || body instanceof File
              ? body
              : JSON.stringify(body),
          headers: skipHeaders
            ? {}
            : {
                "Content-Type":
                  body instanceof FormData
                    ? "multipart/form-data"
                    : "application/json",
              },
        }
      : {};

    const response = await fetch(href, {
      method,
      ...options,
      signal: window.numeric_widget.signal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      console.log("Error while parse JSON");
    }

    if (response.ok) {
      return data;
    } else {
      throw new Error(data?.error);
    }
  } catch (err) {
    console.log(err);
    return { error: err?.message || "Something went wrong. Try again later." };
  }
}

export async function sendRequestProxy(body: object | null, path = null) {
  const data = generateRequestData(body);

  let url = proxyURL;

  if (path) {
    url += path;
  }

  return await sendRequest(url, "POST", data);
}

export function generateRequestData(
  data: object | null,
  shouldFormData: boolean = false,
  excludeDefaultValues: boolean = false,
) {
  const funnel_id: any = window.numeric_widget.funnel_id;
  const product_id = window.numeric_widget.product.id;

  if (shouldFormData) {
    const formData = new FormData();
    if (excludeDefaultValues === false) {
      formData.set("funnel_id", funnel_id);
      formData.set("product_id", product_id);
    }
    if (typeof data === "object" && data) {
      Object.entries(data).forEach(([key, value]) => formData.set(key, value));
    }

    return formData;
  }

  return { funnel_id, product_id, ...(data ? data : {}) };
}

export async function validateFile(
  event,
): Promise<{ data: File } | { error: string }> {
  const allowedTypes = ["image/jpeg", "image/png"];

  return new Promise((resolve, reject) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0] as File;

      if (!allowedTypes.includes(file.type)) {
        return reject({
          error: "Please select a valid image file (JPEG, PNG)",
        });
      }

      if (file.size / 1024 / 1024 > 10) {
        return reject({ error: "Max file size - 10 MB" });
      }

      loadImage(
        file,
        function (img, data) {
          //@ts-ignore
          if (img.type === "error") {
            return reject({ error: "Error loading image file" });
          }

          if ("toBlob" in img) {
            img.toBlob(function (blob) {
              if (!data.imageHead) {
                if (data?.originalWidth >= data?.originalHeight) {
                  return reject({ error: "Please select a vertical image" });
                } else {
                  resolve({
                    data: new File([blob], "file", { type: "image/jpeg" }),
                  });
                }
              }

              if (data.exif) {
                //@ts-ignore
                loadImage.writeExifData(data?.imageHead, "Orientation", 1);
              }

              loadImage.replaceHead(blob, data?.imageHead, function (newBlob) {
                resolve({
                  data: new File([newBlob], "file", { type: "image/jpeg" }),
                });
              });
            }, "image/jpeg");
          } else {
            reject({
              error:
                "Unfortunately, your browser does not support this functionality. 😦. Please use another",
            });
          }
        },
        // @ts-ignore
        { meta: true, crop: true, orientation: true, aspectRatio: 9 / 16 },
      );
    } else {
      reject({ error: "No file selected" });
    }
  })
    .then((res: { data: File }) => res)
    .catch((err: { error: string }) => err);
}

export async function getImageURL(file: File): Promise<string | null> {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function (error) {
      console.error(error);
      resolve(null);
    };
    reader.readAsDataURL(file);
  })
    .then((res: string) => res)
    .catch((err: string) => err);
}

export async function uploadFile(file: File) {
  const presignedUrl = await sendRequestProxy(
    { content_type: file.type },
    "/presigned_url",
  );

  if (!presignedUrl) {
    return { error: "Error when tried to upload your photo. Please try again" };
  }

  if (presignedUrl?.error) {
    return { error: presignedUrl.error };
  }

  const response = await sendRequest(presignedUrl.data, "PUT", file, true);

  if (response?.error) {
    return { error: response.error };
  }

  return presignedUrl.data?.split("?")?.[0];
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
