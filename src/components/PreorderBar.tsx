import React from 'react';
import {
  RCF_EXPECTED_RELEASE,
  RCF_STORE_BOOK_URL,
} from '@/lib/resonanceCore';
import styles from './PreorderBar.module.scss';

/**
 * The slim book pre-order bar at the top of every page, above the header. It
 * sits in normal flow, so it scrolls away and the sticky header takes the top.
 * Transparent, with Mythic Gold trim: the label, the link and the bottom rule.
 */
export default function PreorderBar() {
  return (
    <aside aria-label='Book pre-order' className={styles.bar}>
      <p className={styles.inner}>
        <strong className={styles.label}>
          Pre-order for the RCF book now open
        </strong>
        <span className={styles.dot} aria-hidden='true'>
          •
        </span>
        <span>Expected release: {RCF_EXPECTED_RELEASE}</span>
        <a href={RCF_STORE_BOOK_URL} className={styles.link}>
          Go to Store <span aria-hidden='true'>→</span>
        </a>
      </p>
    </aside>
  );
}
