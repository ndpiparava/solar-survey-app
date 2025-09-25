import {SelectHTMLAttributes, ReactNode, memo} from 'react';
import styled from '@emotion/styled';

import {SurveyDataKeyType} from '@solar/app/shared/types/survey';
import InputLabel from '../../atoms/InputLabel';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
  fieldType: SurveyDataKeyType;
};

const SelectField = ({
  label,
  fieldType,
  children,
  ...props
}: SelectFieldProps) => {
  return (
    <div>
      <InputLabel fieldType={fieldType}>{label}</InputLabel>
      <StyledSelect {...props}>{children}</StyledSelect>
    </div>
  );
};

export default memo(SelectField);

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: ${({theme}) => theme.radii.md};
  border: 1px solid ${({theme}) => theme.colors.border};
  font-size: ${({theme}) => theme.fontSizes.base};
  width: 100%;
  box-sizing: border-box;
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};
`;
