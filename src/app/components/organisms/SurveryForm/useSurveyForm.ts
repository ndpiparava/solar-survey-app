'use client';

import {useMemo, useEffect, useState} from 'react';
import {SurveyDataType} from '@solar/app/shared/types/survey';

import {useIntl} from 'react-intl';
import {roofOrientations} from '@solar/app/shared/data/surveyFormData';
import {useForm} from 'react-hook-form';
type SurveyFormWithError = SurveyDataType & {_form?: string};

const useSurveyForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    formState: {errors, isSubmitting, isSubmitSuccessful},
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
 

  const roofOrientationFormOptions = useMemo(() => {
    return roofOrientations.map(o => ({
      value: o.value,
      label: intl.formatMessage({
        id: `form.roofOrientation.option.${o.labelId}`,
      }),
    }));
  }, [intl]);

  const onSubmit = async () => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formValues),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await res.json();
      // Handle success response if needed
    } catch (err) {
      console.error(err);
      setError('_form', {type: 'manual', message: 'API submission failed.'});
    }
  };

  return {
    intl,
    setValue,
    control,
    formValues,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    roofOrientationFormOptions,
    submissionState:isSubmitSuccessful,
  };
};

export default useSurveyForm;
