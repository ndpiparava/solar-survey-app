import {SurveyDataType} from '@solar/app/shared/types/survey';
import {
  surveyFormAllowedValues,
  validateFormField,
} from '@solar/app/shared/validation/surveyValidation';
import {NextRequest, NextResponse} from 'next/server';

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
