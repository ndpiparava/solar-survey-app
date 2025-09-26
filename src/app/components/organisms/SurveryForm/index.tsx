'use client';

import {
  otherEnergyOptions,
  propertyOptions,
  roofAgeOptions,
  electricityOptions,
} from '@solar/app/shared/constants/surveyFormData';
import styled from '@emotion/styled';

import ContactForm from '../ContactForm';
import SurveySummary from '../../molecules/SurveySummary';
import CheckboxGroup from '../../molecules/CheckboxGroup';
import useSurveyForm from './useSurveyForm';
import SelectField from '../../molecules/SelectField';
import LoadingButton from '../../atoms/LoadingButton';
import SelectOptions from '../../atoms/SelectOptions';
import LanguageSwitch from '../../molecules/LanguageSwitch';

const SurveyForm = () => {
  const {
    intl,
    form,
    setForm,
    error,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    loading,
    submitted,
    roofOrientationFormOptions,
  } = useSurveyForm();

  if (submitted) {
    return <SurveySummary form={form} />;
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <LanguageSwitch options={['en', 'de']} />
      <Title>{intl.formatMessage({id: 'app.survey.question'})}</Title>
      <Section>
        <SelectField
          fieldType={'propertyType'}
          label={intl.formatMessage({id: 'form.propertyType.label'})}
          value={form.propertyType}
          onChange={e => handleChange('propertyType', e)}>
          <SelectOptions options={propertyOptions} intl={intl} />
        </SelectField>
      </Section>

      <Section>
        <CheckboxGroup
          label={intl.formatMessage({id: 'form.roofOrientation.label'})}
          options={roofOrientationFormOptions}
          selected={form.roofOrientation}
          onChange={handleCheckboxChange}
        />
      </Section>

      <Section>
        <SelectField
          fieldType="roofAge"
          label={intl.formatMessage({id: 'form.roofAge.label'})}
          value={form.roofAge}
          onChange={e => handleChange('roofAge', e)}>
          <SelectOptions options={roofAgeOptions} intl={intl} />
        </SelectField>
      </Section>

      <Section>
        <SelectField
          fieldType="electricityUsage"
          label={intl.formatMessage({id: 'form.electricityUsage.label'})}
          value={form.electricityUsage}
          onChange={e => handleChange('electricityUsage', e)}>
          <SelectOptions options={electricityOptions} intl={intl} />
        </SelectField>
      </Section>

      <Section>
        <SelectField
          fieldType="otherEnergy"
          label={intl.formatMessage({id: 'form.otherEnergy.label'})}
          value={form.otherEnergy}
          onChange={e => handleChange('otherEnergy', e)}>
          <SelectOptions options={otherEnergyOptions} intl={intl} />
        </SelectField>
      </Section>

      <ContactForm contactForm={form.contact} setForm={setForm} />

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <LoadingButton
        type="submit"
        loading={loading}
        label={intl.formatMessage({id: 'button.submit'})}
      />
    </FormWrapper>
  );
};

export default SurveyForm;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(5)};
  background-color: ${({theme}) => theme.colors.background};
  padding: ${({theme}) => theme.spacing(6)};
  border-radius: ${({theme}) => theme.radii.lg};
  box-shadow: 0 4px 12px ${({theme}) => theme.colors.primary};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(3)};
`;

const ErrorMsg = styled.p`
  color: ${({theme}) => theme.colors.danger};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  font-size: ${({theme}) => theme.fontSizes.base};
  background-color: ${({theme}) => theme.colors.background};
  padding: ${({theme}) => theme.spacing(2)};
  border-radius: ${({theme}) => theme.radii.md};
`;
const Title = styled.h2`
  font-size: ${({theme}) => theme.fontSizes.xl};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme}) => theme.spacing(2)};
  color: ${({theme}) => theme.colors.warning};
`;
