'use client';

import {useState, ChangeEvent, useMemo, useCallback} from 'react';
import {RoofOrientation, SurveyDataType} from '@solar/app/shared/types/survey';

import useSurveyFormValidation from './useSurveyFormValidation';
import {useIntl} from 'react-intl';
import {roofOrientations} from '@solar/app/shared/constants/surveyFormData';

const useSurveyForm = () => {
  const [form, setForm] = useState<SurveyDataType>({
    propertyType: 'Single-family home',
    roofOrientation: [],
    roofAge: 'Under 5 years',
    electricityUsage: 'Under 3,000 kWh',
    otherEnergy: 'No',
  });

  const {isValidForm} = useSurveyFormValidation();

  const [error, setError] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const handleChange = useCallback(
    (field: string, event: ChangeEvent<HTMLSelectElement>) => {
      setForm(prev => ({...prev, [field]: event.target.value}));
    },
    [],
  );

  const roofOrientationFormOptions = useMemo(() => {
    return roofOrientations.map(o => ({
      value: o.value,
      label: intl.formatMessage({
        id: `form.roofOrientation.option.${o.labelId}`,
      }),
    }));
  }, [intl]);

  const handleCheckboxChange = useCallback((value: RoofOrientation) => {
    setForm(prev => {
      const current = prev.roofOrientation;
      return current.includes(value)
        ? {...prev, roofOrientation: current.filter(v => v !== value)}
        : {...prev, roofOrientation: [...current, value]};
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidForm(form)) {
      setError('Please answer all mandatory questions correctly.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setResult(data.answer); // 'Yes' or 'No' from API
        setSubmitted(true);
      } else {
        setError('Submission failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return {
    intl,
    form,
    setForm,
    error,
    submitted,
    result,
    loading,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    roofOrientationFormOptions,
  };
};

export default useSurveyForm;
