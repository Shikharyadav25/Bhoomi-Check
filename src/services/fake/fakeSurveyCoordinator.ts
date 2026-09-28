import { SurveyData } from '../../types/models';

export class FakeSurveyCoordinator {
  async getSurveyData(khasraNo: string): Promise<SurveyData> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      khasraNo,
      deedAreaHa: 0.42,
      groundAreaHa: 0.395,
      discrepancyHa: -0.025,
      discrepancyDirection: 'North-East Boundary (Road Widening Encroachment)',
      roadBufferMeters: 12.0,
      recommendation:
        'A 0.025 Hectare (250 sq.m) boundary overlap detected along the PWD road buffer. Issue a joint physical demarcation request (Section 24) to the Tehsil Revenue Inspector prior to registration.',
    };
  }
}
