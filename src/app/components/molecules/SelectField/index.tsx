import {SelectHTMLAttributes, ReactNode, memo} from 'react';
import styled from '@emotion/styled';

import {SurveyDataKeyType} from '@solar/app/shared/types/survey';
import InputLabel from '../../atoms/InputLabel';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
  fieldType: SurveyDataKeyType;
  required?: boolean;
};

const SelectField = ({
  label,
  fieldType,
  required = false,
  children,
  ...props
}: SelectFieldProps) => {
  return (
    <div>
      <LabelWrapper>
        {required && <RequiredMark>*</RequiredMark>}
        <InputLabel fieldType={fieldType}>{label}</InputLabel>
      </LabelWrapper>
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

const RequiredMark = styled.span`
  color: ${({theme}) => theme.colors.danger};
  margin-left: 0.25rem;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing(1)};
`;
