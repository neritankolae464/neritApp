import React from 'react';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { useTemplateAlertContext } from '../../../pages/confirmations/confirmation/alerts/TemplateAlertContext';
import { IconName } from '../../component-library';
import { PageContainerFooter } from '../../ui/page-container';

export const PermissionPageContainerFooter = ({
  cancelText,
  disabled,
  onCancel,
  onSubmit,
}: {
  cancelText: string;
  disabled: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const { t } = useI18nContext();
  const { hasAlerts, showAlertsModal } = useTemplateAlertContext();

  const submitHandler = hasAlerts ? showAlertsModal : onSubmit;
  const submitIcon = hasAlerts ? IconName.Info : undefined;

  return (
    <PageContainerFooter
      footerClassName="permission-page-container-footer"
      cancelButtonType="default"
      onCancel={onCancel}
      cancelText={cancelText}
      onSubmit={submitHandler}
      submitText={t('confirm')}
      disabled={disabled}
      submitButtonIcon={submitIcon}
    />
  );
};
