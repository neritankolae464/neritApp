import { withFixtures } from '../../../helpers';
import FixtureBuilder from '../../../fixture-builder';
import HeaderNavbar from '../../../page-objects/pages/header-navbar';
import Homepage from '../../../page-objects/pages/home/homepage';
import NFTListPage from '../../../page-objects/pages/home/nft-list';
import PrivacySettings from '../../../page-objects/pages/settings/privacy-settings';
import SettingsPage from '../../../page-objects/pages/settings/settings-page';
import { loginWithBalanceValidation } from '../../../page-objects/flows/login.flow';
import { setupAutoDetectMocking } from './mocks';

describe('NFT detection', function () {
  it('displays NFT media', async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder()
          .withNetworkControllerOnMainnet()
          .withEnabledNetworks({ eip155: { '0x1': true, '0x5': true } })
          .build(),
        driverOptions: { mock: true },
        title: this.test?.fullTitle(),
        testSpecificMock: setupAutoDetectMocking,
      },
      async ({ driver }) => {
        await loginWithBalanceValidation(driver);
        const header = new HeaderNavbar(driver);
        const settings = new SettingsPage(driver);
        const privacy = new PrivacySettings(driver);
        const homepage = new Homepage(driver);
        const nftList = new NFTListPage(driver);

        await header.openSettingsPage();
        await settings.check_pageIsLoaded();
        await settings.goToPrivacySettings();

        await privacy.check_pageIsLoaded();
        await privacy.toggleAutodetectNft();
        
        await settings.closeSettingsPage();

        await homepage.check_pageIsLoaded();
        
		await homepage.check_expectedBalanceIsDisplayed();
		await homepage.goToNftTab();

		await nftList.check_nftNameIsDisplayed('ENS: Ethereum Name Service');
		await nftList.check_nftImageIsDisplayed();
      },
    );
  });
});
