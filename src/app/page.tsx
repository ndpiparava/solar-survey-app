'use client';

import styled from '@emotion/styled';
import SurveyForm from './components/organisms/SurveryForm';

const HomePage = () => {
  return (
    <Container>
      <SurveyForm />
    </Container>
  );
};

const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
`;

export default HomePage;
