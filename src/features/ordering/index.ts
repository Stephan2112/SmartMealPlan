export const startOrderFlow = (urls: string[]) => {
  urls.forEach((url) => window.open(url, '_blank'))
}