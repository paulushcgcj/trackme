import { RadioButtonGroup, RadioButton } from '@carbon/react';
import { useState, useEffect } from 'react';

import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

interface MapEntryFilterProps<T = string | number> {
  feature: FeatureCollection<Geometry, GeoJsonProperties> | undefined;
  title: string;
  selector: (feature: Feature) => T | null | undefined;
  formatter?: (value: T) => string;
  onSelectionChange?: (selected: T | null) => void;
}

const MapEntryFilter = <T,>({
  feature,
  title,
  selector,
  formatter,
  onSelectionChange,
}: MapEntryFilterProps<T>) => {
  const [valueRecord, setValueRecord] = useState<Record<string, T>>({});
  const [selectedValue, setSelectedValue] = useState<T | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>('__all__');

  useEffect(() => {
    if (!feature || !selector) return;

    const record: Record<string, T> = {};

    feature.features.forEach((f) => {
      const value = selector(f);
      if (value !== null && value !== undefined) {
        const key = formatter ? formatter(value) : String(value);
        record[key] = value;
      }
    });

    setValueRecord(record);
  }, [feature, selector, formatter]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedValue);
    }
  }, [selectedValue, onSelectionChange]);

  return (
    <div className="mapentry-filter">
      <p>{title}</p>
      <RadioButtonGroup
        legendText="Available values"
        name="mapentry-filter-radio-group"
        valueSelected={selectedKey}
        orientation="vertical"
        onChange={(key) => {
          const value = valueRecord[key as string];
          setSelectedKey(key as string);
          setSelectedValue(value ?? null);
        }}
      >
        <RadioButton
          labelText="Display all"
          value={'__all__'}
          id={`mapentry-filter-none`}
          key={`mapentry-filter-none`}
        />
        {Object.entries(valueRecord)
          .sort(([labelA], [labelB]) => labelA.localeCompare(labelB))
          .map(([label, value]) => (
            <RadioButton
              labelText={label}
              disabled={valueRecord.length === 1}
              value={label}
              id={`mapentry-filter-${value}`}
              key={`mapentry-filter-${value}`}
            />
          ))}
      </RadioButtonGroup>
    </div>
  );
};

export default MapEntryFilter;
