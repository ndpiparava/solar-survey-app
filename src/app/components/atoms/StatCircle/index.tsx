'use client';

import styled from '@emotion/styled';
import {useTheme} from '@emotion/react';

type StatCircleProps = {
  label: string;
  value: number;
  max?: number;
  color?: string;
};

const StatCircle = ({label, value, max = 100, color}: StatCircleProps) => {
  const theme = useTheme();
  const strokeColor = color ?? theme.colors.primary;

  const radius = 50;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const offset = circumference * (1 - percentage);

  return (
    <CircleWrapper>
      <svg width={120} height={120}>
        {/* Background track circle */}
        <circle
          cx="60"
          cy="60"
          r={radius - 1} // background circle
          stroke={theme.colors.warning}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <circle
          cx="60"
          cy="60"
          r={radius} // foreground animated circle
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="butt" // <-- change from round
          transform="rotate(-90 60 60)">
          <animate
            attributeName="stroke-dashoffset"
            from={circumference}
            to={offset}
            dur="1s"
            fill="freeze"
          />
        </circle>
        {/* Inner circle to create donut */}
        <circle
          cx="60"
          cy="60"
          r={radius - strokeWidth / 2}
          fill={theme.colors.background}
        />
        {/* Center text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="22"
          fontWeight="bold"
          fill={theme.colors.text}>
          {value}%
        </text>
      </svg>
      <Label>{label}</Label>
    </CircleWrapper>
  );
};

export default StatCircle;

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  margin-top: ${({theme}) => theme.spacing(2)};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  font-size: ${({theme}) => theme.fontSizes.sm};
  text-align: center;
  max-width: 150px;
  word-break: break-word;
`;
