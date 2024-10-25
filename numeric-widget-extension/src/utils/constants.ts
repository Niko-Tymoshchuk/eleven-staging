export enum actions {
  generateImage = "generate_image",
  submitForm = "submit_form",
  getPresignedUrl = "get_presigned_url",
  clickEvent = "event_click",
}

export const requestKey = import.meta.env
  .VITE_ELEVEN_JEWELRY_BLOCK_STORAGE_KEY as string;
export const proxyURL = import.meta.env
  .VITE_ELEVEN_JEWELRY_BLOCK_PROXY_URL as string;
export const imagePlaceholderURL = import.meta.env
  .VITE_ELEVEN_JEWELRY_BLOCK_IMAGE_PLACEHOLDER as string;
