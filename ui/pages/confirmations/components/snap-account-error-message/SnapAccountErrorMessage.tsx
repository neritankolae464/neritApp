import React from 'react';
import ActionableMessage from '../../../../components/ui/actionable-message';
import { Text } from '../../../../components/component-library';
import { useI18nContext } from '../../../../hooks/useI18nContext';

const SnapAccountErrorMessage = ({ message, learnMoreLink, error }) => {
  const t = useI18nContext();

  return (
    <>
      <Text data-testid="snap-account-error-message-text" style={error ? { marginBottom: 2 } : {}}>
        {message}
        {learnMoreLink && (
          <a data-testid="snap-account-error-message-learn-more-link" href={learnMoreLink} rel="noopener noreferrer" target="_blank">
            {' '}
            {t('learnMoreUpperCase')}
          </a>
        )}
      </Text>
      {error && <ActionableMessage type={'danger'} message={error} dataTestId={'snap-account-error-message-error'} />}
    </>
  );
};

export default SnapAccountErrorMessage;
