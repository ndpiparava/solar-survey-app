import styled from '@emotion/styled';
import {InputHTMLAttributes, memo} from 'react';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const TextInput = ({label, ...props}: TextInputProps) => (
  <Wrapper>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput {...props} />
  </Wrapper>
);

export default memo(TextInput);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledLabel = styled.label`
  font-weight: 500;
  font-size: ${({theme}) => theme.fontSizes.sm};
  color: ${({theme}) => theme.colors.label};
`;

const StyledInput = styled.input`
  padding: ${({theme}) => theme.spacing(2)};
  border-radius: ${({theme}) => theme.radii.md};
  border: 1px solid ${({theme}) => theme.colors.border};
  font-size: ${({theme}) => theme.fontSizes.base};
  width: 100%;
  box-sizing: border-box;
`;
