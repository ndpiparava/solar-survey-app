import styled from '@emotion/styled';
import React, {memo, ReactNode} from 'react';
import FieldTypeIcon from '../FieldTypeIcon';
import {SurveyDataKeyType} from '@solar/app/shared/types/survey';

type InputLabelProps<T extends SurveyDataKeyType> = {
  htmlFor?: string;
  children: ReactNode;
  fieldType: T;
};

const InputLabel = <T extends SurveyDataKeyType>({
  htmlFor,
  children,
  fieldType,
}: InputLabelProps<T>) => {
  return (
    <LabelWrapper>
      <FieldTypeIcon fieldType={fieldType} size={18} />
      <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
    </LabelWrapper>
  );
};

export default memo(InputLabel);

const StyledLabel = styled.label`
  font-weight: 600;
  margin-bottom: ${({theme}) => theme.spacing(1)};
  display: block;
  color: ${({theme}) => theme.colors.label};
  font-size: ${({theme}) => theme.fontSizes.sm};
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing(2)};
  margin-bottom: ${({theme}) => theme.spacing(1)};
`;
