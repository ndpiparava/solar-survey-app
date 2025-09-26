'use client';

import {ContactInfo} from '@solar/app/shared/types/survey';
import styled from '@emotion/styled';
import {useIntl} from 'react-intl';
import {memo} from 'react';
import TextInput from '../../atoms/TextInput';

type ContactFormProps = {
  contactForm?: ContactInfo;
  setForm: (updatedContact: ContactInfo) => void;
};

const contactFields = [
  {
    key: 'name',
    type: 'text',
    labelId: 'contactForm.name.label',
    placeholderId: 'contactForm.name.placeholder',
  },
  {
    key: 'email',
    type: 'email',
    labelId: 'contactForm.email.label',
    placeholderId: 'contactForm.email.placeholder',
  },
  {
    key: 'phone',
    type: 'tel',
    labelId: 'contactForm.phone.label',
    placeholderId: 'contactForm.phone.placeholder',
  },
] as const;

const ContactForm = ({contactForm, setForm}: ContactFormProps) => {
  const intl = useIntl();
  return (
    <FormWrapper>
      <Title>{intl.formatMessage({id: 'contactForm.title'})}</Title>

      {contactFields.map(({key, type, labelId, placeholderId}) => (
        <TextInput
          key={key}
          label={intl.formatMessage({id: labelId})}
          placeholder={intl.formatMessage({id: placeholderId})}
          type={type}
          value={contactForm?.[key] || ''}
          onChange={e =>
            setForm({
              ...contactForm,
              [key]: e.target.value,
            })
          }
        />
      ))}
    </FormWrapper>
  );
};

export default memo(ContactForm);

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(3)};
  margin-top: ${({theme}) => theme.spacing(4)};
`;

const Title = styled.h3`
  font-weight: ${({theme}) => theme.fontWeights.bold};
  margin-bottom: ${({theme}) => theme.spacing(2)};
  font-size: ${({theme}) => theme.fontSizes.lg};
  color: ${({theme}) => theme.colors.text};
`;
