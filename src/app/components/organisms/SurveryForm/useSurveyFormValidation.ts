import {SurveyDataType} from '@solar/app/shared/types/survey';
import {
  surveyFormAllowedValues,
  validateFormField,
} from '@solar/app/shared/validation/surveyValidation';
import {isValidString} from '@solar/app/utils/string';

const useSurveyFormValidation = () => {
  const validateContact = (contact?: SurveyDataType['contact']) => {
    if (!contact) return true;
    return (
      isValidString(contact.email, true, /^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      isValidString(contact.phone, true, /^\+?[0-9\s\-]{7,15}$/) &&
      isValidString(contact.name, true, /^[A-Za-z\s'-]{1,50}$/)
    );
  };

  const isValidForm = (form: SurveyDataType) => {
    return (
      validateFormField(
        form.propertyType,
        surveyFormAllowedValues.propertyType,
      ) &&
      validateFormField(
        form.roofOrientation,
        surveyFormAllowedValues.roofOrientation,
      ) &&
      validateFormField(form.roofAge, surveyFormAllowedValues.roofAge) &&
      validateFormField(
        form.electricityUsage,
        surveyFormAllowedValues.electricityUsage,
      ) &&
      validateFormField(
        form.otherEnergy,
        surveyFormAllowedValues.otherEnergy,
      ) &&
      validateContact(form.contact)
    );
  };

  return {isValidForm};
};

export default useSurveyFormValidation;
