import { TitleReport } from '../../types/models';

export class FakeTitleAnalyzer {
  async analyzeTitle(
    district: string,
    tehsil: string,
    village: string,
    khasraNo: string
  ): Promise<TitleReport> {
    // Artificial delay for realistic analysis inspection feel
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Rule: even last digit = clean (82), odd last digit = risky (38)
    const digits = khasraNo.replace(/\D/g, '');
    const lastDigit = digits.length > 0 ? parseInt(digits[digits.length - 1], 10) : 0;
    const isClean = lastDigit % 2 === 0;

    if (isClean) {
      return {
        score: 82,
        khasraNo,
        districtJurisdiction: `${village}, ${tehsil}, ${district}`,
        legalHeirStatus: 'VERIFIED',
        courtCaveatStatus: 'NONE FOUND',
        mortgageStatus: 'DISCHARGED',
        band: 'green',
        hasDiscrepancies: false,
        discrepancyCount: 0,
        timeline: [
          {
            year: '2023',
            date: '14-Nov-2023',
            type: 'SALE DEED (बैनामा)',
            grantor: 'Ram Prasad Sharma',
            grantee: 'Sunil Verma',
            areaSqm: '4,200 sq.m (1.037 Acre)',
            docNumber: 'UP-LKN-2023-4921',
            mutationRecorded: true,
            statusText: 'Mutation Verified (दाखिल खारिज पूर्ण)',
            isRisk: false,
          },
          {
            year: '2018',
            date: '02-Mar-2018',
            type: 'INHERITANCE (विरासतन)',
            grantor: 'Late Harish Sharma',
            grantee: 'Ram Prasad Sharma',
            areaSqm: '4,200 sq.m',
            docNumber: 'REV-MUT-2018-881',
            mutationRecorded: true,
            statusText: 'Order u/s 33 UP Revenue Code',
            isRisk: false,
          },
          {
            year: '2006',
            date: '19-Aug-2006',
            type: 'PARTITION (बंटवारा डिक्री)',
            grantor: 'Tehsil SDM Court Order',
            grantee: 'Harish Sharma & Brothers',
            areaSqm: '8,400 sq.m -> 4,200 sq.m',
            docNumber: 'SDM-DIV-2006-112',
            mutationRecorded: true,
            statusText: 'Decree Finalized & Sub-divided',
            isRisk: false,
          },
          {
            year: '1994',
            date: '11-Jan-1994',
            type: 'ORIGINAL CHAKBANDI (चकबंदी)',
            grantor: 'Consolidation Officer (चकबंदी अधिकारी)',
            grantee: 'Kashi Ram Sharma',
            areaSqm: '8,400 sq.m',
            docNumber: 'CH-41-45-VOL-12',
            mutationRecorded: true,
            statusText: 'Chakbandi RoR Validated',
            isRisk: false,
          },
        ],
        findings: [
          {
            title: 'Unbroken 30-Year Continuity',
            description: 'Continuous uninterrupted link from 1994 consolidation through 2023 sale.',
            isRisk: false,
          },
          {
            title: 'No Pending Revenue Injunctions',
            description: 'No active stay order found in Revenue Court Management System (RCMS).',
            isRisk: false,
          },
        ],
        summary:
          'Clear marketable title verified against official Uttar Pradesh Bhulekh and Sub-Registrar records. All mutation entries are legally recorded.',
      };
    } else {
      return {
        score: 38,
        khasraNo,
        districtJurisdiction: `${village}, ${tehsil}, ${district}`,
        legalHeirStatus: 'DISPUTED (वाद लंबित)',
        courtCaveatStatus: 'ACTIVE INJUNCTION (स्थगन आदेश)',
        mortgageStatus: 'UNRELEASED CHARGE',
        band: 'red',
        hasDiscrepancies: true,
        discrepancyCount: 2,
        timeline: [
          {
            year: '2022',
            date: '18-Aug-2022',
            type: 'UNREGISTERED MEMO (कथित बैनामा)',
            grantor: 'Mohan Lal',
            grantee: 'Dinesh Kumar',
            areaSqm: '2,100 sq.m',
            docNumber: 'NOT REGISTERED',
            mutationRecorded: false,
            statusText: 'Mutation Rejected by Tehsildar',
            isRisk: true,
          },
          {
            year: '2019',
            date: '04-Jan-2019',
            type: 'MORTGAGE CHARGE (बंधक)',
            grantor: 'Mohan Lal',
            grantee: 'State Bank of India',
            areaSqm: 'Entire Parcel',
            docNumber: 'MORT-2019-5501',
            mutationRecorded: true,
            statusText: 'Active Lien - No NOC Uploaded',
            isRisk: true,
          },
          {
            year: '2011',
            date: '22-Jun-2011',
            type: 'SALE DEED (बैनामा)',
            grantor: 'Sukh Ram',
            grantee: 'Mohan Lal',
            areaSqm: '2,100 sq.m',
            docNumber: 'UP-LKN-2011-3100',
            mutationRecorded: true,
            statusText: 'Mutation Recorded',
            isRisk: false,
          },
        ],
        findings: [
          {
            title: 'Unrecorded Transfer & Mutation Rejection',
            description:
              '2022 transfer deed was rejected for mutation due to disputed co-sharer signatures.',
            isRisk: true,
          },
          {
            title: 'Active Bank Mortgage Lien',
            description:
              'Active mortgage lien registered in favor of State Bank of India without discharge deed.',
            isRisk: true,
          },
        ],
        summary:
          'Critical title defects identified. Active court dispute and unreleased bank mortgage detected. Immediate advocate consultation required before advancing token earnest.',
      };
    }
  }
}
