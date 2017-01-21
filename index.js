'use strict';

function replace_domain_name(url, new_domain)
{
    return 'http://' + new_domain + url.replace(/^.*\/\/[^\/]+/, '');
}

function tor_redirect(event)
{
    var domain_header = event.responseHeaders.find(function (header) {
        return header['name'].toLowerCase() == 'tor-onion-domain';
    });

    if (typeof domain_header !== 'undefined') {
        var domain = domain_header.value;

        return {
            redirectUrl: replace_domain_name(event.url, domain)
        };
    }
}

browser.webRequest.onHeadersReceived.addListener(
    tor_redirect,
    { urls: ['<all_urls>'] },
    ['blocking', 'responseHeaders']
);
