import {isValidString} from '@solar/app/utils/string';
import {
  propertyOptions,
  roofOrientations,
  roofAgeOptions,
  electricityOptions,
  otherEnergyOptions,
} from '../data/surveyFormData';
import {
  PropertyType,
  RoofOrientation,
  RoofAge,
  ElectricityUsage,
  OtherEnergy,
  SurveyDataType,
  SurveyFieldOptionMap,
} from '../types/survey';

export const validateContact = (contact?: SurveyDataType['contact']) => {
  if (!contact) return true;
  return (
    isValidString(contact.email, true, /^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
    isValidString(contact.phone, true, /^\+?[0-9\s\-]{7,15}$/) &&
    isValidString(contact.name, true, /^[A-Za-z\s'-]{1,50}$/)
  );
};

export const validateFormSelectField = (
  value:
    | SurveyDataType[keyof Omit<SurveyDataType, 'contact'>]
    | SurveyDataType[keyof Omit<SurveyDataType, 'contact'>][],
  allowedOptions: SurveyFieldOptionMap[keyof SurveyFieldOptionMap],
  required = true,
) => {
  const values = (Array.isArray(value) ? value : [value]).map(v =>
    typeof v === 'object' && 'value' in v ? v.value : v,
  );

  const allowedValues = allowedOptions.map(opt => opt.value);

  if (required && values.length === 0) return false;

  return values.every(v => allowedValues.includes(v));
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

export type SurveyFormAllowedValuesType = typeof surveyFormAllowedValues;
