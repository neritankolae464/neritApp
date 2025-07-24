import { useCallback } from 'react';
import { generateSignatureUniqueId } from '../../../helpers/utils/metrics';
import { updateEventFragment } from '../../../store/actions';
import { useConfirmContext } from '../context/confirm';
import { SignatureRequestType } from '../types/confirm';
import { isSignatureTransactionType } from '../utils';

export const useSignatureEventFragment = () => {
  const { currentConfirmation } = useConfirmContext();
  const requestId = isSignatureTransactionType(currentConfirmation) ? (currentConfirmation as SignatureRequestType)?.msgParams?.requestId : null;
  const fragmentId = requestId ? generateSignatureUniqueId(requestId) : null;
  const updateSignatureEventFragment = useCallback(async (fragmentPayload: Partial<MetaMetricsEventFragment>) => {
    if (fragmentId) updateEventFragment(fragmentId, fragmentPayload);
  }, [fragmentId]);
  return { updateSignatureEventFragment };
};
