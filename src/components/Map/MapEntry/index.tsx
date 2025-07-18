import L from 'leaflet';
import { type FC } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { BASE_STYLE, HIGHLIGHT_STYLE } from '@/constants/geojsonConstants';
import { zoomToFeature, highlightFeature, resetHighlight } from '@/utils/maps/geojsonInteractions';
import { getStyleFromFeature } from '@/utils/maps/geojsonStyles';

import type { FeatureCollection, Geometry, GeoJsonProperties, Feature } from 'geojson';

interface MapEntryProps {
  entry: FeatureCollection<Geometry, GeoJsonProperties>;
  onHover: (feature: Feature<Geometry, GeoJsonProperties>) => void;
  onBlur: () => void;
}

const MapEntry: FC<MapEntryProps> = ({ entry, onHover, onBlur }) => {
  const map = useMap();

  // If entry is empty or undefined, return null to avoid rendering issues
  // This safeguard is set at the top to avoid unnecessary processing
  if (!entry || !entry.features || entry.features.length === 0) return null;

  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    layer.on({
      mouseover: highlightFeature(HIGHLIGHT_STYLE, onHover),
      mouseout: resetHighlight(BASE_STYLE, onBlur),
      click: zoomToFeature(map),
    });

    return feature;
  };

  return <GeoJSON data={entry} style={getStyleFromFeature} onEachFeature={onEachFeature} />;
};

export default MapEntry;
