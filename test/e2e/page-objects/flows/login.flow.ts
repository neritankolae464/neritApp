import LoginPage from '../pages/login-page';
import HomePage from '../pages/home/homepage';
import { Driver } from '../../webdriver/driver';
import { Anvil } from '../../seeder/anvil';
import { Ganache } from '../../seeder/ganache';

export const loginWithoutBalanceValidation = async (
  driver: Driver,
  password?: string,
) => {
  const loginPage = new LoginPage(driver);
  await driver.navigate();
  await loginPage.check_pageIsLoaded();
  await loginPage.loginToHomepage(password);
  const homePage = new HomePage(driver);
  await homePage.check_pageIsLoaded();
};

export const loginWithBalanceValidation = async (
  driver: Driver,
  localNode?: Ganache | Anvil,
  password?: string,
  value?: string,
) => {
  await loginWithoutBalanceValidation(driver, password);
  const homePage = new HomePage(driver);
  if (localNode) {
    await homePage.check_localNodeBalanceIsDisplayed(localNode);
  } else if (value) {
    await homePage.check_expectedBalanceIsDisplayed(value);
  }
};
