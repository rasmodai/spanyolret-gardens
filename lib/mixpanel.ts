/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        mixpanel: any;
    }
}

function mp() {
    return typeof window !== 'undefined' ? window.mixpanel : null;
}

export function track(event: string, properties?: Record<string, any>) {
    mp()?.track(event, properties);
}

export function identify(id: string) {
    mp()?.identify(id);
}

export function setUserProperties(properties: Record<string, any>) {
    mp()?.people.set(properties);
}

export function setUserPropertiesOnce(properties: Record<string, any>) {
    mp()?.people.set_once(properties);
}

export function registerSuperProperties(properties: Record<string, any>) {
    mp()?.register(properties);
}

export function timeEvent(event: string) {
    mp()?.time_event(event);
}
