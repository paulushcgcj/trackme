import { type FC, useEffect, useState } from 'react';

import { STYLE_REGISTRY } from '@/constants/geojsonConstants';
import { extractFeatureTypeKey } from '@/utils/maps/geojsonInteractions';

import type { Feature } from 'geojson';

interface MapInfoPanelProps {
  title: string;
  feature?: Feature;
}

const MapInfoPanel: FC<MapInfoPanelProps> = ({ title, feature }) => {
  const [displayInfo, setDisplayInfo] = useState<Record<string, string | number | boolean>>({});

  useEffect(() => {
    if (feature && feature.id && feature.properties) {
      const styleConfig = STYLE_REGISTRY[extractFeatureTypeKey(feature.id as string)];
      if (styleConfig && styleConfig.infoExtractor) {
        setDisplayInfo(styleConfig.infoExtractor(feature));
      } else {
        setDisplayInfo({});
      }
    } else {
      setDisplayInfo({});
    }
  }, [feature]);

  return (
    <div className="map-info-panel">
      <h2>{title}</h2>
      {Object.keys(displayInfo).length > 0 ? (
        Object.entries(displayInfo).map(([key, value]) => (
          <div key={key}>
            <strong>{key}: </strong>
            <span>{value}</span>
          </div>
        ))
      ) : (
        <span>Hover over a polygon</span>
      )}
    </div>
  );
};

export default MapInfoPanel;
