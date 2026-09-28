import { describe, it } from 'node:test';
import assert from 'node:assert';
import { FakeTitleAnalyzer } from '../fakeTitleAnalyzer';

describe('FakeTitleAnalyzer', () => {
  const analyzer = new FakeTitleAnalyzer();

  it('even khasra returns clean title with score 82', async () => {
    const report = await analyzer.analyzeTitle('Lucknow', 'Sarojini Nagar', 'Banthra', '248/2');

    assert.strictEqual(report.score, 82);
    assert.strictEqual(report.hasDiscrepancies, false);
    assert.strictEqual(report.discrepancyCount, 0);
    assert.strictEqual(report.band, 'green');
    assert.ok(report.timeline.length >= 4);
    assert.strictEqual(report.timeline.every((e) => !e.isRisk), true);
  });

  it('odd khasra returns risky title with score 38 and 2 discrepancies', async () => {
    const report = await analyzer.analyzeTitle('Lucknow', 'Sarojini Nagar', 'Banthra', '248/1');

    assert.strictEqual(report.score, 38);
    assert.strictEqual(report.hasDiscrepancies, true);
    assert.strictEqual(report.discrepancyCount, 2);
    assert.strictEqual(report.band, 'red');
    assert.ok(report.findings.some((f) => f.isRisk));
  });
});
