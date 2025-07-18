import type { FeatureStylingConfig } from '@/types/geojsonTypes';
import type { PathOptions } from 'leaflet';

/**
 * Default styles for GeoJSON layers.
 * These styles can be used to set the appearance of GeoJSON features on a map.
 */
export const BASE_STYLE: PathOptions = {
  weight: 2,
  opacity: 1,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.5,
};

/**
 * Highlight styles for GeoJSON layers.
 * These styles can be used to set the appearance of GeoJSON features on a map when they are hovered or selected.
 */
export const HIGHLIGHT_STYLE: PathOptions = {
  weight: 5,
  color: 'black',
  dashArray: '5',
  fillOpacity: 0.7,
};

//TODO: This entire constant content is temporary, but the structure is final.
export const STYLE_REGISTRY: Record<string, FeatureStylingConfig> = {
  'WHSE_FOREST_VEGETATION.RSLT_OPENING_SVW': {
    breaks: {},
    fallbackColor: '#FFEDA0',
    colorBreakExtractor: (f) => f.properties?.OPENING_ID,
    infoExtractor: (f) => ({
      'Opening ID': f.properties?.OPENING_ID,
      District: `${f.properties?.DISTRICT_NAME} (${f.properties?.DISTRICT_CODE})`,
      Category: f.properties?.OPENING_CATEGORY_CODE,
      Status: f.properties?.OPENING_STATUS_CODE,
      Region: `${f.properties?.REGION_NAME} (${f.properties?.REGION_CODE})`,
    }),
  },
  'WHSE_FOREST_TENURE.FTEN_CUT_BLOCK_POLY_SVW': {
    breaks: {},
    fallbackColor: '#F0F4C3',
    colorBreakExtractor: (f) => f.properties?.size,
    infoExtractor: (f) => ({
      'File id': f.properties?.CUT_BLOCK_FOREST_FILE_ID,
      'Block id': f.properties?.CUT_BLOCK_ID,
      Client: `${f.properties?.CLIENT_NAME} (${f.properties?.CLIENT_NUMBER})`,
      Location: f.properties?.CLIENT_LOCATION_CODE,
      'Admin District': `${f.properties?.ADMIN_DISTRICT_NAME} (${f.properties?.ADMIN_DISTRICT_CODE})`,
      'Geo District': `${f.properties?.GEOGRAPHIC_DISTRICT_NAME} (${f.properties?.GEOGRAPHIC_DISTRICT_CODE})`,
      Status: f.properties?.BLOCK_STATUS_CODE,
      'Life Cycle Status': f.properties?.LIFE_CYCLE_STATUS_CODE,
      'Map Label': f.properties?.MAP_LABEL,
    }),
  },
  'WHSE_FOREST_VEGETATION.RSLT_STANDARDS_UNIT_SVW': {
    breaks: {
      100: '#800026',
      50: '#BD0026',
      20: '#E31A1C',
      10: '#FC4E2A',
      5: '#FD8D3C',
      2: '#FEB24C',
      1: '#FED976',
    },
    fallbackColor: '#FFEDA0',
    colorBreakExtractor: (f) => parseFloat(f.properties?.NET_AREA),
    infoExtractor: (f) => ({
      'Standard Unit id': f.properties?.STANDARDS_UNIT_ID,
      SSUID: f.properties?.STOCKING_STANDARD_UNIT_ID,
      Area: `${f.properties?.NET_AREA} ha`,
    }),
  },
  'WHSE_FOREST_VEGETATION.RSLT_ACTIVITY_TREATMENT_SVW': {
    breaks: {},
    fallbackColor: '#FFEDA0',
    colorBreakExtractor: (f) => f.properties?.SILV_BASE_CODE,
    infoExtractor: (f) => ({
      'ATU id': f.properties?.ACTIVITY_TREATMENT_UNIT_ID,
      'Base code': f.properties?.SILV_BASE_CODE,
    }),
  },
  'WHSE_FOREST_VEGETATION.RSLT_PLANTING_SVW': {
    breaks: {},
    fallbackColor: '#FFEDA0',
    colorBreakExtractor: (f) => f.properties?.SILV_BASE_CODE,
    infoExtractor: (f) => ({
      'ATU Id': f.properties?.ACTIVITY_TREATMENT_UNIT_ID,
      Sequence: f.properties?.PLANTING_RESULTS_SEQ_NUMBER,
      'Base code': f.properties?.SILV_BASE_CODE,
      'Species code': f.properties?.SILV_TREE_SPECIES_CODE,
    }),
  },
  'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_INV_SVW': {
    breaks: {
      100: '#800026',
      50: '#BD0026',
      20: '#E31A1C',
      10: '#FC4E2A',
      5: '#FD8D3C',
      2: '#FEB24C',
      1: '#FED976',
    },
    fallbackColor: '#FFEDA0',
    colorBreakExtractor: (f) => parseFloat(f.properties?.SILV_POLYGON_NET_AREA),
    infoExtractor: (f) => ({
      'Cover type': 'Inventory',
      'Forest cover id': f.properties?.FOREST_COVER_ID,
      'Polygon number': f.properties?.SILV_POLYGON_NUMBER,
      'Reference year': f.properties?.REFERENCE_YEAR,
      Area: `${f.properties?.SILV_POLYGON_AREA} ha`,
      'Net area': `${f.properties?.SILV_POLYGON_NET_AREA} ha`,
    }),
  },
  'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_RESERVE_SVW': {
    breaks: {
      100: '#800026',
      50: '#BD0026',
      20: '#E31A1C',
      10: '#FC4E2A',
      5: '#FD8D3C',
      2: '#FEB24C',
      1: '#FED976',
    },
    fallbackColor: '#FFEDA0',
    colorBreakExtractor: (f) => parseFloat(f.properties?.SILV_POLYGON_AREA),
    infoExtractor: (f) => ({
      'Cover type': 'Reserve',
      Polygon: f.properties?.SILV_POLYGON_NO,
      Area: `${f.properties?.SILV_POLYGON_AREA} ha`,
    }),
  },
  'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_SILV_SVW': {
    breaks: {
      100: '#800026',
      50: '#BD0026',
      20: '#E31A1C',
      10: '#FC4E2A',
      5: '#FD8D3C',
      2: '#FEB24C',
      1: '#FED976',
    },
    fallbackColor: '#FFEDA0',
    colorBreakExtractor: (f) => parseFloat(f.properties?.SILV_POLYGON_NET_AREA),
    infoExtractor: (f) => ({
      'Cover type': 'Silviculture',
      'Forest cover id': f.properties?.FOREST_COVER_ID,
      'Polygon number': f.properties?.SILV_POLYGON_NUMBER,
      'Reference year': f.properties?.REFERENCE_YEAR,
      'Non mapped area': `${f.properties?.SILV_NON_MAPPED_AREA} ha`,
      Area: `${f.properties?.SILV_POLYGON_AREA} ha`,
      'Net area': `${f.properties?.SILV_POLYGON_NET_AREA} ha`,
    }),
  },
};
