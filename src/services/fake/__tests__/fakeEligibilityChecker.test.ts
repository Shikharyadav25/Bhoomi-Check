import { describe, it } from 'node:test';
import assert from 'node:assert';
import { FakeEligibilityChecker } from '../fakeEligibilityChecker';

describe('FakeEligibilityChecker', () => {
  const checker = new FakeEligibilityChecker();

  it('within 12.50 acres returns eligible to purchase', async () => {
    const res = await checker.checkEligibility(true, 'General (UR)', 3.5, 1.037);

    assert.strictEqual(res.isEligible, true);
    assert.strictEqual(res.totalAcres, 4.537);
    assert.strictEqual(res.maxCeilingAcres, 12.5);
    assert.ok(res.statusTitle.includes('ELIGIBLE'));
  });

  it('exceeding 12.50 acres returns permission required', async () => {
    const res = await checker.checkEligibility(true, 'General (UR)', 11.5, 2.0);

    assert.strictEqual(res.isEligible, false);
    assert.strictEqual(res.totalAcres, 13.5);
    assert.ok(res.explanation.includes('exceeds the statutory ceiling'));
  });
});
