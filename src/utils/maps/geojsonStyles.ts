import { STYLE_REGISTRY, BASE_STYLE } from '@/constants/geojsonConstants';

import { extractFeatureTypeKey } from './geojsonInteractions';

import type { ColorBreaks } from '@/types/geojsonTypes';
import type { PathOptions } from 'leaflet';

export const getColor = (
  value: number | undefined,
  breaks: ColorBreaks,
  fallback: string = '#FFEDA0',
): string => {
  if (value === null || value === undefined) return fallback;

  const sortedBreaks = Object.keys(breaks)
    .map(Number)
    .sort((previousValue, nextValue) => previousValue - nextValue);

  for (let index = sortedBreaks.length - 1; index >= 0; index--) {
    const threshold = sortedBreaks[index];
    if (value > threshold) {
      return breaks[threshold];
    }
  }

  return fallback;
};

export const getStyleFromFeature = (feature?: GeoJSON.Feature): PathOptions => {
  if (!feature) return {};

  const id = feature.id?.toString() ?? 'WHSE_FOREST_VEGETATION.RSLT_OPENING_SVW';
  const typeKey = extractFeatureTypeKey(id);
  const config = STYLE_REGISTRY[typeKey];

  if (!config) {
    return { ...BASE_STYLE, fillColor: '#CCCCCC' };
  }
  const value = config.colorBreakExtractor(feature);
  const fillColor = getColor(value, config.breaks, config.fallbackColor);

  return { ...BASE_STYLE, fillColor };
};
