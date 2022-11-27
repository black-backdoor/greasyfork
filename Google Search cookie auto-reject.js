// ==UserScript==
// @name         Google Search cookie auto-reject
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Automatically rejects Google Search's cookie banner in EN/FR/DE
// @author       black-backdoor (https://github.com/black-backdoor)
// @match        https://www.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const selector_en = '[aria-label="Before you continue to Google Search"]';
    const style_en = document.createElement('style');
    style_en.textContent = `${selector_en} { display: none !important; }`

    const selector_fr = '[aria-label="Avant d\'accéder à la recherche Google"]';
    const style_fr = document.createElement('style');
    style_fr.textContent = `${selector_fr} { display: none !important; }`

    const selector_de = '[aria-label="Bevor Sie zur Google Suche weitergehen"]';
    const style_de = document.createElement('style');
    style_de.textContent = `${selector_de} { display: none !important; }`

    addEventListener('load', reject);
    addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(style_en);
        document.head.appendChild(style_fr);
        document.head.appendChild(style_de);
        reject();
    });

    const observer = new MutationObserver(reject);
    observer.observe(document.body, { childList: true, subtree: true });

    function reject() {
        for (const el of document.querySelectorAll(style_en)) {
            const rejectBtn = document.evaluate('//button[contains(., "Reject all")]', document.body).iterateNext();

            if (rejectBtn) {
                rejectBtn?.click();
                observer.disconnect();
            }
        };

        for (const el of document.querySelectorAll(selector_fr)) {
            const rejectBtn = document.evaluate('//button[contains(., "Tout refuser")]', document.body).iterateNext();

            if (rejectBtn) {
                rejectBtn?.click();
                observer.disconnect();
            }
        };

        for (const el of document.querySelectorAll(selector_de)) {
            const rejectBtn = document.evaluate('//button[contains(., "Alle ablehnen")]', document.body).iterateNext();

            if (rejectBtn) {
                rejectBtn?.click();
                observer.disconnect();
            }
        };
    }
})();
