# Pipedrive Form GTM Event Listener

**Free Google Tag Manager listener for Pipedrive web form tracking.** It fires one `pipedrive_form_submit` event after a real submit of a Pipedrive web form embedded on your website, so you can track Pipedrive leads in GA4, Google Ads, Meta Pixel and any other tag.

![Pipedrive Form GTM Event Listener](docs/banner.png)

**Full guide, install video and copy button:** https://mdniamul.com/gtm-event-listeners/pipedrive-form-gtm-listener/

---

## What it does

A Pipedrive web form runs in an iframe and never sends a plain "submitted" message. It sends resize messages all the time (on load, on validation errors, on the thank-you view) and a REDIRECT message when it sends people to a thank-you page. This listener counts a submit only when:

- Pipedrive sends the **REDIRECT** message, or
- the form is **replaced by the short thank-you view** (a big drop in height at the same width)

and pushes:

```js
{
  event: 'pipedrive_form_submit',
  form_id: '6Xq2FormHash',
  page_path: '/contact/'
}
```

Built-in safety:

- Validation errors make the form taller, so they never count
- Loading the form, also inside a popup opened later, never counts
- Only reads messages from Pipedrive's own domains (`pipedrive.com`, `pipedrive.net`, `pipedrivewebforms.com`)
- Real form ID from your embed code, one push per form per page

## Install in 6 steps

1. **Embed the Pipedrive web form on your page.** Pipedrive → Leads → Web forms → your form → Share → **Embed**. Paste the code (a `div` with `class="pipedriveWebForms"` plus Pipedrive's loader script).
2. **GTM → Tags → New → Custom HTML.** Paste [`pipedrive-form-gtm-listener.html`](pipedrive-form-gtm-listener.html). Trigger: **All Pages**.
3. **Triggers → New → Custom Event**, event name `pipedrive_form_submit`.
4. **Variables → New → Data Layer Variable**: `DLV - form_id` → `form_id`.
5. Fire your **GA4 event** (for example `generate_lead`), **Google Ads conversion** or **Meta Pixel** `Lead` event on that trigger.
6. **Preview**, submit once with an empty field (no event), then a real test lead, check Tag Assistant, then **Publish**.

Tip: keep the thank-you message short, or set the form to redirect to a thank-you page. That makes the submit signal clearer.

## Files

| File | What it is |
|---|---|
| `pipedrive-form-gtm-listener.html` | Ready to paste into a GTM Custom HTML tag |
| `pipedrive-form-gtm-listener.js` | Same code without the `<script>` tags |
| `examples/sample-datalayer-output.json` | What the push looks like |

## Videos

- Install the free code: https://mdniamul.com/gtm-event-listeners/pipedrive-form-gtm-listener/#install-video
- What the advanced version collects: https://mdniamul.com/gtm-event-listeners/pipedrive-form-gtm-listener/#advanced

## Step-by-step guide

- [Pipedrive form conversion tracking](https://mdniamul.com/blog/web-analytics/pipedrive-form-conversions-tracking/)

## Need more data? Advanced version

The free code tells you a Pipedrive form was sent. The **advanced version** also:

- fills Pipedrive hidden fields (JavaScript variable type) with UTM values, gclid, fbclid, msclkid, the landing page and a lead reference, so every Pipedrive lead shows which ad it came from and can be used for offline conversion uploads
- adds a stronger submit signal and still sends the event when a redirect leaves the page too fast
- sends UTM values, 17 ad click IDs, first-party cookies (`_ga`, `_fbp`, `_fbc`, `_gcl_au` and more), visitor location (hashed too) and a unique `event_id` for Meta CAPI and server-side GTM

It comes with a setup video, a PDF guide and a GTM import file in your client portal. The code starts from $89, and setup packages are available:

- Prices: https://mdniamul.com/gtm-event-listeners/pipedrive-form-gtm-listener/#pricing
- WhatsApp: https://api.whatsapp.com/send?phone=8801776485758
- Book a call: https://calendly.com/mdniamul
- All listeners: https://mdniamul.com/gtm-event-listeners/

Want it done for you? See my [Pipedrive form conversion tracking service](https://mdniamul.com/pipedrive-form-conversion-tracking-service/) and [offline conversion tracking service](https://mdniamul.com/offline-conversion-tracking-services/).

## Troubleshooting

- **No event:** the form was not embedded with Pipedrive's loader, GTM is not on the page, or the thank-you message is almost as tall as the form (shorten it or use a redirect).
- **Two events:** an older listener is still live. Keep one.
- **See the raw messages:** run `window.addEventListener('message', e => { if (/pipedrive/.test(e.origin)) console.log(e.data.type, e.data.payload) })` and submit. Type 0 = resize, 6 = redirect.

## About

Built by **[MD Niamul](https://mdniamul.com)**, GoHighLevel & AI Agent Automation, Marketing Attribution and Server-Side Tracking Specialist. Founder of Digital Soldier Agency and official Stape partner.

[Website](https://mdniamul.com) · [Free GTM listeners](https://mdniamul.com/gtm-event-listeners/) · [Book a call](https://calendly.com/mdniamul) · [LinkedIn](https://linkedin.com/in/mdniamul)

## License

MIT. Free to use on your own and your clients' sites. See [LICENSE](LICENSE).
