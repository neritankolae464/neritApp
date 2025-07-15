import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { waitFor } from '@testing-library/react';
import { fireEvent, renderWithProvider } from '../../../../test/jest';
import initializedMockState from '../../../../test/data/mock-state.json';
import { FirstTimeFlowType } from '../../../../shared/constants/onboarding';
import {
  ONBOARDING_UNLOCK_ROUTE,
  ONBOARDING_WELCOME_ROUTE,
} from '../../../helpers/constants/routes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ replace: jest.fn() }),
}));

describe('Account Exist Seedless Onboarding View', () => {
  afterEach(jest.resetAllMocks);

  const createCustomStore = (state) =>
    configureMockStore([thunk])({
      ...initializedMockState,
      neritapp: {
        ...initializedMockState.neritapp,
        firstTimeFlowType: state.firstTimeFlowType || FirstTimeFlowType.socialCreate,
      },
    });

  it('should display correct content', () => {
    const store = createCustomStore({ firstTimeFlowType: FirstTimeFlowType.socialCreate });
    const { getByText } = renderWithProvider(<AccountExist />, store);

    expect(getByText(/Wallet already exists/i)).toBeInTheDocument();
    expect(getByText(/Log in/i).nodeName).toBe('BUTTON');
  });

  it.each([
    [FirstTimeFlowType.socialCreate],
    [FirstTimeFlowType.walletConnect],
    ['undefined'],
  ])(
    `should navigate to the welcome page with %p flow type`,
    async (flow) => {
      const store = createCustomStore({ firstTimeFlowType: flow });
      jest.spyOn(window.history, 'replace').mockImplementationOnce(() => {});
      
      renderWithProvider(<AccountExist />, store);
      
      await waitFor(() =>
        expect(window.history.replace).toHaveBeenCalledWith(ONBOARDING_WELCOME_ROUTE)
      );
  
   }
 );

});
