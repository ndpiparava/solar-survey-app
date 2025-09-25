'use client';

import styled from '@emotion/styled';
import {memo, ReactNode} from 'react';

type BadgeProps = {
  color: string;
  children: ReactNode;
};

const Badge = ({color, children}: BadgeProps) => {
  return <StyledBadge color={color}>{children}</StyledBadge>;
};

export default memo(Badge);

const StyledBadge = styled.span<{color: string}>`
  background-color: ${({color}) => color};
  color: white;
  font-weight: ${({theme}) => theme.fontWeights.medium};
  padding: ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(2)};
  border-radius: ${({theme}) => theme.radii.md};
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing(1)};
  animation: fadeInUp 0.5s ease-out;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(4px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
