import { getJayAssetUrl } from '../utils/cloudinary';
import { OutfitItem } from '@you-il/types';

export interface JayOutfitItem extends OutfitItem {
  fileName: string;
  imageUrl: string;
}

export const JAY_OUTFIT_RAW_DATA = [
  {
    id: 'outfit_black',
    name: 'Streetwear Black',
    fileName: 'bg_removal_Background_removed',
    streakRequired: 28,
    unlocked: true,
  },
  {
    id: 'outfit_navy',
    name: 'Winter Navy',
    fileName: 'bg_removal_Background_removed_1',
    streakRequired: 14,
    unlocked: true,
  },
  {
    id: 'outfit_red',
    name: 'Festival Red',
    fileName: 'upscale_image_Upscaled',
    streakRequired: 32,
    unlocked: true,
  },
  {
    id: 'outfit_dino',
    name: 'Dino Green Hoodie',
    fileName: 'upscale_image_Upscaled_1',
    streakRequired: 40,
    unlocked: true,
  },
  {
    id: 'outfit_school',
    name: 'School Uniform',
    fileName: 'bg_removal_Background_removed_2',
    streakRequired: 20,
    unlocked: true,
  },
];

export const getJayIntroImageUrl = (): string => {
  return getJayAssetUrl('Layer_1');
};

export const getJayOutfits = (): JayOutfitItem[] => {
  return JAY_OUTFIT_RAW_DATA.map((item) => ({
    ...item,
    imageUrl: getJayAssetUrl(item.fileName),
  }));
};

export const characterService = {
  getJayIntroImageUrl,
  getJayOutfits,
};
