import { type FC, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';

import MapFitBound from '@/components/Map/MapFitBound';

import 'leaflet/dist/leaflet.css';
import './index.scss';
import type { LatLngExpression } from 'leaflet';

interface MapLayoutProps {
  position: LatLngExpression;
  zoomLevel: number;
}

const MapLayout: FC<MapLayoutProps> = ({ position, zoomLevel }) => {
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(position);
  const [mapZoom, setMapZoom] = useState<number>(zoomLevel);

  useEffect(() => {
    setMapCenter(position);
  }, [position]);

  useEffect(() => {
    setMapZoom(zoomLevel);
  }, [zoomLevel]);

  return (
    <div className="map-layout">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <MapFitBound polygons={[]} defaultLocation={mapCenter} defaultZoom={mapZoom} />

        <LayersControl position="topright">
          <LayersControl.BaseLayer name="ESRI Topography">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
              zIndex={-10000}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="ESRI Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
              zIndex={-10000}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenTopoMap">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              zIndex={-10000}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="OpenStreets">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              zIndex={-10000}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Marker position={mapCenter}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLayout;
