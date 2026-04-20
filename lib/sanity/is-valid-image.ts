export function isValidSanityImage(
  image: unknown,
): image is { asset: { _ref?: string; _id?: string } } {
  if (!image || typeof image !== "object") return false;

  const maybeImage = image as {
    asset?: { _ref?: string; _id?: string };
  };

  return Boolean(maybeImage.asset?._ref || maybeImage.asset?._id);
}