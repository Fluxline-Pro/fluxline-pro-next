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

      const retentionRelatedLine = content
        .split('\n')
        .find(
          (line) =>
            /retention|retained|churn|return(?:ing)? clients?|clients? return/i.test(
              line
            ) &&
            /(?:\b\d+(?:\.\d+)?\s*%|\b\d+(?:\.\d+)?\s*(?:months?|years?))/i.test(
              line
            )
        );

      expect(retentionRelatedLine).toBeUndefined();
    }
  });
});
