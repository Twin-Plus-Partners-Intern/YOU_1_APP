import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeImage } from '../common/SafeImage';
import Svg, { Path, Circle, Rect, Ellipse, G, Text as SvgText } from 'react-native-svg';

export interface JayCharacterProps {
  outfitId?: string;
  imageUrl?: string;
  size?: number;
  width?: number;
  height?: number;
}

export const JayCharacter: React.FC<JayCharacterProps> = ({
  outfitId = 'outfit_green_sweater',
  imageUrl,
  size,
  width: customWidth,
  height: customHeight,
}) => {
  const width = customWidth || size || 240;
  const height = customHeight || size || 280;
  const [imageError, setImageError] = useState(false);

  if (imageUrl && !imageError) {
    return (
      <View style={{ width, height }} className="items-center justify-center">
        <SafeImage
          source={{ uri: imageUrl }}
          style={{ width, height }}
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={200}
          onError={() => setImageError(true)}
        />
      </View>
    );
  }

  // Render outfit specific SVG graphics
  const renderOutfitBody = () => {
    switch (outfitId) {
      case 'outfit_black_hoodie':
        return (
          <G>
            {/* Cap Base & Visor */}
            <Path d="M80 62 C80 32, 160 32, 160 62 Z" fill="#171717" />
            <Rect x="75" y="58" width="90" height="8" rx="4" fill="#0D0D0D" />
            {/* White "J" on Cap */}
            <SvgText
              x="120"
              y="52"
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
            >
              J
            </SvgText>

            {/* Black Hoodie Torso */}
            <Path d="M72 135 Q120 128 168 135 L176 195 Q120 200 64 195 Z" fill="#1F1F1F" />
            {/* Hood Strings & Pocket */}
            <Path d="M102 140 L104 165 M138 140 L136 165" stroke="#404040" strokeWidth="2.5" />
            <Path d="M88 172 Q120 168 152 172 L158 192 Q120 196 82 192 Z" fill="#121212" />

            {/* White "J" Logo on Chest */}
            <SvgText
              x="120"
              y="160"
              fill="#FFFFFF"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
            >
              J
            </SvgText>

            {/* Crossbody Bag Strap */}
            <Path d="M80 135 L165 190" stroke="#0A0A0A" strokeWidth="6" />
            <Rect x="135" y="170" width="22" height="18" rx="4" fill="#0A0A0A" />

            {/* Cargo Pants */}
            <Path
              d="M78 194 L70 248 L108 248 L120 205 L132 248 L170 248 L162 194 Z"
              fill="#262626"
            />
            <Rect x="68" y="215" width="14" height="18" rx="3" fill="#1A1A1A" />
            <Rect x="158" y="215" width="14" height="18" rx="3" fill="#1A1A1A" />

            {/* White Sneakers */}
            <Path d="M62 248 Q88 244 110 248 L110 258 Q85 260 62 258 Z" fill="#FFFFFF" />
            <Path d="M130 248 Q152 244 178 248 L178 258 Q155 260 130 258 Z" fill="#FFFFFF" />
            <Rect x="62" y="254" width="48" height="4" fill="#E5E5E5" />
            <Rect x="130" y="254" width="48" height="4" fill="#E5E5E5" />
          </G>
        );

      case 'outfit_blue_beanie':
        return (
          <G>
            {/* Blue Beanie */}
            <Path d="M82 65 C82 30, 158 30, 158 65 Z" fill="#1E3A8A" />
            <Rect x="78" y="58" width="84" height="12" rx="4" fill="#1D4ED8" />
            <Circle cx="120" cy="28" r="8" fill="#1D4ED8" />
            <SvgText
              x="120"
              y="52"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              J
            </SvgText>

            {/* Blue Puffer Jacket Torso */}
            <Path d="M70 135 Q120 128 170 135 L175 195 Q120 200 65 195 Z" fill="#1E40AF" />
            <Path
              d="M70 155 Q120 150 170 155 M70 175 Q120 170 170 175"
              stroke="#1D4ED8"
              strokeWidth="2"
            />
            <Path d="M120 135 L120 198" stroke="#1E3A8A" strokeWidth="3" />

            {/* Dark Pants & Sneakers */}
            <Path
              d="M78 194 L72 248 L108 248 L120 205 L132 248 L168 248 L162 194 Z"
              fill="#1F2937"
            />
            <Path d="M64 248 Q88 244 108 248 L108 258 Q85 260 64 258 Z" fill="#FFFFFF" />
            <Path d="M132 248 Q152 244 176 248 L176 258 Q155 260 132 258 Z" fill="#FFFFFF" />
          </G>
        );

      case 'outfit_red_festival':
        return (
          <G>
            {/* Red Traditional Hat */}
            <Path d="M85 62 Q120 40 155 62 Z" fill="#DC2626" />
            <Rect x="80" y="58" width="80" height="8" rx="4" fill="#991B1B" />
            <Circle cx="120" cy="42" r="4" fill="#FBBF24" />

            {/* Red Tunic */}
            <Path d="M68 135 Q120 128 172 135 L178 210 Q120 215 62 210 Z" fill="#DC2626" />
            <Path d="M120 135 L120 212" stroke="#FBBF24" strokeWidth="3" />
            {/* Gold knots */}
            <Circle cx="120" cy="155" r="3" fill="#FBBF24" />
            <Circle cx="120" cy="175" r="3" fill="#FBBF24" />
            <Circle cx="120" cy="195" r="3" fill="#FBBF24" />

            {/* Golden Fan in hand */}
            <Path d="M165 170 Q185 150 170 140 Z" fill="#F59E0B" />

            {/* Dark Trousers & Black Shoes */}
            <Path
              d="M78 208 L74 248 L106 248 L120 215 L134 248 L166 248 L162 208 Z"
              fill="#7F1D1D"
            />
            <Path d="M64 248 Q86 245 106 248 L106 258 L64 258 Z" fill="#111827" />
            <Path d="M134 248 Q154 245 176 248 L176 258 L134 258 Z" fill="#111827" />
          </G>
        );

      case 'outfit_green_sweater':
      default:
        return (
          <G>
            {/* Off-White / Light Green Sweater */}
            <Path d="M70 135 Q120 126 170 135 L178 192 Q120 198 62 192 Z" fill="#ECFDF5" />
            {/* Sweater Collar */}
            <Path d="M100 132 Q120 142 140 132" fill="none" stroke="#D1FAE5" strokeWidth="4" />

            {/* Green "J" Logo on Chest */}
            <SvgText
              x="135"
              y="168"
              fill="#00EE00"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
            >
              J
            </SvgText>

            {/* Waving Arm (Left side arm) */}
            <Path
              d="M68 140 Q45 125 54 110"
              stroke="#ECFDF5"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <Circle cx="54" cy="110" r="9" fill="#FFDFC4" />

            {/* Right Arm Down */}
            <Path
              d="M170 140 Q182 165 178 185"
              stroke="#ECFDF5"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <Circle cx="178" cy="188" r="8" fill="#FFDFC4" />

            {/* Green Shorts */}
            <Path
              d="M78 190 L70 225 L108 225 L120 198 L132 225 L170 225 L162 190 Z"
              fill="#008F00"
            />

            {/* Legs */}
            <Rect x="82" y="225" width="16" height="25" fill="#FFDFC4" />
            <Rect x="142" y="225" width="16" height="25" fill="#FFDFC4" />

            {/* Green Sneakers with White Soles */}
            <Path d="M66 246 Q88 240 108 246 L108 258 Q85 260 66 258 Z" fill="#00EE00" />
            <Path d="M132 246 Q152 240 174 246 L174 258 Q155 260 132 258 Z" fill="#00EE00" />
            <Rect x="66" y="254" width="42" height="4" rx="2" fill="#FFFFFF" />
            <Rect x="132" y="254" width="42" height="4" rx="2" fill="#FFFFFF" />
          </G>
        );
    }
  };

  return (
    <View className="items-center justify-center">
      <Svg width={width} height={height} viewBox="0 0 240 280" fill="none">
        {/* Background shadow glow */}
        <Ellipse cx="120" cy="265" rx="65" ry="10" fill="rgba(0, 238, 0, 0.12)" />

        {/* Head Base */}
        {/* Hair Back */}
        <Path d="M65 85 C55 35, 185 35, 175 85 Z" fill="#4A3525" />

        {/* Face Skin */}
        <Ellipse cx="120" cy="98" rx="46" ry="42" fill="#FFDFC4" />

        {/* Hair Front Bangs */}
        <Path
          d="M72 75 Q90 95 108 78 Q125 96 142 78 Q160 95 168 75 Q150 48 120 48 Q90 48 72 75 Z"
          fill="#4A3525"
        />

        {/* Cute Ears */}
        <Circle cx="72" cy="98" r="9" fill="#FFDFC4" />
        <Circle cx="168" cy="98" r="9" fill="#FFDFC4" />

        {/* Glasses (Round thin frames) */}
        <Circle cx="98" cy="96" r="18" fill="none" stroke="#A3A3A3" strokeWidth="2.5" />
        <Circle cx="142" cy="96" r="18" fill="none" stroke="#A3A3A3" strokeWidth="2.5" />
        <Path d="M116 96 L124 96" stroke="#A3A3A3" strokeWidth="2.5" />

        {/* Expressive Eyes */}
        <Ellipse cx="98" cy="96" rx="7" ry="9" fill="#2E4034" />
        <Ellipse cx="142" cy="96" rx="7" ry="9" fill="#2E4034" />
        {/* Eye Catchlights */}
        <Circle cx="96" cy="93" r="2.5" fill="#FFFFFF" />
        <Circle cx="140" cy="93" r="2.5" fill="#FFFFFF" />

        {/* Eyebrows */}
        <Path
          d="M88 82 Q98 78 108 82"
          stroke="#3A2719"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M132 82 Q142 78 152 82"
          stroke="#3A2719"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Friendly Smile */}
        <Path
          d="M112 112 Q120 118 128 112"
          stroke="#8D5B4C"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blush */}
        <Ellipse cx="84" cy="106" rx="6" ry="3" fill="rgba(239, 68, 68, 0.25)" />
        <Ellipse cx="156" cy="106" rx="6" ry="3" fill="rgba(239, 68, 68, 0.25)" />

        {/* Body & Outfit Components */}
        {renderOutfitBody()}
      </Svg>
    </View>
  );
};

export default JayCharacter;
