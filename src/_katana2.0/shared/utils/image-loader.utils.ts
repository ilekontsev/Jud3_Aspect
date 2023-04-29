export const loadImages = (imageSrc: Record<string, string>): Record<string, HTMLImageElement> => {
  return Object.entries(imageSrc).reduce((obj, [key, value]) => {
    const image = new Image();
    image.src = value;
    obj[key] = image;
    return obj;
  }, {});
};
