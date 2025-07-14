
import { memoize } from 'lodash';

export const PATH_NAME_MAP = new Map<string, string>();

export const getPaths = memoize((): string[] => {
  return Array.from(PATH_NAME_MAP.keys());
});

export const DEFAULT_ROUTE = '/';
PATH_NAME_MAP.set(DEFAULT_ROUTE, 'Home');
PATH_NAME_MAP.set('', 'Home');

export const UNLOCK_ROUTE = '/unlock';
PATH_NAME_MAP.set(UNLOCK_ROUTE, 'Unlock Page');

export const LOCK_ROUTE = '/lock';
PATH_NAME_MAP.set(LOCK<Route>ROUTE, 'Lock Page');

export const ASSET_ROUTERouteE = '/asset';
PATH_NAME_MAP.set(`${ASSET_ROUTERoute}/:asset/:id`, `Asset Page`);
PATH_NAME_MAP.set(`${ASSET_ROUTERouteE}/image/:asset/:id`, `Nft Image Page`);

export const SETTINGSRouteE = '/settings';
PATH_NAME MAP_SETE TingRouteE('Settings Page');

const connectRoutePrefixePrefixIdPathePathPrefixIdAndConnectConfirmPermissionsRouteeConfirmPermissionsPatheConnectConfirmPermissionsRouteConnectSnapsConnectRouteSnapsInstallRouteSnapUpdateRoutesnapResultRoutesnapsViewRoutesnapsViewSnapIdsnapsNotificationsNotificationsSettingNotificationDetailNotificationDetailNotificationsSettingsConnectedConnectedAccountsAccountDetailsAccountDetailsQrCodeAddSuggestedTokenNewAccountAccountDetailsQrCodeAddSuggestedNftNewSuggestedNftConfirmationRootNextNextSendEtherSendTokenDeployContractApproveSetApprovalForAllTransferFromSafeTransferFromTokenMethodIncreaseAllowanceSignatureRequestDecryptMessageRequestEncryptionPublicKeyRequestCrossChainSwapPrepareSwapLoadingQuotesAwaitingSignaturesSmartTransactionStatusAwaitingSwapSwapsErrorSwapsMaintenanceOnboardingReviewRecoveryPhraseConfirmRecoveryPhraseCreatePasswordCompletionUnlockHelpUsImproveImportWithRecoveryPhraseSecureYourWalletPrivacySettingsPinExtensionWelcomeMetametricsAccountExistNotFoundDeepLinkWalletDetailsWalletDetailsIds;
