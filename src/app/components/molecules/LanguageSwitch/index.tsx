'use client';

import {FC, memo} from 'react';
import styled from '@emotion/styled';
import {useLocaleStore} from '@solar/app/stores/useLocaleStore';

type LanguageSwitchProps = {
  options: string[];
};

const LanguageSwitch: FC<LanguageSwitchProps> = ({options}) => {
  const language = useLocaleStore(state => state.language);
  const setLanguage = useLocaleStore(state => state.setLanguage);

  return (
    <SwitchContainer>
      {options.map(opt => {
        const isActive = language === opt;
        return (
          <SwitchButton
            key={opt}
            active={isActive}
            type="button"
            onClick={() => setLanguage(opt)}>
            {opt.toUpperCase()}
          </SwitchButton>
        );
      })}
    </SwitchContainer>
  );
};

export default memo(LanguageSwitch);

const SwitchContainer = styled.div`
  display: inline-flex; /* shrink to fit buttons */
  border-radius: 9999px; /* pill shape */
  background-color: ${({theme}) => theme.colors.border};
  box-shadow: 0 2px 6px ${({theme}) => theme.colors.primary};
  overflow: hidden;
  width: fit-content;
`;

const SwitchButton = styled.button<{active: boolean}>`
  width: 40px;
  height: 40px;
  border: none;
  background-color: ${({active, theme}) =>
    active ? theme.colors.warning : theme.colors.background};
  color: ${({active, theme}) =>
    active ? theme.colors.background : theme.colors.text};
  font-weight: ${({active, theme}) =>
    active ? theme.fontWeights.bold : theme.fontWeights.medium};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:focus {
    outline: none;
  }
`;
