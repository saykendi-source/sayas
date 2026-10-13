/**
 * Asisten Saya PWA v2.1 - Google Apps Script backend
 * Kompatibel dengan spreadsheet backend asli. Menambahkan 10 kolom tanpa menghapus data lama.
 * Langkah: ganti isi Code.gs, ganti TOKEN dengan token rahasia yang cocok,
 * jalankan authorize() dan deploy ulang sebagai Web App (versi baru).
 * Apps Script timezone: Asia/Jakarta, disarankan selaras dengan Calendar.
 * Catatan: tidak menyediakan Web Push ketika aplikasi tertutup.
 * Untuk keamanan lebih kuat, token statis bukan autentikasi multi-user.
 */
/**
 * Asisten Saya - Backend (Google Apps Script)
 * Pasang di: Google Sheet > Extensions > Apps Script (container-bound)
 */
const TOKEN = '7777777';   // PENTING: ganti token panjang acak dan cocokkan dengan aplikasi
const SHEET = 'Data';
const COLS = ['id','type','title','note','date','time','place','repeat','remind','amount',
  'done','pinned','tag','prio','paid','calId','calSig','created','updated',
  'kind','donorLast','donorCount','donorInterval','donorUnit',
  'donorHistory','status','pendingMonths','history','snoozeUntil'];

function authorize() {            // jalankan 1x untuk memberi izin Calendar & Sheet
  CalendarApp.getDefaultCalendar();
  sheet_();
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) sh = ss.insertSheet(SHEET);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, COLS.length).setValues([COLS]);
    sh.setFrozenRows(1);
  } else {
    const current = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    // Append only; existing column positions and row data are preserved.
    const missing = COLS.filter(c => current.indexOf(c) < 0);
    if (missing.length) {
      const start = sh.getLastColumn() + 1;
      sh.getRange(1, start, 1, missing.length).setValues([missing]);
    }
  }
  return sh;
}

function toObj_(row) {
  const o = {};
  COLS.forEach((c, i) => {
    const v = row[i];
    if (c === 'history' || c === 'donorHistory') {
      try { o[c] = (typeof v === 'string' && v.trim()) ? JSON.parse(v) : []; } catch (_) { o[c] = []; }
    } else o[c] = v === undefined || v === null ? '' : String(v);
  });
  return o;
}

function readAll_() {
  const sh = sheet_();
  if (sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, COLS.length).getValues()
    .filter(r => r[0]).map(toObj_);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    if (!e.parameter || e.parameter.token !== TOKEN) return json_({ ok: false, error: 'Token salah' });
    return json_({ ok: true, items: readAll_() });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const b = JSON.parse(e.postData.contents);
    if (b.token !== TOKEN) return json_({ ok: false, error: 'Token salah' });
    if (b.action === 'save') return json_({ ok: true, item: save_(b.item) });
    if (b.action === 'delete') { remove_(b.id); return json_({ ok: true }); }
    return json_({ ok: false, error: 'Aksi tidak dikenal' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally { try { lock.releaseLock(); } catch (x) {} }
}

function findRow_(sh, id) {
  if (sh.getLastRow() < 2) return -1;
  const ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => String(r[0]));
  const i = ids.indexOf(String(id));
  return i < 0 ? -1 : i + 2;
}

function save_(it) {
  const sh = sheet_();
  const rowNum = findRow_(sh, it.id);
  const old = rowNum > 0 ? toObj_(sh.getRange(rowNum, 1, 1, COLS.length).getValues()[0]) : {};
  if (!it || typeof it.id !== 'string' || !it.id || !['idea','reminder','bill','task'].includes(it.type))
    throw new Error('Item tidak valid');
  const o = {};
  COLS.forEach(c => {
    const v = it[c];
    o[c] = (v === undefined || v === null) ? '' :
      ((c === 'history' || c === 'donorHistory') ? JSON.stringify(Array.isArray(v) ? v : []) : String(v));
  });
  o.calId = old.calId || '';
  o.calSig = old.calSig || '';
  o.updated = new Date().toISOString();
  syncCalendar_(o);
  const target = sh.getRange(rowNum > 0 ? rowNum : sh.getLastRow() + 1, 1, 1, COLS.length);
  target.setNumberFormat('@').setValues([COLS.map(c => o[c])]);   // '@' = teks, cegah auto-format tanggal
  return toObj_(COLS.map(c => o[c]));
}

function remove_(id) {
  const sh = sheet_();
  const rowNum = findRow_(sh, id);
  if (rowNum < 0) return;
  const o = toObj_(sh.getRange(rowNum, 1, 1, COLS.length).getValues()[0]);
  if (o.calId) delCal_(o.calId);
  sh.deleteRow(rowNum);
}

function delCal_(id) {
  try {
    const cal = CalendarApp.getDefaultCalendar();
    if (id.indexOf('S:') === 0) cal.getEventSeriesById(id.slice(2)).deleteEventSeries();
    else cal.getEventById(id.slice(2)).deleteEvent();
  } catch (e) {}
}

function syncCalendar_(o) {
  const want = ['reminder', 'bill', 'task'].indexOf(o.type) >= 0 && o.date && o.done !== 'true' && o.status !== 'done';
  const sig = want ? [o.type, o.title, o.note, o.date, o.time, o.place, o.repeat, o.remind, o.amount, o.kind, o.donorCount, o.donorInterval, o.donorUnit, o.status].join('|') : '';
  if (sig === o.calSig && (!want || o.calId)) return;     // tidak ada perubahan relevan
  if (o.calId) { delCal_(o.calId); o.calId = ''; }
  o.calSig = sig;
  if (!want) return;

  const cal = CalendarApp.getDefaultCalendar();
  const d = o.date.split('-').map(Number);
  const t = (o.time || '09:00').split(':').map(Number);
  const start = new Date(d[0], d[1] - 1, d[2], t[0], t[1]);
  const end = new Date(start.getTime() + 30 * 60000);
  const icon = { reminder: '🔔 ', bill: '💸 ', task: '✅ ' }[o.type];
  let title = icon + (o.kind === 'donor' ? '🩸 ' + o.title + ' (Donor ke-' + (Number(o.donorCount || 0) + 1) + ')' : o.title);
  let desc = o.note || '';
  if (o.type === 'bill' && Number(o.amount) > 0) {
    title += ' - Rp ' + Number(o.amount).toLocaleString('id-ID');
  }
  desc += (desc ? '\n\n' : '') + 'Dibuat oleh Asisten Saya';
  const opts = { description: desc, location: o.place || '' };
  const mins = Math.max(0, Math.min(40320, parseInt(o.remind || '30', 10) || 0));

  if (o.kind !== 'donor' && ['weekly', 'monthly', 'yearly'].indexOf(o.repeat) >= 0) {
    const rec = CalendarApp.newRecurrence();
    if (o.repeat === 'weekly') rec.addWeeklyRule();
    if (o.repeat === 'monthly') rec.addMonthlyRule();
    if (o.repeat === 'yearly') rec.addYearlyRule();
    const s = cal.createEventSeries(title, start, end, rec, opts);
    s.removeAllReminders();
    s.addPopupReminder(mins);
    o.calId = 'S:' + s.getId();
  } else {
    const ev = cal.createEvent(title, start, end, opts);
    ev.removeAllReminders();
    ev.addPopupReminder(mins);
    o.calId = 'E:' + ev.getId();
  }
}
