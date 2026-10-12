import fs from 'fs';
import path from 'path';

const caseStudyPaths = [
  'public/case-studies/posts/scaling-personal-transformation-resonance-core/markdown/post.md',
  'public/portfolio/posts/personal-training-transformation-journey/markdown/post.md',
  'public/blog/posts/from-recovery-to-resonance-personal-journey/markdown/post.md',
];

describe('personal transformation case study content', () => {
  it('does not make quantitative retention, return, or churn claims', () => {
    for (const relativePath of caseStudyPaths) {
      const content = fs.readFileSync(
        path.join(process.cwd(), relativePath),
        'utf8'
      );

      // A line is a quantitative claim only when a retention / churn / return term appears together with a
      // figure: a percentage, a multiplier, or a count of months or years. Qualitative mentions (e.g. "focus on
      // retention over acquisition") are editorial and allowed.
      const retentionTerm =
        /retention|retained|churn|return(?:ing)? clients?|clients? return|client duration/i;
      const figure =
        /\b\d+(?:\.\d+)?\s*(?:%|percent|x\b|×)|\b\d+(?:\.\d+)?\s*(?:months?|years?|weeks?)\b|\b(?:double|triple|halve)d?\b/i;

      const quantitativeRetentionLine = content
        .split('\n')
        .find((line) => retentionTerm.test(line) && figure.test(line));

      expect(quantitativeRetentionLine).toBeUndefined();
    }
  });
});
