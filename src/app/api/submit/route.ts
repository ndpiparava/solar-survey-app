import {SurveyDataType} from '@solar/app/shared/types/survey';
import {surveyFormAllowedValues} from '@solar/app/shared/validation/surveyValidation';
import {NextRequest, NextResponse} from 'next/server';

const validateFormField = <T>(
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

export async function POST(req: NextRequest) {
  const data: SurveyDataType = await req.json();

  console.log('Request body:', data);

  //Validation
  const isValid =
    validateFormField(
      data.propertyType,
      surveyFormAllowedValues.propertyType,
    ) &&
    validateFormField(
      data.roofOrientation,
      surveyFormAllowedValues.roofOrientation,
    ) &&
    validateFormField(data.roofAge, surveyFormAllowedValues.roofAge) &&
    validateFormField(
      data.electricityUsage,
      surveyFormAllowedValues.electricityUsage,
    ) &&
    validateFormField(data.otherEnergy, surveyFormAllowedValues.otherEnergy);

  console.log('Validation:', isValid);

  if (!isValid) {
    return NextResponse.json(
      {status: 'error', message: 'Invalid or missing fields'},
      {status: 400},
    );
  }

  // Random Yes/No answer
  const answer = Math.random() > 0.5 ? 'Yes' : 'No';

  return NextResponse.json({status: 'success', answer});
}
