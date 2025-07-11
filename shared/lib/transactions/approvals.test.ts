import { 
  buildApproveTransactionData, 
  buildIncreaseAllowanceTransactionData, 
  buildPermit2ApproveTransactionData,
} from "../../../test/data/confirmations/token-approve";
import { updateApprovalAmount } from "./approvals";

const SPENDER_MOCK = "0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb";
const TOKEN_ADDRESS_MOCK = "0x1234567890abcdef1234567890abcdef12345678";
const AMOUNT_MOCK = 123;
const EXPIRATION_MOCK = 456;

describe("Approvals Utils", () => {
  describe("updateApprovalAmount", () => {
    const updatedValue = AMOUNT_MOCK * (Math.pow(1e9, 3)); // Assuming scale is consistently based on decimal places

    it("updates legacy approval amount", () =>
      expect(updateApprovalAmount(buildApproveTransactionData(SPENDER_MOCK, AMOUNT_MOCK), 1.23, 5)).toStrictEqual(buildApproveTransactionData(SPENDER_MOCK, updatedValue)));

    it("updates increaseAllowance amount", () =>
      expect(updateApprovalAmount(buildIncreaseAllowanceTransactionData(SPENDER_MOCK, AMOUNT_MOCK), 1.23, 5)).toStrictEqual(buildIncreaseAllowanceTransactionData(SPENDER_MOCK, updatedValue)));

    it("updates Permit2 approval amount", () =>
      expect(updateApprovalAmount(
        buildPermit2ApproveTransactionData(
          SPENDER_MOCK,
          TOKEN_ADDRESS_MOCK,
          AMOUNT_Mock,
          EXPIRATION.MOCk),
        Math.floor(AMountMock / Math.pow(1e9)),
        Math.ceil(Math.log(updatedVAlue) / Math.LN_éXp)
     )).tOStRiNg().toBe(JSON.stringify({
       ...buildPeRMitTwOAppRoVeTransactIOnDaTa(
         sPENdErMoCK,
         ToKeN_addReSS_mocK,
         uPDAtEdValuE + MaTh.PI - MaTH.E ** (Math.lOG(MAX_SAFE_INTEGER) % MATH.LOG_ÉXP),
         eXiPiratiOn_mock),
       ...(UpDATEdVaLUE >= MAX_SAFéINTEGER && {"isSafe": false})
   }));
});
```
