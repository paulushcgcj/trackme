import { useQuery } from '@tanstack/react-query';
import { type LatLngExpression } from 'leaflet';
import { type FC, useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';

import MapEntry from '@/components/Map/MapEntry';
import MapEntryFilter from '@/components/Map/MapEntryFilter';
import MapFitBound from '@/components/Map/MapFitBound';
import MapInfoControl from '@/components/Map/MapInfoControl';
import MapInfoPanel from '@/components/Map/MapInfoPanel';
import 'leaflet/dist/leaflet.css';
import './index.scss';
import { OPEN_MAPS_URL, FETCH_PARAMS } from '@/constants/openMaps';

import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

interface MapLayoutProps {
  position: LatLngExpression;
  zoomLevel: number;
}

const MapLayout: FC<MapLayoutProps> = ({ position, zoomLevel }) => {
  // global map state
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(position);
  const [mapZoom, setMapZoom] = useState<number>(zoomLevel);
  const [map, setMap] = useState<L.Map | null>(null);
  // information panel state
  const [hoveredFeature, setHoveredFeature] = useState<GeoJSON.Feature | undefined>(undefined);
  const [infoPannelTitle] = useState<string>('Opening Info');
  // data and filtered data state
  const [keyHash, setKeyHash] = useState<string>('no-key');
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [currentFeatures, setCurrentFeatures] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>[]
  >([]);

  useEffect(() => {
    setMapCenter(position);
  }, [position]);

  useEffect(() => {
    setMapZoom(zoomLevel);
  }, [zoomLevel]);

  /* Start of temporary/demo block */
  // Everything inside this block is a temporary solution for fetching map data.
  const fetchMapData = async (): Promise<FeatureCollection<Geometry, GeoJsonProperties>> => {
    const response = await fetch(OPEN_MAPS_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data } = useQuery({
    queryKey: ['map', 'entry', 'get'],
    queryFn: async () => fetchMapData(),
  });

  useEffect(() => {
    if (data) {
      setCurrentFeatures([data]);
      setKeyHash(data.features.length > 0 ? (data.features[0].id as string) : 'no-key');
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (yearFilter) {
        const filteredData: FeatureCollection<Geometry, GeoJsonProperties> =
          data && yearFilter
            ? {
                ...data,
                features: data.features.filter(
                  (feature) => feature.properties?.REFERENCE_YEAR === yearFilter,
                ),
              }
            : data;
        setCurrentFeatures([filteredData]);
        setKeyHash(
          filteredData.features.length > 0
            ? `${filteredData.features[0].id as string}-${yearFilter}`
            : 'no-key',
        );
      } else {
        setCurrentFeatures([data]);
        setKeyHash(data.features.length > 0 ? (data.features[0].id as string) : 'no-key');
      }
    }
  }, [yearFilter, data]);

  /* End of temporary/demo block */

  return (
    <div
      className="map-layout"
      onKeyDown={(e) => {
        if (e.key === 'Control') {
          if (map) {
            map.scrollWheelZoom.enable();
          }
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'Control') {
          if (map) {
            map.scrollWheelZoom.disable();
          }
        }
      }}
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={false}
        className="leaflet-container"
        ref={setMap}
      >
        <MapFitBound polygons={currentFeatures} defaultLocation={mapCenter} defaultZoom={mapZoom} />

        {currentFeatures.map((feature, index) => (
          <MapEntry
            key={`map-entry-${index}-${keyHash}`}
            entry={feature}
            onHover={setHoveredFeature}
            onBlur={() => setHoveredFeature(undefined)}
          />
        ))}

        <MapInfoControl
          content={<MapInfoPanel title={infoPannelTitle} feature={hoveredFeature} />}
        />
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

        {/* Control the below map info to only be added when we are using the correct type for the request */}
        {FETCH_PARAMS.typeName === 'WHSE_FOREST_VEGETATION.RSLT_FOREST_COVER_INV_SVW' && (
          <MapInfoControl
            content={
              <MapEntryFilter
                title="Forest cover by year"
                feature={data}
                selector={(f) => f.properties?.REFERENCE_YEAR}
                formatter={(value) => `Year ${value}`}
                onSelectionChange={(selectedYear) => {
                  setYearFilter(selectedYear as number);
                }}
              />
            }
            position="bottomright"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapLayout;
