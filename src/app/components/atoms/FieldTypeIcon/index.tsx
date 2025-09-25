'use client';
import {memo} from 'react';
import {FaHome, FaBolt, FaClock, FaLightbulb} from 'react-icons/fa';
import styled from '@emotion/styled';
import {SurveyDataKeyType} from '@solar/app/shared/types/survey';
import {MdRoofing} from 'react-icons/md';

type FieldTypeIconProps = {
  fieldType: SurveyDataKeyType;
  size?: number;
  color?: string;
};

const fieldIcons: Record<SurveyDataKeyType, React.ElementType> = {
  propertyType: FaHome,
  roofOrientation: MdRoofing,
  roofAge: FaClock,
  electricityUsage: FaBolt,
  otherEnergy: FaLightbulb,
};

const FieldTypeIcon = ({fieldType, size = 16, color}: FieldTypeIconProps) => {
  const Icon = fieldIcons[fieldType];
  if (!Icon) return null;

  return (
    <IconWrapper fieldType={fieldType} color={color}>
      <Icon size={size} />
    </IconWrapper>
  );
};

const IconWrapper = styled.span<{fieldType: SurveyDataKeyType; color?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme, fieldType, color}) => {
    switch (fieldType) {
      case 'propertyType':
        return color || theme.colors.primary;
      case 'roofOrientation':
        return color || theme.colors.warning;
      case 'roofAge':
        return color || theme.colors.danger;
      case 'electricityUsage':
        return color || theme.colors.danger;
      case 'otherEnergy':
        return color || theme.colors.success;
      default:
        return color || theme.colors.text;
    }
  }};
`;

export default memo(FieldTypeIcon);
