'use client';

import {ThemeProvider} from '@emotion/react';
import {theme} from './theme';
import styled from '@emotion/styled';
import {IntlProvider} from 'react-intl';
import {useLocaleStore} from './stores/useLocaleStore';
import {translations} from './translations';
import {Inter} from 'next/font/google';
import {CacheProvider} from '@emotion/react';
import {createEmotionCache} from './utils/emotion';

const clientCache = createEmotionCache();

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const AppWrapper = ({children}: {children: React.ReactNode}) => {
  const language = useLocaleStore(state => state.language) || 'en';
  return (
    <IntlProvider messages={translations[language]} locale={language}>
      <ThemeProvider theme={theme}>
        <CacheProvider value={clientCache}>
          <Body className={inter.className}>{children}</Body>
        </CacheProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

const Body = styled.body`
  margin: 0;
  padding: 0;
  font-family: ${({theme}) => theme.fonts.body};
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
