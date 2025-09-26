import {memo, forwardRef, ReactNode} from 'react';
import styled from '@emotion/styled';
import InputLabel from '../../atoms/InputLabel';

export type Option<T> = {
  value: T;
  label: string;
};

type CheckboxGroupProps<T> = {
  label: string;
  options: {value: T; label: string}[];
  selected: T[];
  onChange: (selected: T[]) => void;
  required?: boolean;
};

const CheckboxGroupInner = <T extends string | number>(
  {label, options, selected, onChange, required = false}: CheckboxGroupProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const handleCheckboxClick = (value: T) => {
    const updated = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    onChange(updated); // update parent via Controller
  };

  return (
    <Field ref={ref}>
      <LabelWrapper>
        {required && <RequiredMark>*</RequiredMark>}
        <InputLabel fieldType="roofOrientation">{label}</InputLabel>
      </LabelWrapper>
      {options.map(option => (
        <CheckboxWrapper key={option.value.toString()}>
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => handleCheckboxClick(option.value)}
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

const RequiredMark = styled.span`
  color: ${({theme}) => theme.colors.danger};
  margin-left: 0.25rem;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing(1)};
`;
