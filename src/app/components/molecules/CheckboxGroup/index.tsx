import {memo, forwardRef, ReactNode} from 'react';
import styled from '@emotion/styled';
import InputLabel from '../../atoms/InputLabel';

export type Option<T> = {
  value: T;
  label: string;
};

type CheckboxGroupProps<T> = {
  label: string;
  options: Option<T>[];
  selected: T[];
  onChange: (value: T) => void;
};

const CheckboxGroupInner = <T extends string | number>(
  {label, options, selected, onChange}: CheckboxGroupProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  return (
    <Field ref={ref}>
      <InputLabel fieldType="roofOrientation">{label}</InputLabel>
      {options.map(option => (
        <CheckboxWrapper key={option.value.toString()}>
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </CheckboxWrapper>
      ))}
    </Field>
  );
};

const CheckboxGroup = memo(forwardRef(CheckboxGroupInner)) as <
  T extends string | number,
>(
  props: CheckboxGroupProps<T> & {ref?: React.Ref<HTMLDivElement>},
) => ReactNode;

export default CheckboxGroup;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(1)};
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing(2)};
`;
