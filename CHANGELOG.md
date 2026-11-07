# Changelog

## v1.0.0 (2026-11-07)

- First release of the free Pipedrive web form GTM listener.
- Fires `pipedrive_form_submit` on Pipedrive's REDIRECT message, or when the form is replaced by the thank-you view.
- Validation errors and form loads (also popups opened later) never count.
- Real form ID from the embed code, not the random embed box ID.
- Only reads messages from Pipedrive's own domains. One push per form per page.
