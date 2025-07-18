import L from 'leaflet';

import type { Feature, GeoJsonProperties, Geometry } from 'geojson';

export const zoomToFeature = (map: L.Map) => (e: L.LeafletMouseEvent) => {
  map.fitBounds(e.target.getBounds());
};

export const highlightFeature =
  (
    style: L.PathOptions,
    onHighlightCallback: (feature: Feature<Geometry, GeoJsonProperties>) => void,
  ) =>
  (e: L.LeafletMouseEvent) => {
    const layer = e.target;

    if (layer) {
      onHighlightCallback(layer.feature);
      layer.setStyle(style);
      if (layer.bringToFront) {
        layer.bringToFront();
      }
    }
  };

export const resetHighlight =
  (style: L.PathOptions, onResetCallback: () => void) => (event: L.LeafletMouseEvent) => {
    const layer = event.target;
    layer.setStyle(style);
    onResetCallback();
  };

export const extractFeatureTypeKey = (id: string): string => {
  return id?.split('.')?.slice(0, 2)?.join('.') ?? 'unknown.type';
};
