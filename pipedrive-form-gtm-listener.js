/* Pipedrive listener by MD Niamul - mdniamul.com
   Fires pipedrive_form_submit when an embedded Pipedrive web form is sent. */
(function () {
  window.dataLayer = window.dataLayer || [];
  var forms = {};   // per embedded form: largest height seen, last width, sent flag

  // Pipedrive web forms load from these domains (same list Pipedrive's own loader uses)
  function isPipedrive(origin) {
    try { return /(^|\.)(pipedrive\.com|pipedrive\.net|pipedrive\.xyz|pipedrivewebforms\.com)$/.test(new URL(origin).hostname); }
    catch (e) { return false; }
  }

  // The form ID is in the embed: <div class="pipedriveWebForms" data-pd-webforms=".../f/FORM_ID">
  function formIdFor(uuid) {
    var box = uuid ? document.getElementById(uuid) : null;
    var url = (box && box.getAttribute('data-pd-webforms')) || '';
    var m = url.match(/\/f\/([^/?#]+)/);
    return m ? m[1] : '';
  }

  function push(uuid) {
    var f = forms[uuid];
    if (f.sent) return; // one push per form on this page
    f.sent = true;
    window.dataLayer.push({
      event: 'pipedrive_form_submit',
      form_id: formIdFor(uuid),
      page_path: window.location.pathname
    });
  }

  window.addEventListener('message', function (event) {
    if (!isPipedrive(event.origin)) return;
    var msg = event.data;
    if (typeof msg === 'string') { try { msg = JSON.parse(msg); } catch (e) { return; } }
    if (!msg || typeof msg !== 'object' || !msg.payload || msg.payload.source !== 'pipedriveWebForms') return;

    var uuid = msg.payload.uuid || 'form';
    var f = forms[uuid] || (forms[uuid] = { max: 0, width: 0, sent: false, at: new Date().getTime() });

    // Type 6 = REDIRECT: the form was sent and Pipedrive is going to the thank-you page
    if (msg.type === 6) { push(uuid); return; }

    // Type 0 = RESIZE. After a real submit the form is replaced by a short
    // "thank you" message, so the height drops by a lot at the same width.
    // Validation errors make the form taller, so they never count.
    if (msg.type === 0) {
      var h = parseFloat(msg.payload.height) || 0;
      var w = parseFloat(msg.payload.width) || 0;
      var settled = new Date().getTime() - f.at > 2000;
      if (settled && f.max > 250 && w === f.width && h > 0 && h < f.max * 0.6) push(uuid);
      if (h > f.max) f.max = h;
      f.width = w;
    }
  });
})();
