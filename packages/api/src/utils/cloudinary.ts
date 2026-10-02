/**
 * Cloudinary Utility for YOU-1 App Assets
 */

const DEFAULT_CLOUD_NAME = 'mfu9ipd3';

export const getCloudinaryCloudName = (): string => {
  return process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME;
};

/**
 * Returns the optimized Cloudinary CDN URL for Jay character asset images
 * @param identifier Image public_id or filename on Cloudinary
 * @example getJayAssetUrl('Layer_1') -> https://res.cloudinary.com/mfu9ipd3/image/upload/f_auto,q_auto/Layer_1
 */
export const getJayAssetUrl = (identifier: string): string => {
  const cloudName = getCloudinaryCloudName();
  let cleanId = identifier.trim();

  // Strip extension if passed as filename (e.g., Layer_1.png -> Layer_1)
  if (cleanId.match(/\.(png|jpg|jpeg|webp)$/i)) {
    cleanId = cleanId.replace(/\.(png|jpg|jpeg|webp)$/i, '');
  }

  // Handle mapped filename variants from original spec
  const filenameMap: Record<string, string> = {
    Layer_1: 'Layer_1',
    bg_removal: 'bg_removal_Background_removed',
    'bg_removal.jpg': 'bg_removal_Background_removed',
    'bg_removal (1).jpg': 'bg_removal_Background_removed_1',
    'bg_removal (2).jpg': 'bg_removal_Background_removed_2',
    'upscale_image.jpg': 'upscale_image_Upscaled',
    'upscale_image (1).jpg': 'upscale_image_Upscaled_1',
  };

  const targetId = filenameMap[cleanId] || filenameMap[identifier] || cleanId;
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${targetId}`;
};
