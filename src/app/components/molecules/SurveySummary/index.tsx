'use client';

import styled from '@emotion/styled';
import {memo} from 'react';
import {keyframes} from '@emotion/react';
import {FaSun} from 'react-icons/fa';

import FieldBadge from '../FieldBadge';
import SummaryItem from '../SummaryItem';
import {
  SurveyDataKeyType,
  SurveyDataType,
} from '@solar/app/shared/types/survey';
import useSurveySummary from './useSurveySummary';

interface SurveySummaryProps {
  form: SurveyDataType;
}

const SurveySummary = ({form}: SurveySummaryProps) => {
  const {fieldConfigs, intl} = useSurveySummary(form);

  return (
    <ResultWrapper>
      <Title>
        <FaSun /> {intl.formatMessage({id: 'form.success.thankYou'})}
      </Title>
      <Description>
        {intl.formatMessage({id: 'form.success.response'})}
      </Description>

      <SummaryList>
        {(Object.keys(form) as (keyof SurveyDataType)[])
          .filter((key): key is SurveyDataKeyType => key !== 'contact')
          .map(key => {
            const value = form[key];
            const config = fieldConfigs[key];
            if (!config) return null;
            const values = Array.isArray(value) ? value : [value];
            return (
              <SummaryItem key={key} label={config.label}>
                {values.map((v, i) => (
                  <FieldBadge
                    key={i}
                    fieldType={key}
                    value={v as string}
                    color={config.color}
                  />
                ))}
              </SummaryItem>
            );
          })}
      </SummaryList>
    </ResultWrapper>
  );
};

export default memo(SurveySummary);

const slideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(4)};
  padding: ${({theme}) => theme.spacing(6)};
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${({theme}) => theme.radii.lg};
  box-shadow: 0 8px 20px ${({theme}) => theme.colors.primary};
  text-align: center;
  animation: ${slideIn} 0.5s ease-out;
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

const Description = styled.p`
  font-size: ${({theme}) => theme.fontSizes.base};
  color: ${({theme}) => theme.colors.text};
`;

const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(3)};
  text-align: left;
  margin-top: ${({theme}) => theme.spacing(3)};
`;
