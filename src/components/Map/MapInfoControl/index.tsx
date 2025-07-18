import L from 'leaflet';
import { type FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useMap } from 'react-leaflet';

import MapInfoPanel from '@/components/Map/MapInfoPanel';

import './index.scss';

interface MapInfoControlProps {
  hoveredFeature?: GeoJSON.Feature;
  title: string;
  position?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
}

const MapInfoControl: FC<MapInfoControlProps> = ({
  hoveredFeature,
  title,
  position = 'topright',
}) => {
  const map = useMap();
  const controlRef = useRef<L.Control | null>(null);
  const rootRef = useRef<ReturnType<typeof ReactDOM.createRoot>>(null);

  useEffect(() => {
    if (controlRef.current) return;
    const InfoControl = L.Control.extend({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAdd(this: any) {
        const container = L.DomUtil.create('div', 'leaflet-control-info');
        this._container = container;
        if (!rootRef.current) {
          rootRef.current = ReactDOM.createRoot(container);
          rootRef.current.render(<MapInfoPanel title={title} feature={undefined} />);
        }
        return container;
      },
    });

    const instance = new InfoControl({ position });
    controlRef.current = instance;
    map.addControl(instance);
  }, [map, position, title]);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.render(<MapInfoPanel title={title} feature={hoveredFeature} />);
    }
  }, [hoveredFeature, title]);

  return null;
};

export default MapInfoControl;
