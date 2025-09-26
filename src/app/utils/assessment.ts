import {AssessmentResult, SurveyDataType} from '@solar/app/shared/types/survey';
import {IntlShape} from 'react-intl';

export function getAssessment(
  form: SurveyDataType,
  intl: IntlShape,
): AssessmentResult {
  let score = 0;

  // Roof orientation
  if (form.roofOrientation.includes('South')) score += 40;
  else if (
    form.roofOrientation.includes('East') ||
    form.roofOrientation.includes('West')
  )
    score += 25;
  else if (form.roofOrientation.includes('North')) score += 5;

  // Roof age
  switch (form.roofAge) {
    case 'Under 5 years':
      score += 20;
      break;
    case '5–15 years':
      score += 15;
      break;
    case 'Over 15 years':
      score += 5;
      break;
    default:
      score += 10;
  }

  // Electricity usage
  switch (form.electricityUsage) {
    case 'Over 5,000 kWh':
      score += 30;
      break;
    case '3,000–5,000 kWh':
      score += 20;
      break;
    case 'Under 3,000 kWh':
      score += 10;
      break;
  }

  // Other energy
  if (form.otherEnergy === 'No') score += 10;

  score = Math.min(100, score);

  const estimatedYield = Math.round((score / 100) * 5000); // assume 5kWp system
  const savings = Math.round(estimatedYield * 0.25); // €0.25/kWh

  let message = intl.formatMessage({id: 'moderatePotential'});
  if (score > 70) message = intl.formatMessage({id: 'excellentPotential'});
  else if (score < 40) message = intl.formatMessage({id: 'limitedPotential'});

  return {
    score,
    yieldKWh: estimatedYield,
    savingsEuro: savings,
    message,
  };
}
