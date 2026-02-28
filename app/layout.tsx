import type { Metadata } from 'next';
import Script from 'next/script';
import MixpanelTracker from '@/components/MixpanelTracker';
import './globals.css';

export const metadata: Metadata = {
    title: 'Spanyolrét Gardens | Premium Townhouses with Private Gardens | Budapest',
    description: '6 exclusive new-build townhouses in Budapest XI. 117m² living space + up to 317m² private garden. Heat pump, underfloor heating, premium materials. From €480K. Delivery Sept 2026.',
    keywords: 'new build townhouse Budapest, townhouse with garden Budapest, family home Budapest, expat property Budapest, property for sale XI district',
    openGraph: {
        title: 'Spanyolrét Gardens | Premium Townhouses with Private Gardens | Budapest',
        description: '6 exclusive new-build townhouses in Budapest XI. 117m² living space + up to 317m² private garden.',
        type: 'website',
        locale: 'en_US',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Preload hero video for faster playback */}
                <link
                    rel="preload"
                    href="/assets/renders/Hero Spanyloret.mp4"
                    as="video"
                    type="video/mp4"
                />
                {/* Preload poster image */}
                <link
                    rel="preload"
                    href="/assets/renders/Garden at Midday.webp"
                    as="image"
                />
            </head>
            <body className="antialiased">
                {/* Mixpanel */}
                <Script id="mixpanel" strategy="afterInteractive">
                    {`
                        (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
                        mixpanel.init('b6ad6d3b3046d67c92784e494944a356', { track_pageview: true, persistence: 'localStorage' });
                    `}
                </Script>
                {/* Meta Pixel */}
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '886458420654697');
                        fbq('track', 'PageView');
                    `}
                </Script>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=886458420654697&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
                <MixpanelTracker />
                {children}
            </body>
        </html>
    );
}
