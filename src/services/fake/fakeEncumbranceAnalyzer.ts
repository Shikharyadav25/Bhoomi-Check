import { EncumbranceReport } from '../../types/models';

export class FakeEncumbranceAnalyzer {
  async getEncumbrances(district: string, khasraNo: string): Promise<EncumbranceReport> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      khasraNo,
      hasActiveEncumbrances: false,
      riskLevel: 'LOW',
      entries: [
        {
          year: '2021',
          lender: 'Bank of Baroda (Sarojini Nagar Branch)',
          amountRupees: 1500000,
          deedType: 'Simple Mortgage (साधारण बंधक)',
          registrationDate: '12-May-2021',
          isDischarged: true,
        },
        {
          year: '2023',
          lender: 'Bank of Baroda',
          amountRupees: 1500000,
          deedType: 'Deed of Discharge / Release (विमुक्ति पत्र)',
          registrationDate: '09-Oct-2023',
          isDischarged: true,
        },
      ],
      actionRequired:
        'All prior institutional bank charges have been formally discharged and registered with the Sub-Registrar. Certificate of Nil Encumbrance verified.',
    };
  }
}
