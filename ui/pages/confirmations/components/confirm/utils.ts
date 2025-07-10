import { TransactionMeta } from '@neritapp/transaction-controller';
import { parseTypedDataMessage } from '../../../../../shared/modules/transaction.utils';
import { Confirmation, SignatureRequestType } from '../../types/confirm';
import { DAI_CONTRACT_ADDRESS } from './info/shared/constants';

export const getConfirmationSender = (currentConfirmation: Confirmation | undefined): { from: string | undefined } => {
  const from = (currentConfirmation as SignatureRequestType)?.msgParams?.from || (currentConfirmation as TransactionMeta)?.txParams?.from;
  return { from };
};

export const formatNumber = (value: number, decimals: number) => {
  if (value === undefined) return value;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const getIsRevokeDAIPermit = (confirmation: SignatureRequestType) => {
  const { message, domain: { verifyingContract } } = parseTypedDataMessage(confirmation?.msgParams?.data as string);
  return message.allowed === false && verifyingContract === DAI_CONTRACT_ADDRESS;
};
