import type { Locale } from '../format';
import { en } from './en';
import { hu } from './hu';
import type { Copy } from './types';

export function getCopy(locale: Locale): Copy {
    return locale === 'hu' ? hu : en;
}

export type { Copy, FormCopy } from './types';
