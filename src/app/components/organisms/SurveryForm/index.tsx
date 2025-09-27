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
} from '@solar/app/shared/data/surveyFormData';
import useSurveyForm from './useSurveyForm';
import SurveySummary from '../../molecules/SurveySummary';
import {
  SurveyDataKeyType,
  SurveyFieldOptionMap,
} from '@solar/app/shared/types/survey';
import {
  validateContact,
  validateFormSelectField,
} from '@solar/app/shared/validation/surveyValidation';

export default function SurveyForm() {
  const {
    intl,
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
    return <SurveySummary form={formValues} />;
  }

  const renderSelectField = <K extends keyof SurveyFieldOptionMap>(
    name: SurveyDataKeyType,
    fieldType: SurveyDataKeyType,
    labelId: string,
    options: SurveyFieldOptionMap[K],
  ) => (
    <Section>
      <Controller
        name={name}
        control={control}
        rules={{
          required: intl.formatMessage({id: 'form.error.mandatory'}),
          validate: value => validateFormSelectField(value, options),
        }}
        render={({field}) => (
          <SelectField
            required
            fieldType={fieldType}
            label={intl.formatMessage({id: labelId})}
            value={field.value}
            onChange={field.onChange}>
            <SelectOptions options={options} intl={intl} />
          </SelectField>
        )}
      />
      {errors[name] && <ErrorMsg>{errors[name]?.message}</ErrorMsg>}
    </Section>
  );

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <LanguageSwitch options={['en', 'de']} />
      <Title>{intl.formatMessage({id: 'app.survey.question'})}</Title>

      {/* Property Type */}
      <Section>
        {renderSelectField(
          'propertyType',
          'propertyType',
          'form.propertyType.label',
          propertyOptions,
        )}
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
        {renderSelectField(
          'roofAge',
          'roofAge',
          'form.roofAge.label',
          roofAgeOptions,
        )}
        {errors.roofAge && <ErrorMsg>{errors.roofAge.message}</ErrorMsg>}
      </Section>

      {/* Electricity Usage */}
      <Section>
        {renderSelectField(
          'electricityUsage',
          'electricityUsage',
          'form.electricityUsage.label',
          electricityOptions,
        )}
        {errors.electricityUsage && (
          <ErrorMsg>{errors.electricityUsage.message}</ErrorMsg>
        )}
      </Section>

      {/* Other Energy */}
      <Section>
        {renderSelectField(
          'otherEnergy',
          'otherEnergy',
          'form.otherEnergy.label',
          otherEnergyOptions,
        )}
        {errors.otherEnergy && (
          <ErrorMsg>{errors.otherEnergy.message}</ErrorMsg>
        )}
      </Section>
      {errors._form && <ErrorMsg>{errors._form.message}</ErrorMsg>}

      {/* Contact Form */}
      <Controller
        name="contact"
        control={control}
        rules={{
          validate: validateContact,
        }}
        render={({field}) => (
          <ContactForm contactForm={field.value} setForm={field.onChange} />
        )}
      />
      {errors.contact && <ErrorMsg>{errors.contact.message}</ErrorMsg>}

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
