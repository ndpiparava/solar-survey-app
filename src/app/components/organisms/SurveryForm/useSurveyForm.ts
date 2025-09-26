'use client';

import {useMemo, useEffect, useState} from 'react';
import {SurveyDataType} from '@solar/app/shared/types/survey';

import {useIntl} from 'react-intl';
import {roofOrientations} from '@solar/app/shared/constants/surveyFormData';
import {useForm} from 'react-hook-form';
type SurveyFormWithError = SurveyDataType & {_form?: string};

const useSurveyForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    setValue,

    formState: {errors, isSubmitting},
  } = useForm<SurveyFormWithError>({
    defaultValues: {
      propertyType: 'Single-family home',
      roofOrientation: [],
      roofAge: 'Under 5 years',
      electricityUsage: 'Under 3,000 kWh',
      otherEnergy: 'No',
      contact: {},
      _form: undefined,
    },
  });

  const formValues = watch();
  const intl = useIntl();
  const [submissionState, setSubmissionState] = useState<boolean>(false);

  const roofOrientationFormOptions = useMemo(() => {
    return roofOrientations.map(o => ({
      value: o.value,
      label: intl.formatMessage({
        id: `form.roofOrientation.option.${o.labelId}`,
      }),
    }));
  }, [intl]);

  useEffect(() => {
    // Initialize the checkbox field to an empty array
    setValue('roofOrientation', []);
  }, [setValue]);

  const onSubmit = async () => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSubmissionState(true);
      }
    } catch (err) {
      console.error(err);
      setError('_form', {type: 'manual', message: 'API submission failed.'});
    }
  };

  return {
    intl,
    control,
    formValues,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    roofOrientationFormOptions,
    submissionState,
  };
};

export default useSurveyForm;
