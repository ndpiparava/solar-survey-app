'use client';
import {FormFieldOption} from '@solar/app/shared/types/survey';
import {memo} from 'react';
import {IntlShape} from 'react-intl';

type SelectOptionsProps<T extends string> = {
  options: FormFieldOption<T>[];
  intl: IntlShape;
};

const SelectOptions = <T extends string>({
  options,
  intl,
}: SelectOptionsProps<T>) => (
  <>
    {options.map(({value, labelId}) => (
      <option key={value} value={value}>
        {intl.formatMessage({id: labelId})}
      </option>
    ))}
  </>
);

export default memo(SelectOptions);
