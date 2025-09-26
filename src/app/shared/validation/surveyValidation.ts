import {
  propertyOptions,
  roofOrientations,
  roofAgeOptions,
  electricityOptions,
  otherEnergyOptions,
} from '../constants/surveyFormData';
import {
  PropertyType,
  RoofOrientation,
  RoofAge,
  ElectricityUsage,
  OtherEnergy,
} from '../types/survey';

export const validateFormField = <T>(
  value: T | T[],
  allowedValues: T[],
  required = true,
) => {
  if (Array.isArray(value)) {
    return required
      ? value.length > 0 && value.every(v => allowedValues.includes(v))
      : true;
  }
  if (typeof value === 'string') {
    return required
      ? value.trim() !== '' && allowedValues.includes(value as T)
      : true;
  }
  return false;
};

export const getAllowedValues = <T>(options: {value: T}[]): T[] =>
  options.map(o => o.value);

export const surveyFormAllowedValues = {
  propertyType: getAllowedValues<PropertyType>(propertyOptions),
  roofOrientation: getAllowedValues<RoofOrientation>(roofOrientations),
  roofAge: getAllowedValues<RoofAge>(roofAgeOptions),
  electricityUsage: getAllowedValues<ElectricityUsage>(electricityOptions),
  otherEnergy: getAllowedValues<OtherEnergy>(otherEnergyOptions),
};
