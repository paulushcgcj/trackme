//TODO: This entire file is a temporary fix for the OpenMaps API URL.
// It should be replaced with a more robust solution in the future.
const BASE_URL = 'https://openmaps.gov.bc.ca/geo/ows';

export const FETCH_PARAMS: Record<string, string> = {
  service: 'WFS',
  version: '2.0.0',
  request: 'GetFeature',
  outputFormat: 'application/json',
  SrsName: 'EPSG:4326',
  PROPERTYNAME: 'OPENING_ID,GEOMETRY',
  //cql_filter: 'OPENING_ID=1725701',
  cql_filter: 'OPENING_ID=1771831',
  //typeName: 'WHSE_FOREST_TENURE.FTEN_CUT_BLOCK_POLY_SVW',
  //typeName: 'WHSE_FOREST_VEGETATION.RSLT_STANDARDS_UNIT_SVW',
  //typeName: 'WHSE_FOREST_VEGETATION.RSLT_ACTIVITY_TREATMENT_SVW',
  //typeName: 'WHSE_FOREST_VEGETATION.RSLT_PLANTING_SVW',
  //typeName: 'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_INV_SVW,WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_RESERVE_SVW,WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_SILV_SVW',
  //typeName: 'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_RESERVE_SVW',
  //typeName: 'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_SILV_SVW',
  typeName: 'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_INV_SVW',
};

export const OPEN_MAPS_URL = `${BASE_URL}?${new URLSearchParams(FETCH_PARAMS).toString()}`;
