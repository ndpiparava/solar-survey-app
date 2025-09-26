'use client';

import styled from '@emotion/styled';
import {Controller} from 'react-hook-form';

import SelectField from '../../molecules/SelectField';
import SelectOptions from '../../atoms/SelectOptions';
import CheckboxGroup from '../../molecules/CheckboxGroup';
import ContactForm from '../ContactForm';
import LoadingButton from '../../atoms/LoadingButton';
import LanguageSwitch from '../../molecules/LanguageSwitch';

import {
  propertyOptions,
  roofAgeOptions,
  electricityOptions,
  otherEnergyOptions,
} from '@solar/app/shared/constants/surveyFormData';
import useSurveyForm from './useSurveyForm';
import SurveySummary from '../../molecules/SurveySummary';
import {ContactInfo} from '@solar/app/shared/types/survey';

export default function SurveyForm() {
  const {
    intl,
    setValue,
    control,
    formValues,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    submissionState,
    roofOrientationFormOptions,
  } = useSurveyForm();

  if (submissionState) {
    return (
      
        <SurveySummary form={formValues} />
      
    );
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <LanguageSwitch options={['en', 'de']} />
      <Title>{intl.formatMessage({id: 'app.survey.question'})}</Title>

      {/* Property Type */}
      <Section>
        <Controller
          name="propertyType"
          control={control}
          rules={{required: intl.formatMessage({id: 'form.error.mandatory'})}}
          render={({field}) => (
            <SelectField
              required
              fieldType="propertyType"
              label={intl.formatMessage({id: 'form.propertyType.label'})}
              value={field.value}
              onChange={field.onChange}>
              <SelectOptions options={propertyOptions} intl={intl} />
            </SelectField>
          )}
        />
        {errors.propertyType && (
          <ErrorMsg>{errors.propertyType.message}</ErrorMsg>
        )}
      </Section>

      {/* Roof Orientation */}
      <Controller
        name="roofOrientation"
        control={control}
        defaultValue={[]}
        rules={{
          validate: (values: string[]) =>
            values.length > 0 ||
            intl.formatMessage({id: 'form.error.mandatory'}),
        }}
        render={({field}) => (
          <CheckboxGroup
            required
            label={intl.formatMessage({id: 'form.roofOrientation.label'})}
            options={roofOrientationFormOptions}
            selected={field.value || []}
            onChange={field.onChange}
          />
        )}
      />

      {errors.roofOrientation && (
        <ErrorMsg>{errors.roofOrientation.message}</ErrorMsg>
      )}

      {/* Roof Age */}
      <Section>
        <Controller
          name="roofAge"
          control={control}
          rules={{required: intl.formatMessage({id: 'form.error.mandatory'})}}
          render={({field}) => (
            <SelectField
              required
              fieldType="roofAge"
              label={intl.formatMessage({id: 'form.roofAge.label'})}
              value={field.value}
              onChange={field.onChange}>
              <SelectOptions options={roofAgeOptions} intl={intl} />
            </SelectField>
          )}
        />
        {errors.roofAge && <ErrorMsg>{errors.roofAge.message}</ErrorMsg>}
      </Section>

      {/* Electricity Usage */}
      <Section>
        <Controller
          name="electricityUsage"
          control={control}
          rules={{required: intl.formatMessage({id: 'form.error.mandatory'})}}
          render={({field}) => (
            <SelectField
              required
              fieldType="electricityUsage"
              label={intl.formatMessage({id: 'form.electricityUsage.label'})}
              value={field.value}
              onChange={field.onChange}>
              <SelectOptions options={electricityOptions} intl={intl} />
            </SelectField>
          )}
        />
        {errors.electricityUsage && (
          <ErrorMsg>{errors.electricityUsage.message}</ErrorMsg>
        )}
      </Section>

      {/* Other Energy */}
      <Section>
        <Controller
          name="otherEnergy"
          control={control}
          rules={{required: intl.formatMessage({id: 'form.error.mandatory'})}}
          render={({field}) => (
            <SelectField
              required
              fieldType="otherEnergy"
              label={intl.formatMessage({id: 'form.otherEnergy.label'})}
              value={field.value}
              onChange={field.onChange}>
              <SelectOptions options={otherEnergyOptions} intl={intl} />
            </SelectField>
          )}
        />
        {errors.otherEnergy && (
          <ErrorMsg>{errors.otherEnergy.message}</ErrorMsg>
        )}
      </Section>

      {errors._form && <ErrorMsg>{errors._form.message}</ErrorMsg>}

      {/* Contact Form */}
      <ContactForm
        contactForm={formValues.contact}
        setForm={(updatedContact: ContactInfo) =>
          setValue('contact', updatedContact)
        }
      />

      <LoadingButton
        type="submit"
        loading={isSubmitting}
        label={intl.formatMessage({id: 'button.submit'})}
      />
    </FormWrapper>
  );
}

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
