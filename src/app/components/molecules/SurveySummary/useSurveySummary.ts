import {useTheme} from '@emotion/react';
import {SurveyDataType} from '@solar/app/shared/types/survey';
import {getAssessment} from '@solar/app/utils/assessment';
import {useMemo} from 'react';
import {useIntl} from 'react-intl';

const useSurveySummary = (form: SurveyDataType) => {
  const intl = useIntl();
  const theme = useTheme();
  const assessment = getAssessment(form, intl);
  const fieldConfigs = useMemo(
    () => ({
      propertyType: {
        color: theme.colors.warning,
        label: intl.formatMessage({id: 'form.propertyType.label'}),
      },
      roofOrientation: {
        color: theme.colors.info,
        label: intl.formatMessage({id: 'form.roofOrientation.label'}),
      },
      roofAge: {
        color: theme.colors.warning,
        label: intl.formatMessage({id: 'form.roofAge.label'}),
      },
      electricityUsage: {
        color: theme.colors.info,
        label: intl.formatMessage({id: 'form.electricityUsage.label'}),
      },
      otherEnergy: {
        color:
          form.otherEnergy === 'Yes'
            ? theme.colors.success
            : theme.colors.danger,
        label: intl.formatMessage({id: 'form.otherEnergy.label'}),
      },
    }),
    [theme, intl, form.otherEnergy],
  );

  return {fieldConfigs, intl, assessment};
};

export default useSurveySummary;
