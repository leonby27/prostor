const LOCAL_IMAGE_VERSION = "midrange-20260611";

export function versionedImage(src: string) {
  return `${src}?v=${LOCAL_IMAGE_VERSION}`;
}
