// atoms/LoadingButton.tsx
'use client';

import styled from '@emotion/styled';
import {memo} from 'react';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label: string;
}

const LoadingButton = ({
  loading = false,
  label,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <Spinner /> : label}
    </Button>
  );
};

export default memo(LoadingButton);

const Spinner = styled.div`
  border: 2px solid ${({theme}) => theme.colors.spinnerTrack};
  border-top: 2px solid ${({theme}) => theme.colors.spinner};
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  animation: spin 0.6s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({theme}) => theme.spacing(3)} 0;
  font-size: ${({theme}) => theme.fontSizes.lg};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  border: none; /* 🔥 remove default border */
  border-radius: ${({theme}) => theme.radii.md};
  background: ${({theme}) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover:enabled {
    background: ${({theme}) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
