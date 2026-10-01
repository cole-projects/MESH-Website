/**
 * Mesh Coaching — BEcomingYOU Waitlist → Google Sheet
 *
 * Setup (one time):
 * 1. Create a Google Sheet named e.g. "BEcomingYOU Waitlist"
 * 2. In row 1, put headers:
 *    Timestamp | Name | Email | Phone | Source
 * 3. Extensions → Apps Script
 * 4. Delete any placeholder code, paste THIS entire file, Save (Ctrl/Cmd+S)
 * 5. Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → Authorize → copy the Web app URL
 * 7. Add to Vercel (Project → Settings → Environment Variables):
 *    WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
 *    (Production + Preview)
 * 8. Also add the same line to local .env.local for testing
 * 9. Redeploy the site (or push to main)
 *
 * After that, every waitlist signup appends a new row to the sheet.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.source || "mesh-website",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Mesh waitlist webhook is live.");
}
