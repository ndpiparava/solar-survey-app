export type Option<T extends string> = {value: T; labelId: string};
export type PropertyType =
  | 'Single-family home'
  | 'Multi-family home'
  | 'Commercial property';
export type RoofOrientation = 'South' | 'West' | 'East' | 'North' | 'No answer';
export type RoofAge =
  | 'Under 5 years'
  | '5–15 years'
  | 'Over 15 years'
  | 'Not specified';
export type ElectricityUsage =
  | 'Under 3,000 kWh'
  | '3,000–5,000 kWh'
  | 'Over 5,000 kWh'
  | 'Not specified';
export type OtherEnergy = 'Yes' | 'No' | "Don't know";

export type ContactInfo = {
  name?: string;
  email?: string;
  phone?: string;
};

export type SurveyDataType = {
  propertyType: PropertyType;
  roofOrientation: RoofOrientation[];
  roofAge: RoofAge;
  electricityUsage: ElectricityUsage;
  otherEnergy: OtherEnergy;
  contact?: ContactInfo;
};

export type SurveyDataKeyType = Exclude<keyof SurveyDataType, 'contact'>;
