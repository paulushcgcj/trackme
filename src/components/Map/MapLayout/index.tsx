import { useQuery } from '@tanstack/react-query';
import { type FC, useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';

import MapEntry from '@/components/Map/MapEntry';
import MapFitBound from '@/components/Map/MapFitBound';
import MapInfoControl from '@/components/Map/MapInfoControl';
import 'leaflet/dist/leaflet.css';
import './index.scss';
import { OPEN_MAPS_URL } from '@/constants/openMaps';

import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { LatLngExpression } from 'leaflet';

interface MapLayoutProps {
  position: LatLngExpression;
  zoomLevel: number;
}

const MapLayout: FC<MapLayoutProps> = ({ position, zoomLevel }) => {
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(position);
  const [mapZoom, setMapZoom] = useState<number>(zoomLevel);
  const [hoveredFeature, setHoveredFeature] = useState<GeoJSON.Feature | undefined>(undefined);
  const [infoPannelTitle] = useState<string>('Opening Info');

  useEffect(() => {
    setMapCenter(position);
  }, [position]);

  useEffect(() => {
    setMapZoom(zoomLevel);
  }, [zoomLevel]);

  /* Start of temporary/demo block */
  const searchKey = 'OPENING_ID=60000';
  const typeNames = [
    'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_INV_SVW',
    'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_RESERVE_SVW',
    'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_SILV_SVW',
  ];

  const fetchMapData = async (): Promise<FeatureCollection<Geometry, GeoJsonProperties>> => {
    const response = await fetch(OPEN_MAPS_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data } = useQuery({
    queryKey: ['map', 'entry', 'get', searchKey, typeNames],
    queryFn: async () => fetchMapData(),
  });
  /* End of temporary/demo block */

  return (
    <div className="map-layout">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <MapFitBound
          polygons={data ? [data] : []}
          defaultLocation={mapCenter}
          defaultZoom={mapZoom}
        />

        <MapEntry
          entry={data ?? ({} as FeatureCollection<Geometry, GeoJsonProperties>)}
          onHover={setHoveredFeature}
          onBlur={() => setHoveredFeature(undefined)}
        />

        <MapInfoControl title={infoPannelTitle} hoveredFeature={hoveredFeature} />
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
      </MapContainer>
    </div>
  );
};

export default MapLayout;
