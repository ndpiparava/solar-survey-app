import type {Metadata} from 'next';
import {AppWrapper} from './AppWrapper';

export const metadata: Metadata = {
  title: 'Solar Survey App',
  description: 'Get your solar survey done in minutes!',
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html>
      <head />

      <AppWrapper>{children}</AppWrapper>
    </html>
  );
};

export default RootLayout;
