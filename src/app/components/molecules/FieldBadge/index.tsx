'use client';

import {SurveyDataKeyType} from '@solar/app/shared/types/survey';
import Badge from '../../atoms/Badge';
import FieldTypeIcon from '../../atoms/FieldTypeIcon';
import {memo} from 'react';

type FieldBadgeProps = {
  fieldType: SurveyDataKeyType;
  value: string;
  color: string;
};

const FieldBadge = ({fieldType, value, color}: FieldBadgeProps) => {
  return (
    <Badge color={color}>
      <FieldTypeIcon fieldType={fieldType} />
      {value}
    </Badge>
  );
};

export default memo(FieldBadge);
