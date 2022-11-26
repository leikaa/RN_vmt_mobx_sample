export default class TransactionRenderHelper {
  static isTransactionAmountValid = (amountCurrent: number, amountToTransfer: number) => {
    return amountToTransfer <= amountCurrent && amountToTransfer > 0;
  };
}
