'use client';

import { useSyncExternalStore } from 'react';

/* The visitor's cookie choice. Nothing that sets a cookie or tracks behaviour
 * (Meta Pixel, Google Maps) loads before 'accepted'. Stored in localStorage, which
 * never leaves the browser. If storage is blocked, the choice holds for the
 * page's lifetime and the banner asks again on the next visit. */

export type ConsentChoice = 'accepted' | 'refused';
/** 'pending' on the server and during hydration, 'unset' once we know there is no choice. */
export type ConsentState = ConsentChoice | 'unset' | 'pending';

const STORAGE_KEY = 'spanyolret-consent-v1';
const CHANGE_EVENT = 'spanyolret:consent-change';
export const OPEN_SETTINGS_EVENT = 'spanyolret:consent-open';

let memory: ConsentChoice | null = null;

export function readConsent(): ConsentChoice | null {
    if (typeof window === 'undefined') return null;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'accepted' || stored === 'refused') return stored;
    } catch {
        // Storage blocked: fall back to the in-memory choice.
    }
    return memory;
}

export function writeConsent(choice: ConsentChoice) {
    memory = choice;
    try {
        window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
        // Kept in memory only.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function openConsentSettings() {
    window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

function subscribe(callback: () => void) {
    window.addEventListener(CHANGE_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(CHANGE_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}

export function useConsent(): ConsentState {
    return useSyncExternalStore(
        subscribe,
        () => readConsent() ?? 'unset',
        () => 'pending'
    );
}
