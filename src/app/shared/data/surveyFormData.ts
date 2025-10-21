import {
  PropertyType,
  RoofOrientation,
  RoofAge,
  ElectricityUsage,
  OtherEnergy,
  FormFieldOption,
} from '../types/survey';

export const roofOrientations: FormFieldOption<RoofOrientation>[] = [
  {value: 'South', labelId: 'south'},
  {value: 'West', labelId: 'west'},
  {value: 'East', labelId: 'east'},
  {value: 'North', labelId: 'north'},
  {value: 'No answer', labelId: 'noAnswer'},
];

export const propertyOptions: FormFieldOption<PropertyType>[] = [
  {
    value: 'Single-family home',
    labelId: 'form.propertyType.option.singleFamily',
  },
  {value: 'Multi-family home', labelId: 'form.propertyType.option.multiFamily'},
  {
    value: 'Commercial property',
    labelId: 'form.propertyType.option.commercial',
  },
];

export const roofAgeOptions: FormFieldOption<RoofAge>[] = [
  {value: 'Under 5 years', labelId: 'form.roofAge.option.under5'},
  {value: '5–15 years', labelId: 'form.roofAge.option.5to15'},
  {value: 'Over 15 years', labelId: 'form.roofAge.option.over15'},
  {value: 'Not specified', labelId: 'form.roofAge.option.notSpecified'},
];

export const electricityOptions: FormFieldOption<ElectricityUsage>[] = [
  {value: 'Under 3,000 kWh', labelId: 'form.electricityUsage.option.under3000'},
  {
    value: '3,000–5,000 kWh',
    labelId: 'form.electricityUsage.option.3000to5000',
  },
  {value: 'Over 5,000 kWh', labelId: 'form.electricityUsage.option.over5000'},
  {
    value: 'Not specified',
    labelId: 'form.electricityUsage.option.notSpecified',
  },
];

export const otherEnergyOptions: FormFieldOption<OtherEnergy>[] = [
  {value: 'Yes', labelId: 'form.otherEnergy.option.yes'},
  {value: 'No', labelId: 'form.otherEnergy.option.no'},
  {value: "Don't know", labelId: 'form.otherEnergy.option.dontKnow'},
];
