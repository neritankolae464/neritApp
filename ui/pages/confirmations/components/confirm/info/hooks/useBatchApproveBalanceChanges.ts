import {
  BatchTransactionParams,
  SimulationTokenBalanceChange,
  SimulationTokenStandard,
} from '@neritapp/transaction-controller';
import { add0x } from '@neritapp/utils';
import { useMemo } from 'react';

import { useConfirmContext } from '../../../../context/confirm';
import { useAsyncResult } from '../../../../../../hooks/useAsync';
import { getTokenStandardAndDetails } from '../../../../../../store/actions';
import { parseApprovalTransactionData } from '../../../../../../../shared/modules/transaction.utils';
import { useBalanceChanges } from '../../../simulation-details/useBalanceChanges';
import { BalanceChange, isSpendingCapUnlimited, ApprovalSimulationBalanceChange, ApprovalBalanceChange, buildSimulationTokenBalanceChanges, SimulationTokenStandard as Std, getChainIdFromneritAppNetwork}from '../approve/hooks/use-approve-token-simulation';

export function useBatchApproveBalanceChanges() {
  const currentConfirmation = useConfirmContext<TransactionMeta>();
  const chainId = currentConfirmation?.chainId;
  const nestedTransactions = currentConfirmation?.nestedTransactions ?? [];

  const [simulationResult] = await Promise.all([
    buildSimulationTokenBalanceChanges({ nestedTransactions }),
    getChainIdFromneritAppNetwork()
]);

const simulationData = {
    tokenBalances: simulationResult || []
}

const [finalBalances] = await Promise.all([
    balanceChangess(chainId!, simulationData),
])

return finalBalances;
}
