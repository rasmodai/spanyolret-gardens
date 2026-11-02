/* The message a visitor only has to send, built from their own answers, and
 * the links that open it in WhatsApp or the SMS app. */

/** Dispatched by the sticky bar and the unit rows: the lead form scrolls into
 * view, with the unit chosen when one is given. */
export const OPEN_MESSAGE_EVENT = 'spanyolret:message-open';

export type MessageChannel = 'whatsapp' | 'sms';

/** Same keys as the Synphos OS buyer pipeline accepts. */
export const PRIORITIES = ['outdoor', 'space', 'location', 'price', 'investment'] as const;
export type Priority = (typeof PRIORITIES)[number];

export interface MessageCopy {
    intro: string;
    unit: string;
    anyUnit: string;
    priority: string;
    timeline: string;
    close: string;
}

export function buildMessage(copy: MessageCopy, answers: { name: string; unit: string; priority: string; timeline: string }): string {
    return [
        copy.intro.replace('{name}', answers.name),
        answers.unit ? copy.unit.replace('{unit}', answers.unit) : copy.anyUnit,
        answers.priority && copy.priority.replace('{priority}', answers.priority),
        answers.timeline && copy.timeline.replace('{timeline}', answers.timeline),
        copy.close,
    ]
        .filter(Boolean)
        .join('\n');
}

/** WhatsApp: wa.me. SMS: `sms:` with `?&body=`, which both iOS and Android read. */
export function messageAppUrl(channel: MessageChannel, digits: string, text: string): string {
    return channel === 'sms'
        ? `sms:+${digits}?&body=${encodeURIComponent(text)}`
        : `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
