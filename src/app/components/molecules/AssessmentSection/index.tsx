'use client';

import {useTheme} from '@emotion/react';
import styled from '@emotion/styled';
import {AssessmentResult} from '@solar/app/shared/types/survey';
import StatCircle from '../../atoms/StatCircle';
import {useIntl} from 'react-intl';

type AssessmentProps = {
  assessment: AssessmentResult;
};

const AssessmentSection = ({assessment}: AssessmentProps) => {
  const theme = useTheme();
  const intl = useIntl();
  const scoreLabel = intl.formatMessage(
    {id: 'scoreLabel'},
    {score: assessment.score},
  );
  const yieldLabel = intl.formatMessage(
    {id: 'estimatedYieldLabel'},
    {yieldKWh: assessment.yieldKWh},
  );
  const savingsLabel = intl.formatMessage(
    {id: 'savingsLabel'},
    {savingsEuro: assessment.savingsEuro},
  );

  const scoreColor = () => {
    const score = assessment.score;
    if (score >= 80) return theme.colors.success;
    if (score >= 50) return theme.colors.satisfactory;
    return 'warning';
  };

  return (
    <Container>
      <Title>Assessment</Title>
      <Message score={assessment.score} color={scoreColor()}>
        {assessment.message}
      </Message>

      <StatsRow>
        <StatCircle
          label={scoreLabel}
          value={assessment.score}
          color={scoreColor()}
        />

        <StatCircle
          label={yieldLabel}
          value={Math.min((assessment.yieldKWh / 5000) * 100, 100)}
          color={scoreColor()}
        />

        <StatCircle
          label={savingsLabel}
          value={Math.min((assessment.savingsEuro / 1000) * 100, 100)}
          color={scoreColor()}
        />
      </StatsRow>
    </Container>
  );
};

export default AssessmentSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({theme}) => theme.spacing(4)};
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${({theme}) => theme.radii.md};
  box-shadow: 0 4px 12px ${({theme}) => theme.colors.primary};
`;

const Title = styled.h3`
  margin: 0 0 ${({theme}) => theme.spacing(3)} 0;
  font-size: ${({theme}) => theme.fontSizes.lg};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  color: ${({theme}) => theme.colors.warning};
`;

type MessageProps = {
  score: number;
  color?: string;
};

const Message = styled.p<MessageProps>`
  margin: 0 auto ${({theme}) => theme.spacing(4)} auto;
  padding: ${({theme}) => theme.spacing(3)} ${({theme}) => theme.spacing(5)};
  border-radius: ${({theme}) => theme.radii.md};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  color: ${({theme}) => theme.colors.text};
  background-color: ${({color, theme}) =>
    color ? color : theme.colors.background};
  box-shadow: 0 4px 12px ${({theme}) => theme.colors.primary};
  text-align: center;
  width: fit-content;
`;

const StatsRow = styled.div`
  display: flex;
  gap: ${({theme}) => theme.spacing(3)};
  margin-top: ${({theme}) => theme.spacing(3)};
  flex-wrap: wrap;
  justify-content: center;
`;
