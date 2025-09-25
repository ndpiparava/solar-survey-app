'use client';

import styled from '@emotion/styled';
import {memo, ReactNode} from 'react';

type SummaryItemProps = {
  label: string;
  children: ReactNode;
};

const SummaryItem = ({label, children}: SummaryItemProps) => {
  return (
    <Row>
      <Label>{label}:</Label>
      <Content>{children}</Content>
    </Row>
  );
};

export default memo(SummaryItem);

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({theme}) => theme.spacing(2)};
`;

const Label = styled.span`
  font-weight: ${({theme}) => theme.fontWeights.bold};
  color: ${({theme}) => theme.colors.text};
  min-width: 150px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme}) => theme.spacing(2)};
`;
