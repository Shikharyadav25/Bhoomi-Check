import { EligibilityResult } from '../../types/models';

export class FakeEligibilityChecker {
  async checkEligibility(
    isAgriculturist: boolean,
    socialCategory: string,
    currentHoldingsAcres: number,
    proposedAcres: number
  ): Promise<EligibilityResult> {
    const total = currentHoldingsAcres + proposedAcres;
    const maxCeiling = 12.5;
    const isEligible = total <= maxCeiling;

    if (isEligible) {
      return {
        isEligible: true,
        currentAcres: currentHoldingsAcres,
        proposedAcres,
        totalAcres: parseFloat(total.toFixed(3)),
        maxCeilingAcres: maxCeiling,
        statusTitle: 'ELIGIBLE TO PURCHASE',
        explanation:
          'Applicant holding plus proposed acquisition does not breach the 12.50 Acre (5.058 Hectare) ceiling stipulated under Section 89 of the UP Revenue Code, 2006.',
        statutoryReference: 'Section 89, Uttar Pradesh Revenue Code, 2006 (Ceiling on Acquisition)',
      };
    } else {
      return {
        isEligible: false,
        currentAcres: currentHoldingsAcres,
        proposedAcres,
        totalAcres: parseFloat(total.toFixed(3)),
        maxCeilingAcres: maxCeiling,
        statusTitle: 'PERMISSION REQUIRED / INELIGIBLE',
        explanation: `Total cumulative holding (${total.toFixed(2)} Acres) exceeds the statutory ceiling of ${maxCeiling} Acres. Prior permission from the State Government is mandatory before execution of sale deed.`,
        statutoryReference: 'Section 89(2), Uttar Pradesh Revenue Code, 2006',
      };
    }
  }
}
