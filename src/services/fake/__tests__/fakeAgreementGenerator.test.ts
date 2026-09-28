import { describe, it } from 'node:test';
import assert from 'node:assert';
import { FakeAgreementGenerator } from '../fakeAgreementGenerator';

describe('FakeAgreementGenerator', () => {
  const generator = new FakeAgreementGenerator();

  it('correctly calculates balance due and structure', async () => {
    const agreement = await generator.generateAgreement(
      'Ram Prasad Sharma',
      'Sunil Verma',
      'Lucknow',
      'Sarojini Nagar',
      'Banthra',
      '248/2',
      4500000,
      500000,
      3
    );

    assert.strictEqual(agreement.totalConsiderationRupees, 4500000);
    assert.strictEqual(agreement.advanceEarnestRupees, 500000);
    assert.strictEqual(agreement.balanceDueRupees, 4000000);
    assert.strictEqual(agreement.sellerName, 'Ram Prasad Sharma');
    assert.strictEqual(agreement.buyerName, 'Sunil Verma');
    assert.strictEqual(agreement.timelineMonths, 3);
  });
});
