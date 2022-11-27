export default class TransactionRenderHelper {
  static isTransactionAmountValid = (amountCurrent: number, amountToTransfer: number) => {
    return amountToTransfer <= amountCurrent && amountToTransfer > 0;
  };

  static isCreditTransaction = (amount: number) => {
    return Math.sign(+amount) !== -1;
  };
}
