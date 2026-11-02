'use client';

import LeadFormCore, { type LeadFormCopy } from '@/components/LeadFormCore';
import { units } from '@/lib/data';
import { privacyPath, whatsappDigits } from '@/lib/site';
import { formatArea } from '@/lib/utils';

const copy: LeadFormCopy = {
    unit: 'Which house interests you?',
    unitAny: 'Not sure yet',
    priority: 'What matters most to you?',
    priorities: { outdoor: 'A private garden', space: 'Space and layout', location: 'The location', price: 'The price' },
    timeline: 'When are you looking to move?',
    timelinePlaceholder: 'Choose',
    timelineOptions: [
        { value: 'immediately', label: 'As soon as possible' },
        { value: '3-6-months', label: 'Within 3–6 months' },
        { value: '6-12-months', label: 'Within 6–12 months' },
        { value: '12-plus-months', label: 'In more than 12 months' },
    ],
    firstName: 'First name',
    phone: 'Phone',
    email: 'Email (optional)',
    consent: 'I agree to be contacted about my enquiry.',
    privacyLink: 'Privacy policy',
    privacyHref: privacyPath.en,
    choose: 'Send it with',
    opening: 'Opening your messages…',
    whatsapp: 'WhatsApp',
    sms: 'SMS',
    note: 'Your answers are also saved, so that we can call you back if the message does not reach us.',
    callBack: 'I would rather be called back',
    submit: 'Book a viewing',
    sending: 'Sending…',
    failure: 'Something went wrong and your request was not sent. Please try again.',
    rateLimited: 'Too many requests have been sent from your connection. Please try again in an hour.',
    errors: {
        firstName: 'Please enter your first name',
        phone: 'Please enter your phone number',
        consent: 'We need your agreement in order to contact you',
    },
    message: {
        intro: 'Hello, my name is {name} and I am interested in Spanyolrét Gardens.',
        unit: 'House: {unit}',
        anyUnit: 'I have not chosen a house yet.',
        priority: 'What matters most to me: {priority}',
        timeline: 'Moving: {timeline}',
        close: 'Could we arrange a visit?',
    },
    thankYouPath: '/thank-you',
};

const unitOptions = units
    .filter((unit) => unit.status === 'available')
    .map((unit) => ({ value: unit.id, label: `${unit.id} · garden ${formatArea(unit.gardenArea, 'en')}` }));

/* Book a viewing. First choice: a WhatsApp or SMS message to Brenda, already
 * written; second: a call back. See components/LeadFormCore.tsx. */
export default function LeadForm() {
    return (
        <section id="lead-form" className="section-padding band-frame">
            <div className="section-container relative z-10">
                <div className="mx-auto max-w-4xl">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div className="text-onmedia">
                            <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                                Book a viewing
                                <span className="h-px flex-1 bg-onmedia/20" />
                            </div>

                            <h2 className="display-l text-onmedia">Come and stand in the garden.</h2>
                            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                                {whatsappDigits
                                    ? 'Answer three short questions, then choose WhatsApp or SMS: your message opens already written, you only have to send it. Bring the children to the visit.'
                                    : 'Bring the children. They will tell you more about 300 m² of grass than we can. One visit, and no follow-up unless you ask for it.'}
                            </p>

                            <dl className="mt-9 border-t border-onmedia/20">
                                <div className="border-b border-onmedia/15 py-4">
                                    <dt className="measure text-[0.9375rem] text-onmedia">{whatsappDigits ? 'A reply today' : 'A call today'}</dt>
                                    <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                        Within the hour during Budapest office hours. Otherwise first thing tomorrow.
                                    </dd>
                                </div>
                                <div className="border-b border-onmedia/15 py-4">
                                    <dt className="measure text-[0.9375rem] text-onmedia">In English</dt>
                                    <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                        The whole purchase runs in English. No Hungarian required at any point.
                                    </dd>
                                </div>
                                <div className="border-b border-onmedia/15 py-4">
                                    <dt className="measure text-[0.9375rem] text-onmedia">What we do with this</dt>
                                    <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                        We contact you about Spanyolr&eacute;t Gardens. We do not pass it to anyone
                                        else, and one email from you removes it.
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-paper p-6 text-ink md:p-8">
                            <LeadFormCore copy={copy} lang="en" unitOptions={unitOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
