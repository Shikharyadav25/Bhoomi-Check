import { BayanaAgreement } from '../../types/models';

export class FakeAgreementGenerator {
  async generateAgreement(
    sellerName: string,
    buyerName: string,
    district: string,
    tehsil: string,
    village: string,
    khasraNo: string,
    totalConsiderationRupees: number,
    advanceEarnestRupees: number,
    timelineMonths: number
  ): Promise<BayanaAgreement> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const balance = totalConsiderationRupees - advanceEarnestRupees;
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return {
      sellerName,
      buyerName,
      district,
      tehsil,
      village,
      khasraNo,
      totalConsiderationRupees,
      advanceEarnestRupees,
      balanceDueRupees: balance,
      timelineMonths,
      agreementDate: today,
    };
  }
}
