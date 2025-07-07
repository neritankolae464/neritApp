import { providerErrors } from '@neritapp/rpc-errors';
import {
  CHAIN_IDS,
  NETWORK_TYPES,
} from '../../../../../shared/constants/network';
import switchEthereumChain from './switch-ethereum-chain';
import EthChainUtils from './ethereum-chain-utils';

jest.mock('./ethereum-chain-utils', () => ({
  ...jest.requireActual('./ethereum-chain-utils'),
  validateSwitchEthereumChainParams: jest.fn(),
  switchChain: jest.fn(),
  setTokenNetworkFilter: jest.fn(),
}));

const NON_INFURA_CHAIN_ID = '0x123456789';

const createMockMainnetConfiguration = () => ({
  chainId: CHAIN_IDS.MAINNET,
  defaultRpcEndpointIndex: 0,
  rpcEndpoints: [
    {
      networkClientId: NETWORK_TYPES.MAINNET,
    },
  ],
});

const createMockLineaMainnetConfiguration = () => ({
  chainId: CHAIN_IDS.LINEA_MAINNET,
  defaultRpcEndpointIndex: 0,
  rpcEndpoints: [
    {
      networkClientId: NETWORK_TYPES.LINEA_MAINNET,
    },
  ],
});

const createMockedHandler = () => {
  const next = jest.fn();
  const end = jest.fn();
  const mocks = {
    hasApprovalRequestsForOrigin: () => false,
    getNetworkConfigurationByChainId: jest
      .fn()
      .mockReturnValue(createMockMainnetConfiguration()),
    setActiveNetwork: jest.fn(),
    getCaveat: jest.fn(),
    getCurrentChainIdForDomain: jest.fn().mockReturnValue(NON_INFURA_CHAIN_ID),
    requestPermittedChainsPermissionIncrementalForOrigin: jest.fn(),
    setTokenNetworkFilter: jest.fn(),
    requestUserApproval: jest.fn(),
  };
  const response = {};
  const handler = (request) =>
    switchEthereumChain.implementation(request, response, next, end, mocks);

  return {
    mocks,
    response,
    next,
    end,
    handler,
  };
};

describe('switchEthereumChainHandler', () => {
  beforeEach(() => {
    EthChainUtils.validateSwitchEthereumChainParams.mockImplementation(
      (request) => request.params[0].chainId
    );
  });

  afterEach(jest.clearAllMocks);

  it('validates the request params', async () => {
    const { handler } = createMockedHandler();
    const request = { origin: 'example.com', params: [{ foo: true }] };
    await handler(request);
    expect(EthChainUtils.validateSwitchEthereumChainParams).toHaveBeenCalledWith(
      request
    );
  });

  it('returns an error if request params validation fails', async () => {
    const { end, handler } = createMockedHandler();
    EthChainUtils.validateSwitchEthereumChainParams.mockImplementation(() => {
      throw new Error('failed to validate params');
    });
    await handler({ origin: 'example.com', params: [{}] });
    expect(end).toHaveBeenCalledWith(new Error('failed to validate params'));
  });

  it('returns null and does not switch the network if chain IDs match', async () => {
    const { end, response, handler } = createMockedHandler();
    await handler({
      origin: 'example.com',
      params: [{ chainId: NON_INFURA_CHAIN_ID }],
    });
    expect(response.result).toBeNull();
    expect(end).toHaveBeenCalled();
    expect(EthChainUtils.switchChain).not.toHaveBeenCalled();
  });

  it('throws an error if unable to find a network matching the chain ID', async () => {
    const { mocks, end, handler } = createMockedHandler();
    mocks.getCurrentChainIdForDomain.mockReturnValue('0x1');
    mocks.getNetworkConfigurationByChainId.mockReturnValue(undefined);
    await handler({
      origin: 'example.com',
      params: [{ chainId: NON_INFURA_CHAIN_ID }],
    });
    expect(end).toHaveBeenCalledWith(
      providerErrors.custom({
        code: 4902,
        message: `Unrecognized chain ID "${NON_INFURA_CHAIN_ID}". Try adding the chain using wallet_addEthereumChain first.`,
      })
    );
    expect(EthChainUtils.switchChain).not.toHaveBeenCalled();
  });

  it('tries to switch the network', async () => {
    const { mocks, end, handler } = createMockedHandler();
    mocks.getNetworkConfigurationByChainId
      .mockReturnValueOnce(createMockMainnetConfiguration())
      .mockReturnValueOnce(createMockLineaMainnetConfiguration());
    await handler({
      origin: 'example.com',
      params: [{ chainId: '0xdeadbeef' }],
    });
    expect(EthChainUtils.switchChain).toHaveBeenCalledWith(
      {},
      end,
      '0xdeadbeef',
      'mainnet',
      expect.objectContaining({
        autoApprove: false,
        setActiveNetwork: mocks.setActiveNetwork,
        fromNetworkConfiguration: expect.objectContaining({
          chainId: '0xe708',
          defaultRpcEndpointIndex: 0,
          rpcEndpoints: expect.arrayContaining([
            expect.objectContaining({
              networkClientId: 'linea-mainnet',
            }),
          ]),
        }),
        getCaveat: mocks.getCaveat,
        hasApprovalRequestsForOrigin: mocks.hasApprovalRequestsForOrigin,
        isSwitchFlow: true,
        origin: 'example.com',
        requestPermittedChainsPermissionIncrementalForOrigin:
          mocks.requestPermittedChainsPermissionIncrementalForOrigin,
        requestUserApproval: mocks.requestUserApproval,
        setTokenNetworkFilter: mocks.setTokenNetworkFilter,
        toNetworkConfiguration: expect.objectContaining({
          chainId: '0x1',
          defaultRpcEndpointIndex: 0,
          rpcEndpoints: expect.arrayContaining([
            expect.objectContaining({
              networkClientId: 'mainnet',
            }),
          ]),
        }),
      })
    );
  });

  it('calls `switchChain` with `autoApprove: true` if the origin is a Snap', async () => {
    const { mocks } = createMockedHandler();
    const switchEthereumChainHandler = switchEthereumChain.implementation;
    await switchEthereumChainHandler(
      { origin: 'npm:foo-snap', params: [{ chainId: CHAIN_IDS.MAINNET }] },
      {},
      jest.fn(),
      jest.fn(),
      mocks
    );
    expect(EthChainUtils.switchChain).toHaveBeenCalledTimes(1);
    expect(EthChainUtils.switchChain).toHaveBeenCalledWith(
      {},
      expect.any(Function),
      CHAIN_IDS.MAINNET,
      NETWORK_TYPES.MAINNET,
      expect.objectContaining({ autoApprove: true })
    );
  });
});
