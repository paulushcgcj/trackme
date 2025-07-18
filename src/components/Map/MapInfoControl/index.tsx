import L from 'leaflet';
import { type FC, type ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useMap } from 'react-leaflet';

import './index.scss';

interface MapInfoControlProps {
  content?: ReactNode;
  position?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
}

const MapInfoControl: FC<MapInfoControlProps> = ({ content, position = 'topright' }) => {
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
          rootRef.current.render(content ?? <></>);
        }
        return container;
      },
    });

    const instance = new InfoControl({ position });
    controlRef.current = instance;
    map.addControl(instance);
  }, [content, map, position]);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.render(content ?? <></>);
    }
  }, [content]);

  return null;
};

export default MapInfoControl;
