import type { Feature } from 'geojson';

export type ColorBreaks = Record<number, string>;
export type FeaturePropExtractor = (feature: Feature) => number | undefined;
export type FeatureStylingConfig = {
  breaks: ColorBreaks;
  fallbackColor: string;
  colorBreakExtractor: FeaturePropExtractor;
  infoExtractor?: (feature: Feature) => Record<string, string | number | boolean>;
};
