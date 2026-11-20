// worker.js — Alex Anon: bot + mini app + admin panel (single file)
// نسخه کم‌مصرف: حداقل ریکوئست روی Cloudflare

const dict = {
  en: {
    welcome: "Hey! 🐰 Create your personal anonymous link. Send me the first message people will see when they open it.",
    onboarding: "Welcome to the anonymous bot! 🐰\n\n• Create your personal anonymous link and share it anywhere.\n• Receive anonymous messages in your Inbox.\n• Reply privately from Chats.\n• Save or pin important messages, and share media to any Telegram chat or Saved Messages.\n• Pause your link whenever you want.\n\nConversation records are kept in the the anonymous bot database for up to 20 days, then automatically deleted.\n\nLet’s get started.",
    retention: "🔒 To protect privacy and keep the anonymous bot storage efficient, conversation records are kept for up to 20 days, then automatically deleted from the app database. Save anything important to Telegram Saved Messages before it expires.",
    retentionNotice: "⏳ A few older messages in this conversation are approaching their 20-day retention limit and will begin to be removed from the anonymous bot within about 24 hours. Save any text or media you want to keep to Telegram Saved Messages. Newer messages have their own retention period.",
    notifications: "Notifications", notificationsOn: "🔔 New-message notifications are on", notificationsOff: "🔕 New-message notifications are off", enableNotifications: "Turn notifications on", disableNotifications: "Turn notifications off", saveTelegram: "Save to Telegram", shareFailed: "Could not prepare this media for sharing.",
    createBtn: "Create my link",
    alreadyHave: "Your link:\n{link}",
    askIntro: "Send the intro message for your link. Everyone who opens it will read this.",
    linkCreated: "Your link is ready:\n{link}",
    intro: "🕵️ You are sending an anonymous message.\nSend anything: text, photo, video, voice, music or file. 👇",
    sent: "✅ Sent anonymously.",
    seen: "👁 Your message was seen.",
    unsupported: "This message type is not supported.",
    blocked: "You can no longer message this link.",
    notify: "🔔 New anonymous message! Open the app to read it.",
    openApp: "Open app",
    linkInactive: "This link is paused.",
    notFound: "This link does not exist.",
    langEn: "Language changed to English.",
    langFa: "زبان به فارسی تغییر کرد.",
    cancelled: "Cancelled.",
    done: "✅ Done.",
    denied: "⛔ Not allowed.",
    rateLimitBot: "⏳ Too many messages. Try again in {seconds}s.",
    ticketRecorded: "🎫 Your ticket was sent to the admin.",
    ticketApproved: "🔍 Your identity-reveal request was approved.",
    broadcastQueued: "📢 Queued for {count} users. Sending {batch} per minute to respect limits.",
    purgeDone: "🧹 Done.",
  },
  fa: {
    welcome: "سلام! 🐰 لینک ناشناس شخصی‌ات را بساز. اولین پیامی که بقیه وقتی لینک را باز می‌کنند می‌بینند را برایم بفرست.",
    onboarding: "به ربات ناشناس خوش آمدی! 🐰\n\n• لینک ناشناس شخصی‌ات را بساز و هرجا خواستی منتشر کن.\n• پیام‌های دریافتی را در بخش «صندوق» ببین.\n• از بخش «گفتگوها» به پیام‌ها پاسخ بده.\n• پیام‌های مهم را ذخیره یا سنجاق کن و رسانه‌ها را به هر گفتگوی تلگرام یا Saved Messages بفرست.\n• هر زمان خواستی، لینکت را موقتاً متوقف کن.\n\nپیام‌ها برای حفظ حریم خصوصی و مدیریت فضای ذخیره‌سازی، اطلاعات گفتگو حداکثر تا ۲۰ روز در پایگاه داده ربات ناشناس نگهداری می‌شود و پس از آن به‌صورت خودکار حذف خواهد شد.\n\nشروع کنیم.",
    retention: "🔒 برای حفظ حریم خصوصی و مدیریت فضای ذخیره‌سازی، اطلاعات گفتگو حداکثر تا ۲۰ روز در پایگاه داده ربات ناشناس نگهداری می‌شود و پس از آن به‌صورت خودکار حذف خواهد شد. اگر محتوایی برایت مهم است، پیش از پایان این مهلت آن را در Saved Messages تلگرام ذخیره کن.",
    retentionNotice: "⏳ بعضی از پیام‌های قدیمی این گفتگو به پایان مهلت نگهداری ۲۰روزه نزدیک شده‌اند و حدود ۲۴ ساعت دیگر حذف آن‌ها از ربات ناشناس آغاز می‌شود. اگر متن، عکس، ویس یا فایل مهمی داری، همین حالا آن را در Saved Messages تلگرام ذخیره کن. پیام‌های جدیدتر مهلت جداگانه خودشان را دارند.",
    notifications: "اعلان‌ها", notificationsOn: "🔔 اعلان پیام‌های جدید روشن است", notificationsOff: "🔕 اعلان پیام‌های جدید خاموش است", enableNotifications: "روشن‌کردن اعلان‌ها", disableNotifications: "خاموش‌کردن اعلان‌ها", saveTelegram: "ذخیره در تلگرام", shareFailed: "آماده‌سازی این رسانه برای اشتراک‌گذاری انجام نشد.",
    createBtn: "ساخت لینک من",
    alreadyHave: "لینک تو:\n{link}",
    askIntro: "متن پیام اولیه لینکت را بفرست. هرکس لینک را باز کند این متن را می‌بیند.",
    linkCreated: "لینکت آماده است:\n{link}",
    intro: "🕵️ شما درحال ارسال پیام ناشناس هستین.\nهر چیزی بفرست: متن، عکس، ویدیو، ویس، موزیک یا فایل. 👇",
    sent: "✅ ناشناس ارسال شد.",
    seen: "👁 پیامت دیده شد.",
    unsupported: "این نوع پیام پشتیبانی نمی‌شود.",
    blocked: "دیگر نمی‌توانی به این لینک پیام بدهی.",
    notify: "🔔 پیام ناشناس جدید! مینی‌اپ را باز کن.",
    openApp: "باز کردن برنامه",
    linkInactive: "این لینک موقتاً متوقف است.",
    notFound: "این لینک وجود ندارد.",
    langEn: "Language changed to English.",
    langFa: "زبان به فارسی تغییر کرد.",
    cancelled: "لغو شد.",
    done: "✅ انجام شد.",
    denied: "⛔ دسترسی نداری.",
    rateLimitBot: "⏳ تعداد پیام‌ها زیاد است. {seconds} ثانیه دیگر تلاش کن.",
    ticketRecorded: "🎫 تیکتت برای ادمین ارسال شد.",
    ticketApproved: "🔍 درخواست خواندن هویت فرستنده تأیید شد.",
    broadcastQueued: "📢 برای {count} کاربر در صف قرار گرفت. هر دقیقه {batch} پیام ارسال می‌شود.",
    purgeDone: "🧹 انجام شد.",
  },
};

const enc = new TextEncoder();
const now = () => Math.floor(Date.now() / 1000);
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

function t(lang, key, vars = {}) {
  const l = lang === "fa" ? "fa" : "en";
  let s = dict[l][key];
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}

// ================= Telegram =================

async function tg(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function tgForm(env, method, form) {
  const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, { method: "POST", body: form });
  return r.json();
}

const send = (env, chat_id, text, extra = {}) => tg(env, "sendMessage", { chat_id, text, ...extra });
const answerCb = (env, id) => tg(env, "answerCallbackQuery", { callback_query_id: id });

const METHOD = { photo: "sendPhoto", video: "sendVideo", audio: "sendAudio", voice: "sendVoice", document: "sendDocument" };

async function sendMedia(env, chatId, kind, file, caption) {
  const form = new FormData();
  form.append("chat_id", String(chatId));
  if (caption) form.append("caption", caption.slice(0, 1024));
  form.append(kind, file, file.name || "file");
  return tgForm(env, METHOD[kind], form);
}

async function sendMediaSafe(env, chatId, kind, file, caption) {
  let r = await sendMedia(env, chatId, kind, file, caption);
  if (!r.ok && kind !== "document") r = await sendMedia(env, chatId, "document", file, caption);
  return r;
}

function fileIdOf(result) {
  if (!result) return null;
  if (result.photo) return result.photo[result.photo.length - 1].file_id;
  for (const k of ["video", "audio", "voice", "document"]) if (result[k]) return result[k].file_id;
  return null;
}

function kindFromFile(file) {
  const ty = file.type || "";
  if (ty.startsWith("image/")) return "photo";
  if (ty.startsWith("video/")) return "video";
  if (ty.startsWith("audio/")) return "audio";
  return "file";
}

function telegramKind(kind, file) {
  if (kind === "file") return "document";
  if (kind === "voice") return /ogg|opus/.test((file.type || "") + (file.name || "")) ? "voice" : "document";
  return kind;
}

function extract(msg) {
  if (msg.text) return { msg_type: "text", content: msg.text, file_id: null };
  if (msg.photo) return { msg_type: "photo", content: msg.caption ?? null, file_id: msg.photo[msg.photo.length - 1].file_id };
  if (msg.video) return { msg_type: "video", content: msg.caption ?? null, file_id: msg.video.file_id };
  if (msg.voice) return { msg_type: "voice", content: null, file_id: msg.voice.file_id };
  if (msg.audio) return { msg_type: "audio", content: msg.caption ?? null, file_id: msg.audio.file_id };
  if (msg.document) return { msg_type: "file", content: msg.caption ?? null, file_id: msg.document.file_id };
  return { msg_type: null, content: null, file_id: null };
}

// ================= Auth =================

async function hmac(keyBytes, data) {
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

async function verifyInitData(env, initData) {
  if (!initData || typeof initData !== "string") return null;
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");
  const authDate = Number(params.get("auth_date") || 0);
  if (now() - authDate > 86400) return null;
  const dcs = [...params.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");
  const secret = await hmac(enc.encode("WebAppData"), env.BOT_TOKEN);
  const sig = await hmac(secret, dcs);
  const hex = [...sig].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex !== hash) return null;
  return JSON.parse(params.get("user") || "null");
}

// ================= Database =================

function randomId(len = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

const getUser = (env, id) => env.DB.prepare("SELECT * FROM users WHERE tg_id = ?").bind(id).first();

// Atomic per-user rate limiter. First sustained burst: 6 seconds; next burst
// within 24 hours: 60 minutes. Quiet users earn a clean slate after 24 hours.
async function checkRateLimit(env, uid, bucket, maxHits, windowSeconds = 10) {
  const stamp = now();
  const max = Math.max(1, Math.floor(maxHits));
  const win = Math.max(1, Math.floor(windowSeconds));
  const sql = `
    INSERT INTO alex_anon_rate_limits
      (tg_id, bucket, window_started, hits, strikes, blocked_until, last_violation)
    VALUES (?, ?, ?, 1, 0, 0, 0)
    ON CONFLICT(tg_id, bucket) DO UPDATE SET
      window_started = CASE
        WHEN alex_anon_rate_limits.blocked_until > excluded.window_started
          THEN alex_anon_rate_limits.window_started
        WHEN excluded.window_started - alex_anon_rate_limits.window_started >= ${win}
          THEN excluded.window_started
        ELSE alex_anon_rate_limits.window_started END,
      hits = CASE
        WHEN alex_anon_rate_limits.blocked_until > excluded.window_started
          THEN alex_anon_rate_limits.hits
        WHEN excluded.window_started - alex_anon_rate_limits.window_started >= ${win}
          THEN 1
        ELSE alex_anon_rate_limits.hits + 1 END,
      blocked_until = CASE
        WHEN alex_anon_rate_limits.blocked_until > excluded.window_started
          THEN alex_anon_rate_limits.blocked_until
        WHEN (CASE
          WHEN excluded.window_started - alex_anon_rate_limits.window_started >= ${win} THEN 1
          ELSE alex_anon_rate_limits.hits + 1 END) > ${max}
          THEN excluded.window_started + CASE
            WHEN alex_anon_rate_limits.strikes = 0
              OR excluded.window_started - alex_anon_rate_limits.last_violation > 86400
            THEN 6 ELSE 3600 END
        ELSE alex_anon_rate_limits.blocked_until END,
      strikes = CASE
        WHEN alex_anon_rate_limits.blocked_until <= excluded.window_started
          AND (CASE
            WHEN excluded.window_started - alex_anon_rate_limits.window_started >= ${win} THEN 1
            ELSE alex_anon_rate_limits.hits + 1 END) > ${max}
          THEN CASE
            WHEN alex_anon_rate_limits.strikes = 0
              OR excluded.window_started - alex_anon_rate_limits.last_violation > 86400
            THEN 1 ELSE alex_anon_rate_limits.strikes + 1 END
        ELSE alex_anon_rate_limits.strikes END,
      last_violation = CASE
        WHEN alex_anon_rate_limits.blocked_until <= excluded.window_started
          AND (CASE
            WHEN excluded.window_started - alex_anon_rate_limits.window_started >= ${win} THEN 1
            ELSE alex_anon_rate_limits.hits + 1 END) > ${max}
        THEN excluded.window_started
        ELSE alex_anon_rate_limits.last_violation END
    RETURNING blocked_until, strikes, hits`;
  const row = await env.DB.prepare(sql).bind(String(uid), bucket, stamp).first();
  if (row && Number(row.blocked_until) > stamp) {
    return { ok: false, retry_after: Number(row.blocked_until) - stamp, strikes: Number(row.strikes || 0) };
  }
  return { ok: true };
}

function rateLimited(result) {
  return json({ error: "rate limited", retry_after: result.retry_after || 1 }, 429);
}

let userSettingsTableReady = false;
async function ensureUserSettingsTable(env) {
  if (userSettingsTableReady) return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS alex_anon_user_settings (
    tg_id TEXT PRIMARY KEY,
    notifications_enabled INTEGER NOT NULL DEFAULT 1,
    onboarding_seen INTEGER NOT NULL DEFAULT 0,
    updated_at INTEGER NOT NULL
  )`).run();
  userSettingsTableReady = true;
}

async function getUserSettings(env, uid) {
  await ensureUserSettingsTable(env);
  const row = await env.DB.prepare(
    "SELECT notifications_enabled, onboarding_seen FROM alex_anon_user_settings WHERE tg_id = ?"
  ).bind(String(uid)).first();
  return { notifications_enabled: row ? !!row.notifications_enabled : true, onboarding_seen: !!row?.onboarding_seen };
}

async function setNotifications(env, uid, enabled) {
  await ensureUserSettingsTable(env);
  await env.DB.prepare(`INSERT INTO alex_anon_user_settings (tg_id, notifications_enabled, onboarding_seen, updated_at)
    VALUES (?, ?, 1, ?) ON CONFLICT(tg_id) DO UPDATE SET
    notifications_enabled = excluded.notifications_enabled, updated_at = excluded.updated_at`)
    .bind(String(uid), enabled ? 1 : 0, now()).run();
  return { notifications_enabled: !!enabled };
}

async function markOnboardingSeen(env, uid) {
  await ensureUserSettingsTable(env);
  await env.DB.prepare(`INSERT INTO alex_anon_user_settings (tg_id, notifications_enabled, onboarding_seen, updated_at)
    VALUES (?, 1, 1, ?) ON CONFLICT(tg_id) DO UPDATE SET onboarding_seen = 1, updated_at = excluded.updated_at`)
    .bind(String(uid), now()).run();
}

async function getPreferences(env, uid) {
  const row = await env.DB.prepare(
    "SELECT theme, mascot FROM alex_anon_preferences WHERE tg_id = ?"
  ).bind(String(uid)).first();
  return { theme: row?.theme || "violet", mascot: row?.mascot || "🐰" };
}

async function getOrCreateUser(env, id, username) {
  await env.DB.prepare(
    `INSERT INTO users (tg_id, username, lang, role, permissions, created_at)
     VALUES (?, ?, ?, 'user', '', ?)
     ON CONFLICT(tg_id) DO UPDATE SET username = excluded.username`
  ).bind(id, username, env.DEFAULT_LANG, now()).run();
  return getUser(env, id);
}

const setState = (env, id, state) => env.DB.prepare("UPDATE users SET state = ? WHERE tg_id = ?").bind(state, id).run();
const setLang = (env, id, lang) => env.DB.prepare("UPDATE users SET lang = ? WHERE tg_id = ?").bind(lang, id).run();

const getLinkByOwner = (env, owner) => env.DB.prepare("SELECT * FROM links WHERE owner_id = ?").bind(owner).first();
const getLinkById = (env, id) => env.DB.prepare("SELECT * FROM links WHERE id = ?").bind(id).first();

async function createLink(env, owner, intro) {
  const id = randomId(10);
  await env.DB.prepare(
    "INSERT INTO links (id, owner_id, intro_text, is_active, created_at) VALUES (?, ?, ?, 1, ?)"
  ).bind(id, owner, intro, now()).run();
  return id;
}

async function getOrCreateThread(env, linkId, senderId) {
  const existing = await env.DB.prepare(
    "SELECT * FROM threads WHERE link_id = ? AND sender_tg_id = ?"
  ).bind(linkId, senderId).first();
  if (existing) return existing;
  const id = randomId(16);
  await env.DB.prepare(
    "INSERT INTO threads (id, link_id, sender_tg_id, is_blocked, created_at) VALUES (?, ?, ?, 0, ?)"
  ).bind(id, linkId, senderId, now()).run();
  return { id, is_blocked: 0 };
}

// owner: صاحب لینک | sender: فرستنده ناشناس | spy: فقط ادمین اصلی، فقط خواندنی و بدون ثبت دیده‌شدن
async function getAccess(env, threadId, uid) {
  const th = await env.DB.prepare(
    `SELECT t.id, t.sender_tg_id AS senderId, t.is_blocked, l.owner_id AS ownerId, l.id AS linkId, l.is_active
     FROM threads t JOIN links l ON l.id = t.link_id WHERE t.id = ?`
  ).bind(threadId).first();
  if (!th) return null;
  if (String(th.ownerId) === String(uid)) return { ...th, role: "owner" };
  if (String(th.senderId) === String(uid)) return { ...th, role: "sender" };
  if (isMain(env, uid)) return { ...th, role: "spy" };
  return null;
}

async function addMsg(env, threadId, direction, kind, content, fileId, mid, read) {
  const createdAt = now();
  const result = await env.DB.prepare(
    `INSERT INTO messages (thread_id, direction, msg_type, content, file_id, tg_message_id, is_read, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(threadId, direction, kind, content ?? null, fileId ?? null, mid ?? null, read ? 1 : 0, createdAt).run();
  const id = result?.meta?.last_row_id;
  if (id != null) {
    return env.DB.prepare(
      "SELECT id, direction, msg_type AS kind, content, file_id, created_at FROM messages WHERE id = ?"
    ).bind(id).first();
  }
  return env.DB.prepare(
    "SELECT id, direction, msg_type AS kind, content, file_id, created_at FROM messages WHERE thread_id = ? ORDER BY id DESC LIMIT 1"
  ).bind(threadId).first();
}

async function unreadInbox(env, ownerId) {
  const r = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM messages m JOIN threads t ON t.id = m.thread_id JOIN links l ON l.id = t.link_id
     WHERE l.owner_id = ? AND m.direction = 'in' AND m.is_read = 0`
  ).bind(ownerId).first();
  return r ? r.n : 0;
}

const threadSql = (side, dir, where) => `
  SELECT t.id, '${side}' AS role, l.id AS linkId, t.is_blocked AS blocked,
    (SELECT msg_type FROM messages WHERE thread_id = t.id ORDER BY id DESC LIMIT 1) AS lastKind,
    (SELECT content FROM messages WHERE thread_id = t.id ORDER BY id DESC LIMIT 1) AS lastText,
    (SELECT MAX(created_at) FROM messages WHERE thread_id = t.id) AS lastAt,
    (SELECT COUNT(*) FROM messages WHERE thread_id = t.id AND direction = '${dir}' AND is_read = 0) AS unread
  FROM threads t JOIN links l ON l.id = t.link_id WHERE ${where} AND EXISTS (SELECT 1 FROM messages mx WHERE mx.thread_id = t.id) ORDER BY lastAt DESC LIMIT 200`;

async function listThreads(env, uid) {
  const inbox = await env.DB.prepare(threadSql("owner", "in", "l.owner_id = ?")).bind(uid).all();
  const chats = await env.DB.prepare(threadSql("sender", "out", "t.sender_tg_id = ?")).bind(uid).all();
  return { inbox: inbox.results, chats: chats.results };
}

// ================= Bot flows =================

function linkUrl(env, id) {
  return `https://t.me/${env.BOT_USERNAME}?start=${id}`;
}

function appButton(env, lang) {
  return { inline_keyboard: [[{ text: t(lang, "openApp"), web_app: { url: env.MINIAPP_URL } }]] };
}

async function notifyOwnerIfIdle(env, ownerId, unreadBefore) {
  if (unreadBefore > 0) return;
  const settings = await getUserSettings(env, ownerId);
  if (!settings.notifications_enabled) return;
  const u = await getUser(env, ownerId);
  const lang = u ? u.lang : env.DEFAULT_LANG;
  await send(env, Number(ownerId), t(lang, "notify"), { reply_markup: appButton(env, lang) });
}

async function sendOnboardingIfNeeded(env, uid, lang) {
  const settings = await getUserSettings(env, uid);
  if (settings.onboarding_seen) return;
  await markOnboardingSeen(env, uid);
  await send(env, uid, t(lang, "onboarding"));
}

async function showHome(env, uid, lang) {
  await sendOnboardingIfNeeded(env, uid, lang);
  const link = await getLinkByOwner(env, uid);
  if (link) return send(env, uid, t(lang, "alreadyHave", { link: linkUrl(env, link.id) }), { reply_markup: appButton(env, lang) });
  return send(env, uid, t(lang, "welcome"), {
    reply_markup: { inline_keyboard: [[{ text: t(lang, "createBtn"), callback_data: "create_link" }]] },
  });
}

async function enterAsSender(env, uid, lang, linkId) {
  const link = await getLinkById(env, linkId);
  if (!link) return send(env, uid, t(lang, "notFound"));
  if (!link.is_active) return send(env, uid, t(lang, "linkInactive"));
  if (String(link.owner_id) === String(uid)) {
    return send(env, uid, t(lang, "alreadyHave", { link: linkUrl(env, link.id) }), { reply_markup: appButton(env, lang) });
  }
  await setState(env, uid, `sending:${linkId}`);
  const intro = link.intro_text ? `${link.intro_text}\n\n` : "";
  return send(env, uid, intro + t(lang, "intro"), { reply_markup: appButton(env, lang) });
}

async function relayToOwner(env, msg, uid, lang, linkId) {
  const link = await getLinkById(env, linkId);
  if (!link || !link.is_active) {
    await setState(env, uid, null);
    return send(env, uid, t(lang, "linkInactive"));
  }
  const thread = await getOrCreateThread(env, linkId, uid);
  if (thread.is_blocked) return send(env, uid, t(lang, "blocked"));
  const { msg_type, content, file_id } = extract(msg);
  if (!msg_type) return send(env, uid, t(lang, "unsupported"));
  const before = await unreadInbox(env, link.owner_id);
  await addMsg(env, thread.id, "in", msg_type, content, file_id, msg.message_id, 0);
  await notifyOwnerIfIdle(env, link.owner_id, before);
  return send(env, uid, t(lang, "sent"));
}

async function handleMessage(env, msg) {
  if (msg.chat.type !== "private" || !msg.from) return;
  const uid = msg.from.id;
  const user = await getOrCreateUser(env, uid, msg.from.username ?? null);
  if (!user || user.is_blocked) return;
  const lang = user.lang;
  const text = msg.text ?? "";

  const botLimit = await checkRateLimit(env, uid, "bot_msgs", 8, 10);
  if (!botLimit.ok) return send(env, uid, t(lang, "rateLimitBot", { seconds: String(botLimit.retry_after) }));

  if (text === "/cancel") {
    await setState(env, uid, null);
    return send(env, uid, t(lang, "cancelled"));
  }

  const sm = text.match(/^\/start(?:\s+(\S+))?$/);
  if (sm) {
    await setState(env, uid, null);
    if (sm[1]) {
      await sendOnboardingIfNeeded(env, uid, lang);
      return enterAsSender(env, uid, lang, sm[1]);
    }
    return showHome(env, uid, lang);
  }

  if (text === "/admin") return showAdmin(env, uid, lang);

  if (user.state && user.state.startsWith("adm:")) {
    return adminInput(env, uid, lang, text, user.state.slice(4));
  }

  if (text === "/lang") {
    const next = lang === "fa" ? "en" : "fa";
    await setLang(env, uid, next);
    return send(env, uid, t(next, next === "fa" ? "langFa" : "langEn"));
  }

  if (user.state === "awaiting_intro" && text && !text.startsWith("/")) {
    const existing = await getLinkByOwner(env, uid);
    await setState(env, uid, null);
    if (existing) return send(env, uid, t(lang, "alreadyHave", { link: linkUrl(env, existing.id) }), { reply_markup: appButton(env, lang) });
    const id = await createLink(env, uid, text.slice(0, 1000));
    return send(env, uid, t(lang, "linkCreated", { link: linkUrl(env, id) }), { reply_markup: appButton(env, lang) });
  }

  if (user.state && user.state.startsWith("sending:")) {
    return relayToOwner(env, msg, uid, lang, user.state.slice("sending:".length));
  }

  return showHome(env, uid, lang);
}

async function handleCallback(env, cb) {
  const uid = cb.from.id;
  const user = await getOrCreateUser(env, uid, cb.from.username ?? null);
  await answerCb(env, cb.id);
  if (!user || user.is_blocked) return;
  const limit = await checkRateLimit(env, uid, "bot_actions", 12, 10);
  if (!limit.ok) return send(env, uid, t(user.lang, "rateLimitBot", { seconds: String(limit.retry_after) }));
  if (cb.data === "create_link") {
    const existing = await getLinkByOwner(env, uid);
    if (existing) return send(env, uid, t(user.lang, "alreadyHave", { link: linkUrl(env, existing.id) }), { reply_markup: appButton(env, user.lang) });
    await setState(env, uid, "awaiting_intro");
    return send(env, uid, t(user.lang, "askIntro"));
  }
  if (cb.data && cb.data.startsWith("adm:")) return adminCallback(env, uid, cb.data.slice(4));
}

// ================= Admin (buttons) =================

const isMain = (env, uid) => String(uid) === String(env.ADMIN_ID);

async function isAdmin(env, uid) {
  if (isMain(env, uid)) return true;
  const u = await getUser(env, uid);
  return !!u && u.role === "admin";
}

async function hasPerm(env, uid, p) {
  if (isMain(env, uid)) return true;
  const u = await getUser(env, uid);
  return !!u && (u.permissions || "").split(",").includes(p);
}

async function canDo(env, uid, perm) {
  if (!(await isAdmin(env, uid))) return false;
  if (!perm || isMain(env, uid)) return true;
  if (perm === "main") return false;
  return hasPerm(env, uid, perm);
}

const ADMIN_PERM_KEYS = ["manage_users", "manage_links", "reveal", "broadcast", "tickets", "stats"];
const PERM_LABEL = {
  manage_users: "👤 Users & bans", manage_links: "🔗 Links", reveal: "🔍 Reveal identity",
  broadcast: "📢 Broadcast", tickets: "🎫 Tickets", stats: "📊 Stats",
};

const ADMIN_BTNS = [
  ["users", "👤 Users", "manage_users"],
  ["links", "🔗 Links", "manage_links"],
  ["stats", "📊 Stats", "stats"],
  ["ask:grant", "🔐 Grant reveal", "manage_users"],
  ["ask:revoke", "🚫 Revoke reveal", "manage_users"],
  ["ask:block", "⛔ Block user", "manage_users"],
  ["ask:unblock", "✅ Unblock user", "manage_users"],
  ["ask:deactivate", "🔒 Pause link", "manage_links"],
  ["ask:activate", "🔓 Resume link", "manage_links"],
  ["ask:broadcast", "📢 Broadcast", "broadcast"],
  ["tickets", "🎫 Tickets", "tickets"],
  ["admins", "👑 Admins", "main"],
  ["purge", "🧹 Purge now", "main"],
];

const ACTION_PERM = {
  grant: "manage_users", revoke: "manage_users", block: "manage_users", unblock: "manage_users",
  deactivate: "manage_links", activate: "manage_links", broadcast: "broadcast", newadmin: "main",
};

const ACTION_HINT = {
  grant: "Send the Telegram ID to give reveal permission.",
  revoke: "Send the Telegram ID to remove reveal permission.",
  block: "Send the Telegram ID to block.",
  unblock: "Send the Telegram ID to unblock.",
  deactivate: "Send the link ID to pause.",
  activate: "Send the link ID to resume.",
  broadcast: "Write the announcement. It will be sent to all users in small batches.",
  newadmin: "Send the Telegram ID of the new admin. Then you choose their permissions.",
};

async function showAdmin(env, uid, lang) {
  if (!(await isAdmin(env, uid))) return send(env, uid, t(lang, "denied"));
  const rows = [];
  let row = [];
  for (const [k, label, perm] of ADMIN_BTNS) {
    if (perm && !(await canDo(env, uid, perm))) continue;
    row.push({ text: label, callback_data: "adm:" + k });
    if (row.length === 2) { rows.push(row); row = []; }
  }
  if (row.length) rows.push(row);
  return send(env, uid, "🛠 Admin panel", { reply_markup: { inline_keyboard: rows } });
}

async function adminCallback(env, uid, key) {
  if (!(await isAdmin(env, uid))) return send(env, uid, t("en", "denied"));

  if (key === "admins") {
    if (!isMain(env, uid)) return send(env, uid, t("en", "denied"));
    const r = await env.DB.prepare("SELECT tg_id, username FROM users WHERE role = 'admin' ORDER BY created_at LIMIT 30").all();
    const rows = (r.results || []).map((a) => [{ text: "⚙️ " + a.tg_id + (a.username ? " @" + a.username : ""), callback_data: "adm:menu:" + a.tg_id }]);
    rows.push([{ text: "➕ New admin", callback_data: "adm:ask:newadmin" }]);
    return send(env, uid, "👑 Admins", { reply_markup: { inline_keyboard: rows } });
  }

  if (key.startsWith("menu:")) {
    if (!isMain(env, uid)) return send(env, uid, t("en", "denied"));
    return adminMenuCard(env, uid, Number(key.slice(5)));
  }

  if (key.startsWith("tog:")) {
    if (!isMain(env, uid)) return send(env, uid, t("en", "denied"));
    const [, idStr, perm] = key.split(":");
    const target = Number(idStr);
    if (!target || !ADMIN_PERM_KEYS.includes(perm) || isMain(env, target)) return send(env, uid, t("en", "denied"));
    const u = await getUser(env, target);
    if (!u || u.role !== "admin") return send(env, uid, "Not an admin.");
    const list = (u.permissions || "").split(",").filter(Boolean);
    const next = list.includes(perm) ? list.filter((p) => p !== perm) : [...list, perm];
    await env.DB.prepare("UPDATE users SET permissions = ? WHERE tg_id = ?").bind(next.join(","), target).run();
    return adminMenuCard(env, uid, target);
  }

  if (key.startsWith("rm:")) {
    if (!isMain(env, uid)) return send(env, uid, t("en", "denied"));
    const target = Number(key.slice(3));
    if (!target || isMain(env, target)) return send(env, uid, t("en", "denied"));
    await env.DB.prepare("UPDATE users SET role = 'user', permissions = '' WHERE tg_id = ?").bind(target).run();
    return send(env, uid, "🛑 Admin rights removed from " + target);
  }

  if (key === "tickets") {
    if (!(await canDo(env, uid, "tickets"))) return send(env, uid, t("en", "denied"));
    await ensureOpsTables(env);
    const r = await env.DB.prepare("SELECT id, kind, from_tg_id, body FROM alex_anon_tickets WHERE status = 'open' ORDER BY id DESC LIMIT 10").all();
    if (!r.results || !r.results.length) return send(env, uid, "No open tickets.");
    for (const tk of r.results) {
      const row = [{ text: "✖ Close #" + tk.id, callback_data: "adm:tkt:close:" + tk.id }];
      if (tk.kind === "reveal") row.unshift({ text: "✅ Approve #" + tk.id, callback_data: "adm:tkt:ok:" + tk.id });
      await send(env, uid, "🎫 #" + tk.id + " (" + tk.kind + ")\nFrom: " + tk.from_tg_id + "\n\n" + tk.body, { reply_markup: { inline_keyboard: [row] } });
    }
    return null;
  }

  if (key.startsWith("tkt:")) {
    const [, action, idStr] = key.split(":");
    await ensureOpsTables(env);
    const tk = await env.DB.prepare("SELECT * FROM alex_anon_tickets WHERE id = ?").bind(Number(idStr)).first();
    if (!tk || tk.status !== "open") return send(env, uid, "Ticket not found or already handled.");
    if (action === "ok") {
      if (tk.kind !== "reveal" || !(await canDo(env, uid, "manage_users"))) return send(env, uid, t("en", "denied"));
      const target = await getUser(env, Number(tk.from_tg_id));
      if (target) {
        const list = (target.permissions || "").split(",").filter(Boolean);
        if (!list.includes("reveal")) list.push("reveal");
        await env.DB.prepare("UPDATE users SET permissions = ? WHERE tg_id = ?").bind(list.join(","), target.tg_id).run();
        await send(env, Number(tk.from_tg_id), t(target.lang || env.DEFAULT_LANG, "ticketApproved"));
      }
      await env.DB.prepare("UPDATE alex_anon_tickets SET status = 'approved' WHERE id = ?").bind(tk.id).run();
      return send(env, uid, "✅ Approved #" + tk.id);
    }
    if (!(await canDo(env, uid, "tickets"))) return send(env, uid, t("en", "denied"));
    await env.DB.prepare("UPDATE alex_anon_tickets SET status = 'closed' WHERE id = ?").bind(tk.id).run();
    return send(env, uid, "✖ Closed #" + tk.id);
  }

  if (key === "purge") {
    if (!isMain(env, uid)) return send(env, uid, t("en", "denied"));
    return send(env, uid, "⚠️ This deletes ALL conversation messages now. Users, links and settings stay. Continue?", {
      reply_markup: { inline_keyboard: [[
        { text: "🧹 Yes, purge now", callback_data: "adm:purge_yes" },
        { text: "Cancel", callback_data: "adm:purge_no" },
      ]] },
    });
  }

  if (key === "purge_yes") {
    if (!isMain(env, uid)) return send(env, uid, t("en", "denied"));
    try { await env.DB.prepare("DELETE FROM alex_anon_message_flags").run(); } catch (e) {}
    const r = await env.DB.prepare("DELETE FROM messages").run();
    return send(env, uid, "🧹 Removed " + ((r.meta && r.meta.changes) || 0) + " messages.");
  }

  if (key === "purge_no") return send(env, uid, t("en", "cancelled"));

  if (key === "users") {
    if (!(await canDo(env, uid, "manage_users"))) return send(env, uid, t("en", "denied"));
    const r = await env.DB.prepare(
      "SELECT tg_id, username, role, is_blocked FROM users ORDER BY created_at DESC LIMIT 15"
    ).all();
    if (!r.results.length) return send(env, uid, "No users yet.");
    const text = r.results.map((u) =>
      `${u.tg_id}  @${u.username || "-"}  [${u.role}]${u.is_blocked ? "  ⛔ banned" : ""}`
    ).join("\n");
    const rows = r.results
      .filter((u) => !isMain(env, u.tg_id))
      .map((u) => [{
        text: (u.is_blocked ? "✅ Unban " : "⛔ Ban ") + u.tg_id,
        callback_data: (u.is_blocked ? "adm:unban:" : "adm:ban:") + u.tg_id,
      }]);
    const extra = rows.length ? { reply_markup: { inline_keyboard: rows } } : {};
    return send(env, uid, text, extra);
  }

  if (key.startsWith("ban:") || key.startsWith("unban:")) {
    if (!(await canDo(env, uid, "manage_users"))) return send(env, uid, t("en", "denied"));
    const isBan = key.startsWith("ban:");
    const target = Number(key.split(":")[1]);
    if (!target || isMain(env, target)) return send(env, uid, t("en", "denied"));
    await env.DB.prepare("UPDATE users SET is_blocked = ? WHERE tg_id = ?").bind(isBan ? 1 : 0, target).run();
    return send(env, uid, (isBan ? "⛔ Banned " : "✅ Unbanned ") + target);
  }

  if (key === "links") {
    if (!(await canDo(env, uid, "manage_links"))) return send(env, uid, t("en", "denied"));
    const r = await env.DB.prepare(
      "SELECT id, owner_id, is_active FROM links ORDER BY created_at DESC LIMIT 20"
    ).all();
    const text = r.results.map((l) => `${l.id} | owner ${l.owner_id} | ${l.is_active ? "active" : "paused"}`).join("\n");
    return send(env, uid, text || "No links yet.");
  }

  if (key === "stats") {
    if (!(await canDo(env, uid, "stats"))) return send(env, uid, t("en", "denied"));
    const s = await env.DB.prepare(
      "SELECT (SELECT COUNT(*) FROM users) AS users, (SELECT COUNT(*) FROM links) AS links, (SELECT COUNT(*) FROM messages) AS messages, (SELECT COUNT(*) FROM threads) AS threads"
    ).first();
    return send(env, uid, `👤 ${s.users} users\n🔗 ${s.links} links\n🧵 ${s.threads} chats\n✉️ ${s.messages} messages`);
  }

  if (key.startsWith("ask:")) {
    const action = key.slice(4);
    if (!(await canDo(env, uid, ACTION_PERM[action]))) return send(env, uid, t("en", "denied"));
    await setState(env, uid, "adm:" + action);
    return send(env, uid, ACTION_HINT[action] + "\n\n/cancel to stop.");
  }
}

async function adminInput(env, uid, lang, text, action) {
  await setState(env, uid, null);
  if (text === "/cancel") return send(env, uid, t(lang, "cancelled"));
  if (!(await canDo(env, uid, ACTION_PERM[action]))) return send(env, uid, t(lang, "denied"));

  if (action === "broadcast") return createBroadcast(env, uid, lang, text);
  if (action === "newadmin") {
    const id = Number(text.trim().split(/\s+/)[0]);
    if (!id || isMain(env, id)) return send(env, uid, "Send a numeric Telegram ID.");
    const nu = await getUser(env, id);
    if (!nu) return send(env, uid, "User not found. They must /start the bot first.");
    await env.DB.prepare("UPDATE users SET role = 'admin' WHERE tg_id = ?").bind(id).run();
    return adminMenuCard(env, uid, id);
  }

  const [a, b] = text.trim().split(/\s+/);

  if (action === "deactivate" || action === "activate") {
    await env.DB.prepare("UPDATE links SET is_active = ? WHERE id = ?")
      .bind(action === "activate" ? 1 : 0, a || "").run();
    return send(env, uid, t(lang, "done"));
  }

  const target = Number(a);
  if (!target) return send(env, uid, "Send a numeric Telegram ID.");
  const u = await getUser(env, target);
  if (!u) return send(env, uid, "User not found. They must /start the bot first.");

  if (action === "grant" || action === "revoke") {
    const list = (u.permissions || "").split(",").filter((p) => p && p !== "reveal");
    if (action === "grant") list.push("reveal");
    await env.DB.prepare("UPDATE users SET permissions = ? WHERE tg_id = ?").bind(list.join(","), target).run();
  } else if (action === "block" || action === "unblock") {
    await env.DB.prepare("UPDATE users SET is_blocked = ? WHERE tg_id = ?")
      .bind(action === "block" ? 1 : 0, target).run();
  } else if (action === "setadmin") {
    await env.DB.prepare("UPDATE users SET role = 'admin', permissions = ? WHERE tg_id = ?")
      .bind(b || "", target).run();
  } else if (action === "removeadmin") {
    await env.DB.prepare("UPDATE users SET role = 'user', permissions = '' WHERE tg_id = ?").bind(target).run();
  }
  return send(env, uid, t(lang, "done"));
}

// ================= Admin: menus, tickets, broadcast, purge =================

async function adminMenuCard(env, uid, target) {
  const u = await getUser(env, target);
  if (!u || u.role !== "admin") return send(env, uid, "Not an admin.");
  const list = (u.permissions || "").split(",").filter(Boolean);
  const rows = ADMIN_PERM_KEYS.map((p) => [{
    text: (list.includes(p) ? "✅ " : "⬜ ") + PERM_LABEL[p],
    callback_data: "adm:tog:" + target + ":" + p,
  }]);
  rows.push([{ text: "🛑 Remove admin", callback_data: "adm:rm:" + target }]);
  rows.push([{ text: "⬅ Admins", callback_data: "adm:admins" }]);
  return send(env, uid, "⚙️ " + target + (u.username ? " @" + u.username : "") + "\nTap to toggle permissions:", {
    reply_markup: { inline_keyboard: rows },
  });
}

let opsTablesReady = false;
async function ensureOpsTables(env) {
  if (opsTablesReady) return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS alex_anon_broadcasts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL, status TEXT NOT NULL,
    cursor INTEGER NOT NULL DEFAULT 0, sent INTEGER NOT NULL DEFAULT 0, failed INTEGER NOT NULL DEFAULT 0,
    admin_id TEXT, created_at INTEGER NOT NULL)`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS alex_anon_tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT, thread_id TEXT NOT NULL, from_tg_id TEXT NOT NULL,
    role TEXT NOT NULL, kind TEXT NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL, created_at INTEGER NOT NULL)`).run();
  opsTablesReady = true;
}

const BROADCAST_BATCH = 20; // هر دقیقه حداکثر ۲۰ پیام؛ زیر سقف ریکوئست رایگان و تلگرام

async function createBroadcast(env, uid, lang, text) {
  await ensureOpsTables(env);
  const body = String(text || "").trim().slice(0, 4000);
  if (!body) return send(env, uid, "Empty text.");
  const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE is_blocked = 0").first();
  await env.DB.prepare(
    "INSERT INTO alex_anon_broadcasts (body, status, cursor, sent, failed, admin_id, created_at) VALUES (?, 'active', 0, 0, 0, ?, ?)"
  ).bind(body, String(uid), now()).run();
  return send(env, uid, t(lang, "broadcastQueued", { count: String((c && c.n) || 0), batch: String(BROADCAST_BATCH) }));
}

// اجرا توسط Cron هر دقیقه: دسته‌های کوچک و بدون هنگ شدن ربات
async function runBroadcastTick(env) {
  await ensureOpsTables(env);
  const job = await env.DB.prepare("SELECT * FROM alex_anon_broadcasts WHERE status = 'active' ORDER BY id LIMIT 1").first();
  if (!job) return;
  const rows = await env.DB.prepare(
    "SELECT tg_id, lang FROM users WHERE tg_id > ? AND is_blocked = 0 ORDER BY tg_id LIMIT ?"
  ).bind(job.cursor, BROADCAST_BATCH).all();
  const list = rows.results || [];
  let cursor = job.cursor, sent = job.sent, failed = job.failed;
  for (const u of list) {
    const r = await send(env, Number(u.tg_id), job.body);
    if (r && r.ok) sent++; else failed++;
    cursor = u.tg_id;
  }
  const finished = list.length < BROADCAST_BATCH;
  await env.DB.prepare("UPDATE alex_anon_broadcasts SET cursor = ?, sent = ?, failed = ?, status = ? WHERE id = ?")
    .bind(cursor, sent, failed, finished ? "done" : "active", job.id).run();
  if (finished && job.admin_id) {
    await send(env, Number(job.admin_id), "📢 Broadcast finished. Sent: " + sent + ", failed: " + failed + ".");
  }
}

async function createTicket(env, uid, b) {
  await ensureOpsTables(env);
  const th = await getAccess(env, b.thread_id, uid);
  if (!th || th.role === "spy") return json({ error: "not found" }, 404);
  const body = String(b.body || "").trim().slice(0, 1000);
  if (!body) return json({ error: "empty" }, 400);
  const kind = b.kind === "reveal" && th.role === "owner" ? "reveal" : "report";
  const limit = await checkRateLimit(env, uid, "tickets", 3, 600);
  if (!limit.ok) return rateLimited(limit);
  const r = await env.DB.prepare(
    "INSERT INTO alex_anon_tickets (thread_id, from_tg_id, role, kind, body, status, created_at) VALUES (?, ?, ?, ?, ?, 'open', ?)"
  ).bind(th.id, String(uid), th.role, kind, body, now()).run();
  const ticketId = r.meta && r.meta.last_row_id;
  const row = [];
  if (kind === "reveal") row.push({ text: "✅ Approve reveal", callback_data: "adm:tkt:ok:" + ticketId });
  row.push({ text: "✖ Close", callback_data: "adm:tkt:close:" + ticketId });
  await send(env, Number(env.ADMIN_ID), "🎫 Ticket #" + ticketId + " (" + kind + ")\nRole: " + th.role + "\n\n" + body, {
    reply_markup: { inline_keyboard: [row] },
  });
  return json({ ok: true });
}

// ================= Mini app API =================

// یک درخواست واحد: اطلاعات کاربر + صندوق + گفتگوها (جایگزین /api/me و /api/threads)
async function apiInit(env, uid, user) {
  const u = await getUser(env, uid);
  const link = await getLinkByOwner(env, uid);
  const { inbox, chats } = await listThreads(env, uid);
  const sum = (arr) => arr.reduce((s, x) => s + (x.unread || 0), 0);
  const main = isMain(env, uid);
  const perms = u ? (u.permissions || "").split(",") : [];
  const spyThreads = main
    ? (await env.DB.prepare(threadSql("spy", "in", "1=1")).all()).results
    : [];
  const preferences = await getPreferences(env, uid);
  const userSettings = await getUserSettings(env, uid);
  return json({
    name: user.first_name || "",
    lang: u ? u.lang : env.DEFAULT_LANG,
    is_admin: main || (!!u && u.role === "admin"),
    is_spy: main,
    has_reveal: main || perms.includes("reveal"),
    link: link ? { id: link.id, url: linkUrl(env, link.id), intro: link.intro_text || "", active: !!link.is_active } : null,
    counts: { inbox: inbox.length, inbox_unread: sum(inbox), chats: chats.length, chats_unread: sum(chats) },
    inbox,
    chats,
    spy_threads: spyThreads,
    preferences,
    user_settings: userSettings,
  });
}

async function threadView(env, uid, threadId) {
  const th = await getAccess(env, threadId, uid);
  if (!th) return json({ error: "not found" }, 404);

  const isOwner = th.role === "owner";
  const isSpy = th.role === "spy";

  // فقط صاحب لینک و فرستنده دیده‌شدن را ثبت می‌کنند؛ ناظر هرگز علامت دیده‌شدن نمی‌زند
  if (!isSpy) {
    const incoming = isOwner ? "in" : "out";
    const r = await env.DB.prepare(
      "UPDATE messages SET is_read = 1 WHERE thread_id = ? AND direction = ? AND is_read = 0"
    ).bind(th.id, incoming).run();
    if (isOwner && r.meta && r.meta.changes > 0) {
      const su = await getUser(env, th.senderId);
      await send(env, Number(th.senderId), t(su ? su.lang : env.DEFAULT_LANG, "seen"));
    }
  }

  const rows = await env.DB.prepare(
    `SELECT m.id, m.direction, m.msg_type AS kind, m.content, m.file_id, m.created_at,
       COALESCE(f.is_saved, 0) AS is_saved, COALESCE(f.is_pinned, 0) AS is_pinned
     FROM messages m
     LEFT JOIN alex_anon_message_flags f ON f.message_id = m.id AND f.tg_id = ?
     WHERE m.thread_id = ? ORDER BY m.id`
  ).bind(String(uid), th.id).all();

  const mineDir = th.role === "sender" ? "in" : "out";
  const label = isOwner
    ? "Anonymous #" + th.id.slice(0, 6)
    : isSpy
      ? "👁 " + th.id.slice(0, 6)
      : "Owner #" + th.linkId.slice(0, 6);

  return json({
    role: th.role,
    blocked: !!th.is_blocked,
    label,
    can_reveal: isOwner && (await hasPerm(env, uid, "reveal")),
    messages: rows.results.map((m) => ({ ...m, mine: m.direction === mineDir })),
  });
}

async function apiSend(env, b, uid) {
  const th = await getAccess(env, b.thread_id, uid);
  if (!th || th.role === "spy") return json({ error: "not found" }, 404);
  if (th.is_blocked) return json({ error: "blocked" }, 403);

  const text = String(b.text || "").trim().slice(0, 4000);
  const file = b.file && typeof b.file === "object" ? b.file : null;
  if (!file && !text) return json({ error: "empty" }, 400);
  if (file && file.size > 49 * 1024 * 1024) return json({ error: "file too large" }, 413);

  let kind = "text";
  if (file) kind = b.kind && b.kind !== "text" ? b.kind : kindFromFile(file);
  if (kind === "document") kind = "file";

  if (th.role === "sender") {
    let fileId = null, mid = null;
    if (file) {
      const r = await sendMediaSafe(env, env.ADMIN_ID, telegramKind(kind, file), file, text || undefined);
      if (!r.ok) return json({ error: "upload failed" }, 502);
      fileId = fileIdOf(r.result);
      mid = r.result.message_id;
    }
    const before = await unreadInbox(env, th.ownerId);
    const saved = await addMsg(env, th.id, "in", file ? kind : "text", text || null, fileId, mid, 0);
    await notifyOwnerIfIdle(env, th.ownerId, before);
    return json({ ok: true, message: saved ? { ...saved, mine: true, is_saved: 0, is_pinned: 0 } : null });
  }

  // owner → sender
  const caption = text ? "💬 " + text : "💬";
  const r = file
    ? await sendMediaSafe(env, th.senderId, telegramKind(kind, file), file, caption)
    : await send(env, th.senderId, caption);
  if (!r.ok) return json({ error: "could not deliver" }, 502);
  const fileId = file ? fileIdOf(r.result) : null;
  const mid = file ? r.result.message_id : null;
  const saved = await addMsg(env, th.id, "out", file ? kind : "text", text || null, fileId, mid, 0);
  return json({ ok: true, message: saved ? { ...saved, mine: true, is_saved: 0, is_pinned: 0 } : null });
}

async function fileRoute(env, req, url) {
  const user = await verifyInitData(env, req.headers.get("x-init-data"));
  if (!user) return new Response("unauthorized", { status: 401 });
  const dbUser = await getUser(env, user.id);
  if (dbUser && dbUser.is_blocked) return new Response("blocked", { status: 403 });
  const limit = await checkRateLimit(env, user.id, "files", 30, 10);
  if (!limit.ok) return new Response("rate limited", { status: 429, headers: { "retry-after": String(limit.retry_after) } });
  const fileId = url.searchParams.get("id") || "";
  const row = await env.DB.prepare(
    `SELECT t.sender_tg_id AS senderId, l.owner_id AS ownerId FROM messages m
     JOIN threads t ON t.id = m.thread_id JOIN links l ON l.id = t.link_id
     WHERE m.file_id = ? LIMIT 1`
  ).bind(fileId).first();
  const allowed = row && (String(row.ownerId) === String(user.id) || String(row.senderId) === String(user.id) || isMain(env, user.id));
  if (!allowed) return new Response("not found", { status: 404 });
  const info = await tg(env, "getFile", { file_id: fileId });
  if (!info.ok || !info.result.file_path) return new Response("not found", { status: 404 });
  const path = info.result.file_path;
  const r = await fetch(`https://api.telegram.org/file/bot${env.BOT_TOKEN}/${path}`);
  const ext = path.split(".").pop().toLowerCase();
  const types = {
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif",
    mp4: "video/mp4", mov: "video/quicktime", webm: "video/webm",
    ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", mp3: "audio/mpeg", m4a: "audio/mp4", wav: "audio/wav",
  };
  // هر file_id همیشه همان فایل است؛ مرورگر یک‌ساله کش می‌کند تا دوباره به Worker نیاید
  return new Response(r.body, {
    headers: { "content-type": types[ext] || "application/octet-stream", "cache-control": "private, max-age=31536000, immutable" },
  });
}

async function updatePreferences(env, uid, body) {
  const themes = ["violet", "ocean", "rose", "emerald", "sunset"];
  const mascots = ["🐰", "🦊", "🐱", "👻", "🐼", "🐸"];
  const current = await getPreferences(env, uid);
  const theme = themes.includes(body.theme) ? body.theme : current.theme;
  const mascot = mascots.includes(body.mascot) ? body.mascot : current.mascot;
  await env.DB.prepare(
    `INSERT INTO alex_anon_preferences (tg_id, theme, mascot, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(tg_id) DO UPDATE SET theme = excluded.theme, mascot = excluded.mascot, updated_at = excluded.updated_at`
  ).bind(String(uid), theme, mascot, now()).run();
  return { theme, mascot };
}

async function setMessageFlag(env, uid, body) {
  const threadId = String(body.thread_id || "");
  const messageId = Number(body.message_id);
  const flag = body.flag;
  if (!threadId || !Number.isSafeInteger(messageId) || messageId <= 0 || !["saved", "pinned"].includes(flag)) {
    return json({ error: "bad request" }, 400);
  }
  const access = await getAccess(env, threadId, uid);
  if (!access || access.role === "spy") return json({ error: "not found" }, 404);
  const message = await env.DB.prepare(
    "SELECT id FROM messages WHERE id = ? AND thread_id = ?"
  ).bind(messageId, threadId).first();
  if (!message) return json({ error: "not found" }, 404);
  const old = await env.DB.prepare(
    "SELECT is_saved, is_pinned FROM alex_anon_message_flags WHERE tg_id = ? AND message_id = ?"
  ).bind(String(uid), messageId).first();
  const saved = flag === "saved" ? (body.enabled ? 1 : 0) : Number(old?.is_saved || 0);
  const pinned = flag === "pinned" ? (body.enabled ? 1 : 0) : Number(old?.is_pinned || 0);
  await env.DB.prepare(
    `INSERT INTO alex_anon_message_flags (tg_id, message_id, is_saved, is_pinned, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(tg_id, message_id) DO UPDATE SET
       is_saved = excluded.is_saved, is_pinned = excluded.is_pinned, updated_at = excluded.updated_at`
  ).bind(String(uid), messageId, saved, pinned, now(), now()).run();
  return json({ ok: true, is_saved: !!saved, is_pinned: !!pinned });
}

async function savedMessages(env, uid) {
  const rows = await env.DB.prepare(
    `SELECT m.id AS message_id, m.thread_id, m.direction, m.msg_type AS kind, m.content,
       m.file_id, m.created_at, f.is_pinned, t.link_id AS linkId
     FROM alex_anon_message_flags f
     JOIN messages m ON m.id = f.message_id
     JOIN threads t ON t.id = m.thread_id
     WHERE f.tg_id = ? AND f.is_saved = 1
     ORDER BY f.updated_at DESC LIMIT 200`
  ).bind(String(uid)).all();
  return json({ messages: rows.results });
}

async function prepareMediaShare(env, uid, body) {
  const threadId = String(body.thread_id || "");
  const messageId = Number(body.message_id);
  if (!threadId || !Number.isSafeInteger(messageId) || messageId <= 0) return json({ error: "bad request" }, 400);
  const access = await getAccess(env, threadId, uid);
  if (!access || access.role === "spy") return json({ error: "not found" }, 404);
  const message = await env.DB.prepare(
    "SELECT id, msg_type, content, file_id FROM messages WHERE id = ? AND thread_id = ?"
  ).bind(messageId, threadId).first();
  if (!message || !message.file_id) return json({ error: "media not found" }, 404);
  const caption = String(message.content || "").slice(0, 1024);
  const id = String(message.id);
  let result;
  if (message.msg_type === "photo") result = { type: "photo", id, photo_file_id: message.file_id, title: "Alex Anon photo", caption };
  else if (message.msg_type === "video") result = { type: "video", id, video_file_id: message.file_id, title: "Alex Anon video", description: caption.slice(0, 200), caption };
  else if (message.msg_type === "voice") result = { type: "voice", id, voice_file_id: message.file_id, title: "Alex Anon voice message", caption };
  else if (message.msg_type === "audio") result = { type: "audio", id, audio_file_id: message.file_id, title: "Alex Anon audio", caption };
  else result = { type: "document", id, document_file_id: message.file_id, title: "Alex Anon file", caption };
  const shareOptions = {
    user_id: Number(uid),
    allow_user_chats: true, allow_group_chats: true, allow_channel_chats: false,
  };
  let prepared = await tg(env, "savePreparedInlineMessage", { ...shareOptions, result });
  // بعضی فایل‌ها در مسیر ارسال قبلی به‌صورت document ذخیره شده‌اند؛ در آن حالت نوع cached document را امتحان کن.
  if (!prepared.ok && result.type !== "document") {
    prepared = await tg(env, "savePreparedInlineMessage", {
      ...shareOptions,
      result: { type: "document", id, document_file_id: message.file_id, title: "Alex Anon file", caption },
    });
  }
  if (!prepared.ok || !prepared.result?.id) return json({ error: "share unavailable" }, 502);
  return json({ ok: true, prepared_message_id: prepared.result.id });
}

async function apiRoute(env, path, b, user) {
  const uid = user.id;
  switch (path) {
    case "/api/init":
    case "/api/me":
      return apiInit(env, uid, user);

    case "/api/preferences": {
      const preferences = await updatePreferences(env, uid, b);
      return json({ ok: true, preferences });
    }

    case "/api/notifications": {
      const settings = await setNotifications(env, uid, !!b.enabled);
      return json({ ok: true, settings });
    }

    case "/api/ticket":
      return createTicket(env, uid, b);

    case "/api/share":
      return prepareMediaShare(env, uid, b);

    case "/api/message_flag":
      return setMessageFlag(env, uid, b);

    case "/api/saved":
      return savedMessages(env, uid);

    case "/api/lang": {
      if (!["en", "fa"].includes(b.lang)) return json({ error: "bad lang" }, 400);
      await getOrCreateUser(env, uid, user.username ?? null);
      await setLang(env, uid, b.lang);
      return json({ ok: true });
    }

    case "/api/create": {
      if (await getLinkByOwner(env, uid)) return json({ error: "already have a link" }, 409);
      const intro = String(b.intro_text || "").trim().slice(0, 1000);
      if (!intro) return json({ error: "intro required" }, 400);
      await getOrCreateUser(env, uid, user.username ?? null);
      const id = await createLink(env, uid, intro);
      const link = await getLinkById(env, id);
      return json({ ok: true, link: { id, url: linkUrl(env, id), intro: link?.intro_text || intro, active: true } });
    }

    case "/api/intro": {
      const link = await getLinkByOwner(env, uid);
      if (!link) return json({ error: "no link" }, 404);
      await env.DB.prepare("UPDATE links SET intro_text = ? WHERE id = ?")
        .bind(String(b.intro_text || "").slice(0, 1000), link.id).run();
      return json({ ok: true });
    }

    case "/api/link_active": {
      const link = await getLinkByOwner(env, uid);
      if (!link) return json({ error: "no link" }, 404);
      await env.DB.prepare("UPDATE links SET is_active = ? WHERE id = ?").bind(b.active ? 1 : 0, link.id).run();
      return json({ ok: true });
    }

    case "/api/threads":
      return json(await listThreads(env, uid));

    case "/api/spy": {
      if (!isMain(env, uid)) return json({ error: "forbidden" }, 403);
      const r = await env.DB.prepare(threadSql("spy", "in", "1=1")).all();
      return json({ threads: r.results });
    }

    case "/api/thread":
      return threadView(env, uid, b.thread_id);

    case "/api/send":
      return apiSend(env, b, uid);

    case "/api/block": {
      const th = await getAccess(env, b.thread_id, uid);
      if (!th || th.role !== "owner") return json({ error: "not found" }, 404);
      await env.DB.prepare("UPDATE threads SET is_blocked = ? WHERE id = ?").bind(b.blocked ? 1 : 0, th.id).run();
      return json({ ok: true });
    }

    case "/api/reveal": {
      const th = await getAccess(env, b.thread_id, uid);
      if (!th || th.role !== "owner") return json({ error: "not found" }, 404);
      if (!(await hasPerm(env, uid, "reveal"))) return json({ error: "forbidden" }, 403);
      await env.DB.prepare(
        "INSERT INTO reveal_log (admin_id, thread_id, target_owner, revealed_at) VALUES (?, ?, ?, ?)"
      ).bind(uid, th.id, uid, now()).run();
      // فقط یوزرنیم یا نام نمایشی، هرگز آیدی عددی
      const info = await tg(env, "getChat", { chat_id: th.senderId });
      const c = info.ok ? info.result : {};
      const name = c.username
        ? "@" + c.username
        : [c.first_name, c.last_name].filter(Boolean).join(" ");
      return json({ name: name || "—" });
    }

    default:
      return json({ error: "not found" }, 404);
  }
}

// ================= Mini app page =================

const APP_HTML = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Anonybot</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
:root{--bg1:#120a3a;--bg2:#1d1656;--card:rgba(255,255,255,.08);--line:rgba(255,255,255,.14);--txt:#f4f1ff;--mut:#b3acdf;--a:#8b5cf6;--b:#3b82f6;--glow1:rgba(139,92,246,.34);--glow2:rgba(59,130,246,.28)}
body[data-theme="ocean"]{--bg1:#071c32;--bg2:#0a3a55;--a:#0891b2;--b:#2563eb;--glow1:rgba(8,145,178,.34);--glow2:rgba(37,99,235,.28)}
body[data-theme="rose"]{--bg1:#320d29;--bg2:#551638;--a:#ec4899;--b:#f97316;--glow1:rgba(236,72,153,.32);--glow2:rgba(249,115,22,.25)}
body[data-theme="emerald"]{--bg1:#062b25;--bg2:#104638;--a:#10b981;--b:#0d9488;--glow1:rgba(16,185,129,.32);--glow2:rgba(13,148,136,.25)}
body[data-theme="sunset"]{--bg1:#321b0b;--bg2:#54251d;--a:#f97316;--b:#e11d48;--glow1:rgba(249,115,22,.32);--glow2:rgba(225,29,72,.25)}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;min-height:100%}
body{font-family:system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif;color:var(--txt);background:radial-gradient(1100px 600px at 10% -10%,var(--glow1) 0%,transparent 60%),radial-gradient(900px 500px at 110% 10%,var(--glow2) 0%,transparent 55%),linear-gradient(160deg,var(--bg1),var(--bg2));min-height:100dvh;overflow-x:hidden}
#app{max-width:520px;margin:0 auto;padding:16px 16px 120px}
@keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,40px) scale(1.15)}}
@keyframes float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-10px) rotate(4deg)}}
@keyframes pop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
@keyframes pulse{50%{transform:scale(1.12)}}
.blob{position:fixed;width:340px;height:340px;border-radius:50%;filter:blur(70px);opacity:.35;z-index:-1;animation:drift 14s ease-in-out infinite alternate}
.b1{background:var(--a);top:-120px;left:-120px}.b2{background:var(--b);bottom:-140px;right:-120px;animation-delay:-5s}
.top{display:flex;align-items:center;justify-content:space-between;margin:4px 0 6px}
.brand{display:flex;align-items:center;gap:10px}
.bunny{font-size:40px;animation:float 3.2s ease-in-out infinite;filter:drop-shadow(0 8px 14px var(--glow1))}
.hi{font-weight:800;font-size:18px}.brand-name{font-size:11px;font-weight:800;letter-spacing:.8px;color:var(--a)}.sub{font-size:12px;color:var(--mut)}
.pill{border:1px solid var(--line);background:var(--card);color:var(--txt);border-radius:999px;padding:6px 14px;font-weight:700}
.hero{text-align:center;padding:12px 8px 4px;animation:pop .5s ease both}
.mascot{font-size:72px;animation:float 3s ease-in-out infinite}
.hero-t{font-size:22px;font-weight:900;margin-top:4px}.hero-s{color:var(--mut);font-size:14px;margin-top:4px}
.card{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:16px;margin:12px 0;backdrop-filter:blur(14px);box-shadow:0 10px 30px rgba(0,0,0,.25);animation:pop .4s ease both}
.lbl{font-size:12px;color:var(--mut);margin:8px 0 6px;letter-spacing:.3px}
.url{font-weight:800;word-break:break-all;background:rgba(0,0,0,.25);padding:10px;border-radius:14px;direction:ltr}
.row{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}
.btn{flex:1;border:0;border-radius:16px;padding:12px 14px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--a),var(--b));box-shadow:0 8px 20px rgba(59,130,246,.35);transition:transform .15s}
.btn:active{transform:scale(.96)}
.btn.ghost{background:var(--card);border:1px solid var(--line);box-shadow:none}
.ta,.ci{width:100%;background:rgba(0,0,0,.25);color:var(--txt);border:1px solid var(--line);border-radius:16px;padding:12px;font:inherit;resize:none}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:12px 6px;text-align:center;animation:pop .4s ease both}
.stat .n{font-size:22px;font-weight:900;background:linear-gradient(135deg,#c4b5fd,#93c5fd);-webkit-background-clip:text;background-clip:text;color:transparent}
.stat .l{font-size:11px;color:var(--mut)}
.title{font-size:20px;font-weight:900;margin:14px 0 4px}
.item{width:100%;display:flex;align-items:center;gap:12px;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:12px;margin:10px 0;color:var(--txt);text-align:start;animation:pop .35s ease both}
.av{width:48px;height:48px;flex:none;border-radius:16px;display:grid;place-items:center;font-size:24px;background:linear-gradient(135deg,#7c3aed,#2563eb)}
.ib{flex:1;min-width:0}.nm{font-weight:800}
.pv{font-size:13px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.side{display:flex;flex-direction:column;align-items:flex-end;gap:6px;font-size:11px;color:var(--mut)}
.badge{background:linear-gradient(135deg,#f43f5e,#fb7185);color:#fff;border-radius:999px;padding:2px 8px;font-size:11px;font-weight:800;animation:pulse 1.6s infinite;display:inline-block}
.empty{text-align:center;color:var(--mut);padding:30px 10px}
.tip{color:var(--mut);font-size:13px}
.nav{position:fixed;left:12px;right:12px;bottom:12px;max-width:496px;margin:auto;display:flex;justify-content:space-around;background:rgba(20,12,55,.75);border:1px solid var(--line);border-radius:26px;padding:8px;backdrop-filter:blur(16px);z-index:20}
.nav button{flex:1;background:transparent;border:0;color:var(--mut);font-size:11px;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 0;border-radius:18px}
.nav button i{font-style:normal;font-size:20px}
.nav button.on{color:#fff;background:linear-gradient(135deg,var(--a),var(--b));box-shadow:0 6px 18px rgba(139,92,246,.45)}
.chat{position:fixed;inset:0;display:flex;flex-direction:column;background:linear-gradient(160deg,var(--bg1),var(--bg2));z-index:10}
.ctop{display:flex;align-items:center;gap:8px;padding:12px 12px 6px}
.ctitle{flex:1;min-width:0}
.ib-btn{width:40px;height:40px;flex:none;border-radius:14px;border:1px solid var(--line);background:var(--card);color:var(--txt);font-size:18px}
.acts{display:flex;gap:6px}
.chips{display:flex;gap:8px;overflow-x:auto;padding:4px 12px 10px}
.chip{flex:none;border:1px solid var(--line);background:var(--card);color:var(--txt);border-radius:999px;padding:6px 12px;font-size:12px;display:flex;gap:6px;align-items:center}
.chip.on{background:linear-gradient(135deg,var(--a),var(--b));border-color:transparent}
.msgs{flex:1;overflow-y:auto;padding:8px 12px;display:flex;flex-direction:column}
.msg{display:flex;margin:6px 0}.msg.mine{justify-content:flex-end}.msg.theirs{justify-content:flex-start}
.bub{max-width:82%;padding:10px 12px;border-radius:18px;background:var(--card);border:1px solid var(--line);animation:pop .3s ease both}
.msg.mine .bub{background:linear-gradient(135deg,var(--a),var(--b));border:0;border-bottom-right-radius:6px}
.msg.theirs .bub{border-bottom-left-radius:6px}
.txt{white-space:pre-wrap;word-break:break-word}
.tm{font-size:10px;opacity:.7;margin-top:4px;text-align:end}
.media{max-width:260px;width:100%;border-radius:12px;display:block;margin-bottom:6px}
img.media{min-height:120px;background:rgba(0,0,0,.2)}
audio.media{width:240px}
.loadbtn{display:block;border:1px solid var(--line);background:rgba(0,0,0,.25);color:var(--txt);border-radius:12px;padding:10px 14px;font-weight:700;margin-bottom:6px}
.composer{display:flex;gap:6px;align-items:flex-end;padding:10px 12px 18px;background:rgba(10,6,30,.65);backdrop-filter:blur(16px);border-top:1px solid var(--line)}
.tools{display:flex;gap:4px}
.tool{width:38px;height:38px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--txt);font-size:16px}
.tool.rec{background:#e11d48;animation:pulse 1s infinite}
.ci{flex:1;min-height:42px;max-height:120px}
.send{width:44px;height:44px;flex:none;border-radius:16px;border:0;color:#fff;background:linear-gradient(135deg,var(--a),var(--b));font-size:18px}
.muted{color:var(--mut);font-size:13px}
.readonly{text-align:center;color:var(--mut);font-size:12px;padding:10px;border-top:1px solid var(--line)}
.flag-actions{display:flex;justify-content:flex-end;gap:6px;margin-top:7px}.retention-note{font-size:11px;line-height:1.55;color:var(--mut);background:rgba(255,255,255,.055);border:1px solid var(--line);border-radius:12px;padding:9px 11px;margin:0 0 8px}
.flag-btn{border:1px solid var(--line);background:rgba(0,0,0,.16);color:var(--txt);border-radius:10px;padding:4px 8px;font-size:12px}
.flag-btn.on{background:linear-gradient(135deg,var(--a),var(--b));border-color:transparent}
.pinned-strip{display:flex;gap:7px;overflow-x:auto;padding:5px 12px 9px;border-bottom:1px solid var(--line)}
.pin-chip{flex:none;max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:1px solid var(--line);background:var(--card);color:var(--txt);border-radius:12px;padding:7px 10px;font-size:12px}
.saved-item{width:100%;text-align:start;border:1px solid var(--line);background:var(--card);border-radius:16px;color:var(--txt);padding:12px;margin:8px 0}
.theme-grid,.mascot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0 14px}
.theme-choice,.mascot-choice{border:1px solid var(--line);background:var(--card);color:var(--txt);border-radius:14px;padding:10px 6px;font-weight:700}
.theme-choice.on,.mascot-choice.on{outline:2px solid var(--a);background:rgba(255,255,255,.12)}
.theme-dot{display:inline-block;width:14px;height:14px;border-radius:50%;vertical-align:-2px;margin-inline-end:5px}
.msg[data-mid]{scroll-margin:16px}
</style></head>
<body>
<div class="blob b1"></div><div class="blob b2"></div>
<div id="app">
  <header class="top">
    <div class="brand"><div class="bunny">🐰</div><div><div class="hi" id="hi"></div><div class="brand-name">anony bot</div><div class="sub" id="sub"></div></div></div>
    <button class="pill" id="langBtn">FA</button>
  </header>
  <main id="view"></main>
</div>
<nav class="nav" id="nav">
  <button data-tab="home"><i>🏠</i><span data-i="home"></span></button>
  <button data-tab="inbox"><i>📥</i><span data-i="inbox"></span></button>
  <button data-tab="chats"><i>💬</i><span data-i="chats"></span></button>
  <button data-tab="settings"><i>⚙️</i><span data-i="settings"></span></button>
</nav>
<script>
var tgw = window.Telegram && window.Telegram.WebApp;
if (tgw) { try { tgw.ready(); tgw.expand(); } catch (e) {} }
var INIT = tgw ? tgw.initData : '';
var UNAME = (tgw && tgw.initDataUnsafe && tgw.initDataUnsafe.user && tgw.initDataUnsafe.user.first_name) || '';
var ME = null, LANG = 'en', curTab = 'home', curThread = null, timer = null, lastCount = -1, blobCache = {};
var INBOX = [], CHATS = [], SPY = [], PREFS = { theme: 'violet', mascot: '🐰' }, lastFetch = 0, lastThreadAt = 0, inflight = null, io = null;
var THREAD_CACHE = Object.create(null), THREAD_CACHE_AT = Object.create(null), CURRENT_CHAT = null, CHAT_RETURN_TAB = 'inbox';
var SAVED_CACHE = null, SAVED_CACHE_AT = 0, apiCooldownUntil = 0, clientBlocked = false;

// ---- تنظیمات مصرف ----
// لیست‌ها ۶۰ ثانیه کش می‌شوند: جابه‌جایی بین تب‌ها هیچ درخواستی نمی‌زند
var TTL = 300000; // پنج دقیقه؛ تب‌گردی معمولی هیچ درخواست تازه‌ای نمی‌فرستد
// ۰ یعنی بدون پولینگ خودکار (کمترین مصرف). برای زنده بودن چت مثلا 30000 بگذار: هر ۳۰ ثانیه فقط وقتی چت باز و صفحه دیده می‌شود
var LIVE_POLL_MS = 0;

var view = document.getElementById('view');
var nav = document.getElementById('nav');

var TX = {
  en: {
    home:'Home', inbox:'Inbox', chats:'Chats', settings:'Settings', refresh:'Refresh', savedMessages:'Saved messages', savedEmpty:'No saved messages yet.', pausedNote:'This link is paused.', theme:'Theme', mascot:'Avatar', pin:'Pin', unpin:'Unpin', saveMessage:'Save', unsaveMessage:'Unsave', pinned:'Pinned', rateLimited:'Too many actions. Try again in {seconds}s.', userBlocked:'This account is blocked.',
    notifications:'Notifications', notificationsOn:'🔔 New-message notifications are on', notificationsOff:'🔕 New-message notifications are off', enableNotifications:'Turn notifications on', disableNotifications:'Turn notifications off', saveTelegram:'Save to Telegram', retention:'🔒 Conversation records are kept in the Alex Anon database for up to 20 days, then automatically deleted. Save anything important to Telegram Saved Messages before it expires.',
    yourLink:'Your secret link', homeSub:'Share it and get anonymous messages.',
    copy:'Copy', share:'Share', copied:'Link copied!', saved:'Saved ✨',
    introLabel:'Intro shown to visitors', save:'Save',
    createTitle:'Create your link', createHint:'Write the first message people will see',
    introPh:'Hi! Send me anything 👀', create:'Create my link',
    inboxEmpty:'No anonymous messages yet 🐰', chatsEmpty:'Open a link and start a chat',
    inboxUnread:'Unread', inboxN:'Inbox', chatsUnread:'Replies',
    active:'Link is live ✅', paused:'Link is paused ⏸', noLink:'No link yet',
    pause:'Pause link', resume:'Resume link',
    lang:'Language', adminTip:'You are an admin. Send /admin to the bot.',
    monitor:'👁 Monitor chats', monitorTip:'Read-only. Opening chats here does not mark them as seen.',
    typing:'Message…', reveal:'Reveal', revealed:'Sender: ', block:'Block', unblock:'Unblock', blockedNote:'Blocked',
    voice:'Voice', photo:'Photo', video:'Video', file:'File', audio:'Music', text:'Message',
    err:'Something went wrong', tooBig:'File is too large (max 49MB)', mediaErr:'media unavailable',
    anonLabel:'Anonymous', ownerLabel:'Owner', shareText:'Send me an anonymous message 🐰',
    readonly:'👁 Read-only monitor mode', ticketReport:'🚩 Report', ticketReveal:'🔍 Reveal request', ticketPh:'Describe briefly…', ticketSend:'Send to admin', ticketSent:'Sent to admin ✅'
  },
  fa: {
    home:'خانه', inbox:'صندوق', chats:'گفتگوها', settings:'تنظیمات', refresh:'بروزرسانی', savedMessages:'پیام‌های ذخیره‌شده', savedEmpty:'هنوز پیامی ذخیره نکرده‌ای.', pausedNote:'این لینک متوقف شده است.', theme:'قالب رنگی', mascot:'آواتار', pin:'سنجاق', unpin:'برداشتن سنجاق', saveMessage:'ذخیره', unsaveMessage:'حذف ذخیره', pinned:'سنجاق‌شده', rateLimited:'تعداد درخواست‌ها زیاد است. {seconds} ثانیه دیگر تلاش کن.', userBlocked:'حساب کاربری مسدود شده است.',
    notifications:'اعلان‌ها', notificationsOn:'🔔 اعلان پیام‌های جدید روشن است', notificationsOff:'🔕 اعلان پیام‌های جدید خاموش است', enableNotifications:'روشن‌کردن اعلان‌ها', disableNotifications:'خاموش‌کردن اعلان‌ها', saveTelegram:'ذخیره در تلگرام', retention:'🔒 اطلاعات گفتگو حداکثر تا ۲۰ روز در پایگاه داده Alex Anon نگهداری می‌شود و پس از آن خودکار حذف خواهد شد. محتوای مهم را پیش از پایان مهلت در Saved Messages ذخیره کن.',
    yourLink:'لینک مخفی تو', homeSub:'لینکت را بفرست و پیام ناشناس بگیر.',
    copy:'کپی', share:'اشتراک', copied:'لینک کپی شد!', saved:'ذخیره شد ✨',
    introLabel:'متنی که بقیه می‌بینند', save:'ذخیره',
    createTitle:'لینکت را بساز', createHint:'اولین پیامی که بقیه می‌بینند را بنویس',
    introPh:'سلام! هر چی دوست داری بفرست 👀', create:'ساخت لینک من',
    inboxEmpty:'هنوز پیام ناشناسی نیست 🐰', chatsEmpty:'یک لینک را باز کن و گفتگو را شروع کن',
    inboxUnread:'جدید', inboxN:'صندوق', chatsUnread:'پاسخ‌ها',
    active:'لینک فعال است ✅', paused:'لینک متوقف است ⏸', noLink:'هنوز لینکی نداری',
    pause:'توقف لینک', resume:'فعال کردن لینک',
    lang:'زبان', adminTip:'تو ادمین هستی. در ربات /admin را بفرست.',
    monitor:'👁 نظارت بر گفتگوها', monitorTip:'فقط خواندنی. باز کردن گفتگوها اینجا پیام را دیده‌شده نمی‌کند.',
    typing:'پیام…', reveal:'افشا', revealed:'فرستنده: ', block:'مسدود', unblock:'آزاد کردن', blockedNote:'مسدود',
    voice:'ویس', photo:'عکس', video:'ویدیو', file:'فایل', audio:'موزیک', text:'پیام',
    err:'مشکلی پیش آمد', tooBig:'فایل خیلی بزرگ است (حداکثر ۴۹ مگابایت)', mediaErr:'مدیا در دسترس نیست',
    anonLabel:'ناشناس', ownerLabel:'صاحب لینک', shareText:'یک پیام ناشناس برایم بفرست 🐰',
    readonly:'👁 حالت نظارت فقط‌خواندنی', ticketReport:'🚩 گزارش', ticketReveal:'🔍 درخواست خواندن هویت', ticketPh:'کوتاه توضیح بده…', ticketSend:'ارسال به ادمین', ticketSent:'برای ادمین ارسال شد ✅'
  }
};

function tr(k) { return (TX[LANG] && TX[LANG][k]) || TX.en[k] || k; }
function el(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function notice(m) { if (tgw && tgw.showAlert) tgw.showAlert(m); else alert(m); }
function fail(e) { notice((e && e.message) || tr('err')); }
function timeOf(sec) { return new Date(sec * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }

function showBlockedScreen() {
  clientBlocked = true;
  stopTimer();
  if (nav) nav.style.display = 'none';
  if (view) {
    view.innerHTML = '';
    var c = el('div', 'card');
    c.append(el('div', 'hero-t', tr('userBlocked')));
    view.append(c);
  }
}

function api(path, body) {
  if (clientBlocked) return Promise.reject(new Error(tr('userBlocked')));
  if (Date.now() < apiCooldownUntil) {
    var wait = Math.max(1, Math.ceil((apiCooldownUntil - Date.now()) / 1000));
    return Promise.reject(new Error(tr('rateLimited').replace('{seconds}', String(wait))));
  }
  var opts = { method: 'POST', headers: {} };
  if (body instanceof FormData) {
    body.append('initData', INIT);
    opts.body = body;
  } else {
    opts.headers['content-type'] = 'application/json';
    opts.body = JSON.stringify(Object.assign({ initData: INIT }, body || {}));
  }
  return fetch(path, opts).then(function (r) {
    return r.json().then(function (j) {
      if (!r.ok) {
        if (r.status === 429) {
          var seconds = Math.max(1, Number(j.retry_after || 1));
          apiCooldownUntil = Math.max(apiCooldownUntil, Date.now() + seconds * 1000);
          throw new Error(tr('rateLimited').replace('{seconds}', String(Math.ceil(seconds))));
        }
        if (r.status === 403 && j.error === 'user blocked') {
          showBlockedScreen();
          throw new Error(tr('userBlocked'));
        }
        throw new Error(j.error || tr('err'));
      }
      return j;
    });
  });
}

function applyTheme() {
  document.body.setAttribute('data-theme', PREFS.theme || 'violet');
  document.querySelectorAll('.bunny,.mascot').forEach(function (n) { n.textContent = PREFS.mascot || '🐰'; });
}

// ----- Media (lazy: only fetched when visible / tapped) -----

function mediaUrl(id) {
  if (blobCache[id]) return Promise.resolve(blobCache[id]);
  if (clientBlocked) return Promise.reject(new Error(tr('userBlocked')));
  if (Date.now() < apiCooldownUntil) return Promise.reject(new Error('rate limited'));
  return fetch('/api/file?id=' + encodeURIComponent(id), { headers: { 'x-init-data': INIT } })
    .then(function (r) {
      if (r.status === 403) { showBlockedScreen(); throw new Error(tr('userBlocked')); }
      if (r.status === 429) {
        var seconds = Math.max(1, Number(r.headers.get('retry-after') || 1));
        apiCooldownUntil = Math.max(apiCooldownUntil, Date.now() + seconds * 1000);
        throw new Error('rate limited');
      }
      if (!r.ok) throw new Error('file');
      return r.blob();
    })
    .then(function (b) { var u = URL.createObjectURL(b); blobCache[id] = u; return u; });
}

function loadInto(n) {
  mediaUrl(n.getAttribute('data-fid')).then(function (u) { n.src = u; }).catch(function () {
    n.replaceWith(el('div', 'muted', '⚠ ' + tr('mediaErr')));
  });
}

// عکس‌ها فقط وقتی به صفحه نزدیک شدند لود می‌شوند
function hydrate(root) {
  root.querySelectorAll('img[data-fid]:not([data-hyd])').forEach(function (n) {
    n.setAttribute('data-hyd', '1');
    if (!('IntersectionObserver' in window)) { loadInto(n); return; }
    if (!io) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { io.unobserve(e.target); loadInto(e.target); }
        });
      }, { root: document.getElementById('msgs'), rootMargin: '200px' });
    }
    io.observe(n);
  });
}

// ویس، موزیک، ویدیو و فایل فقط با لمس کاربر دانلود می‌شوند
function lazyMedia(kind, fid) {
  var icon = { video: '🎬', voice: '🎙', audio: '🎵', file: '📎' }[kind] || '📎';
  var label = icon + ' ' + tr(kind) + (kind === 'file' ? ' ⬇' : ' ▶');
  var b = el('button', 'loadbtn', label);
  b.onclick = function () {
    b.disabled = true; b.textContent = '…';
    mediaUrl(fid).then(function (u) {
      if (kind === 'file') {
        var a = el('a'); a.href = u; a.download = 'file';
        document.body.append(a); a.click(); a.remove();
        b.disabled = false; b.textContent = label;
        return;
      }
      var n = el(kind === 'video' ? 'video' : 'audio', 'media');
      n.controls = true; n.src = u;
      if (kind === 'video') n.playsInline = true;
      b.replaceWith(n);
      try { var p = n.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    }).catch(function () { b.replaceWith(el('div', 'muted', '⚠ ' + tr('mediaErr'))); });
  };
  return b;
}

function applyLang() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === 'fa' ? 'rtl' : 'ltr';
  document.getElementById('langBtn').textContent = LANG === 'fa' ? 'EN' : 'FA';
  document.querySelectorAll('[data-i]').forEach(function (n) { n.textContent = tr(n.getAttribute('data-i')); });
  document.getElementById('hi').textContent = (LANG === 'fa' ? 'سلام ' : 'Hey ') + (UNAME || '🐰') + ' 👋';
  var sub = document.getElementById('sub');
  sub.textContent = ME && ME.link ? (ME.link.active ? tr('active') : tr('paused')) : tr('noLink');
}

// یک درخواست برای همه چیز؛ تا TTL از کش استفاده می‌شود
function loadAll(force) {
  if (!force && ME && Date.now() - lastFetch < TTL) return Promise.resolve(ME);
  if (inflight) return inflight;
  inflight = api('/api/init').then(function (m) {
    ME = m; INBOX = m.inbox || []; CHATS = m.chats || []; SPY = m.spy_threads || [];
    PREFS = m.preferences || PREFS;
    LANG = m.lang || 'en'; lastFetch = Date.now();
    applyLang(); applyTheme();
    inflight = null;
    return m;
  }, function (e) { inflight = null; throw e; });
  return inflight;
}

function markReadLocal(id) {
  [[INBOX, 'inbox_unread'], [CHATS, 'chats_unread']].forEach(function (p) {
    p[0].forEach(function (th) {
      if (th.id === id && th.unread) {
        if (ME) ME.counts[p[1]] = Math.max(0, ME.counts[p[1]] - th.unread);
        th.unread = 0;
      }
    });
  });
}

function go(tab, force) {
  curTab = tab; curThread = null; CURRENT_CHAT = null; stopTimer();
  nav.style.display = '';
  document.querySelectorAll('#nav button').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-tab') === tab);
  });
  return loadAll(!!force).then(function () {
    if (tab === 'home') return renderHome();
    if (tab === 'inbox' || tab === 'chats') return renderList(tab);
    if (tab === 'spy') return renderSpy();
    if (tab === 'saved') return renderSaved();
    return renderSettings();
  }).catch(fail);
}

// ----- Home -----

function renderHome() {
  view.innerHTML = '';
  var hero = el('div', 'hero');
  hero.append(el('div', 'mascot', PREFS.mascot || '🐰'));
  hero.append(el('div', 'hero-t', ME.link ? tr('yourLink') : tr('createTitle')));
  hero.append(el('div', 'hero-s', ME.link ? tr('homeSub') : tr('createHint')));
  view.append(hero);
  var homeRefresh = el('button', 'pill', '🔄 ' + tr('refresh'));
  homeRefresh.onclick = function () { go('home', true); };
  view.append(homeRefresh);
  if (ME.link) view.append(linkCard()); else view.append(createCard());
  var st = el('div', 'stats');
  [[ME.counts.inbox_unread, tr('inboxUnread')], [ME.counts.inbox, tr('inboxN')], [ME.counts.chats_unread, tr('chatsUnread')]]
    .forEach(function (p) {
      var c = el('div', 'stat');
      c.append(el('div', 'n', String(p[0])), el('div', 'l', p[1]));
      st.append(c);
    });
  view.append(st);
}

function createCard() {
  var c = el('div', 'card');
  var ta = el('textarea', 'ta'); ta.rows = 3; ta.placeholder = tr('introPh');
  var b = el('button', 'btn', tr('create'));
  b.onclick = function () {
    if (!ta.value.trim()) return;
    api('/api/create', { intro_text: ta.value }).then(function (r) {
      if (r.link) { ME.link = r.link; applyLang(); renderHome(); }
      else { go('home', true); }
    }).catch(fail);
  };
  c.append(ta, el('div', 'row'), b);
  return c;
}

function linkCard() {
  var L = ME.link;
  var c = el('div', 'card');
  c.append(el('div', 'lbl', tr('yourLink')), el('div', 'url', L.url));

  var row = el('div', 'row');
  var copy = el('button', 'btn', tr('copy'));
  copy.onclick = function () {
    if (navigator.clipboard) navigator.clipboard.writeText(L.url).then(function () { notice(tr('copied')); }).catch(function () { notice(L.url); });
    else notice(L.url);
  };
  var share = el('button', 'btn ghost', tr('share'));
  share.onclick = function () {
    var u = 'https://t.me/share/url?url=' + encodeURIComponent(L.url) + '&text=' + encodeURIComponent(tr('shareText'));
    if (tgw && tgw.openTelegramLink) tgw.openTelegramLink(u); else window.open(u, '_blank');
  };
  row.append(copy, share);
  c.append(row);

  c.append(el('div', 'lbl', tr('introLabel')));
  var ta = el('textarea', 'ta'); ta.rows = 3; ta.value = L.intro;
  var save = el('button', 'btn', tr('save'));
  save.onclick = function () {
    api('/api/intro', { intro_text: ta.value }).then(function () { L.intro = ta.value; notice(tr('saved')); }).catch(fail);
  };
  var toggle = el('button', 'btn ghost', L.active ? tr('pause') : tr('resume'));
  toggle.onclick = function () {
    var next = !L.active;
    api('/api/link_active', { active: next }).then(function () {
      L.active = next; applyLang(); renderHome();
    }).catch(fail);
  };
  c.append(ta, el('div', 'row'), save, toggle);
  return c;
}

// ----- Lists (از کش خوانده می‌شوند، بدون درخواست) -----

function preview(th) {
  var k = th.lastKind || 'text';
  var icon = { photo: '🖼', video: '🎬', voice: '🎙', audio: '🎵', file: '📎', text: '💬' }[k] || '💬';
  return icon + ' ' + (th.lastText || tr(k));
}

function threadItem(th) {
  var it = el('button', 'item');
  var isSender = th.role === 'sender';
  var av = el('div', 'av', isSender ? '💌' : '🎭');
  var title = isSender
    ? tr('ownerLabel') + ' #' + th.linkId.slice(0, 6)
    : tr('anonLabel') + ' #' + th.id.slice(0, 6);
  var body = el('div', 'ib');
  body.append(el('div', 'nm', title), el('div', 'pv', preview(th)));
  var side = el('div', 'side');
  side.append(el('div', 'tm', th.lastAt ? timeOf(th.lastAt) : ''));
  if (th.unread) side.append(el('span', 'badge', String(th.unread)));
  it.append(av, body, side);
  it.onclick = function () { renderChat(th.id); };
  return it;
}

function listHead(titleText, onRefresh) {
  var head = el('div', 'row');
  head.style.alignItems = 'center';
  var h = el('div', 'title', titleText);
  h.style.flex = '1';
  var rf = el('button', 'pill', '🔄 ' + tr('refresh'));
  rf.onclick = onRefresh;
  head.append(h, rf);
  return head;
}

function renderList(kind) {
  view.innerHTML = '';
  var list = kind === 'inbox' ? INBOX : CHATS;
  view.append(listHead(tr(kind), function () { go(kind, true); }));
  if (!list.length) view.append(el('div', 'empty', tr(kind === 'inbox' ? 'inboxEmpty' : 'chatsEmpty')));
  list.forEach(function (th) { view.append(threadItem(th)); });
}

function renderSpy() {
  view.innerHTML = '';
  view.append(listHead(tr('monitor'), function () { go('spy', true); }), el('div', 'tip', tr('monitorTip')));
  if (!SPY.length) view.append(el('div', 'empty', tr('inboxEmpty')));
  SPY.forEach(function (th) { view.append(threadItem(th)); });
}

// ----- Chat -----

function chips(all, activeId) {
  var row = el('div', 'chips');
  all.forEach(function (th) {
    var name = th.role === 'sender' ? '💌 ' + th.linkId.slice(0, 6) : '🎭 ' + th.id.slice(0, 6);
    var c = el('button', 'chip' + (th.id === activeId ? ' on' : ''), name);
    if (th.unread) c.append(el('span', 'badge', String(th.unread)));
    c.onclick = function () { renderChat(th.id); };
    row.append(c);
  });
  return row;
}

function openTicket(id, role) {
  var kind = 'report';
  var box = el('div', 'card');
  box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:84px;z-index:50;max-width:496px;margin:auto';
  var kinds = el('div', 'row');
  var kr = el('button', 'btn ghost', tr('ticketReport'));
  kr.onclick = function () { kind = 'report'; };
  kinds.append(kr);
  if (role === 'owner') {
    var kv = el('button', 'btn ghost', tr('ticketReveal'));
    kv.onclick = function () { kind = 'reveal'; };
    kinds.append(kv);
  }
  var ta = el('textarea', 'ta'); ta.rows = 3; ta.placeholder = tr('ticketPh');
  var go2 = el('button', 'btn', tr('ticketSend'));
  var x = el('button', 'btn ghost', '✕');
  x.onclick = function () { box.remove(); };
  go2.onclick = function () {
    if (!ta.value.trim()) return;
    api('/api/ticket', { thread_id: id, kind: kind, body: ta.value }).then(function () { box.remove(); notice(tr('ticketSent')); }).catch(fail);
  };
  box.append(kinds, ta, el('div', 'row'), go2, x);
  document.body.append(box);
}

function chatTop(t, id) {
  var top = el('div', 'ctop');
  var back = el('button', 'ib-btn', '‹');
  back.onclick = function () {
    go(CHAT_RETURN_TAB || (t.role === 'owner' ? 'inbox' : t.role === 'spy' ? 'spy' : 'chats'));
  };
  var title = el('div', 'ctitle');
  var sub = t.role === 'spy' ? tr('readonly') : (t.blocked ? tr('blockedNote') : '');
  title.append(el('div', 'nm', t.label), el('div', 'pv', sub));
  var acts = el('div', 'acts');
  var rf = el('button', 'ib-btn', '🔄');
  rf.title = tr('refresh');
  rf.onclick = function () { loadMsgs(id, true); };
  acts.append(rf);
  if (t.role !== 'spy') {
    var tk = el('button', 'ib-btn', '🎫');
    tk.onclick = function () { openTicket(id, t.role); };
    acts.append(tk);
  }
  if (t.role === 'owner') {
    if (t.can_reveal) {
      var rv = el('button', 'ib-btn', '🔍');
      rv.onclick = function () {
        api('/api/reveal', { thread_id: id }).then(function (r) { notice(tr('revealed') + r.name); }).catch(fail);
      };
      acts.append(rv);
    }
    var bl = el('button', 'ib-btn', t.blocked ? '✅' : '⛔');
    bl.onclick = function () {
      var next = !t.blocked;
      api('/api/block', { thread_id: id, blocked: next }).then(function () {
        t.blocked = next; CURRENT_CHAT = t; THREAD_CACHE[id] = t;
        renderChat(id, false);
      }).catch(fail);
    };
    acts.append(bl);
  }
  top.append(back, title, acts);
  return top;
}

function updateSavedCache(m, enabled) {
  SAVED_CACHE = null;
  SAVED_CACHE_AT = 0;
}

function changeMessageFlag(m, flag, enabled) {
  if (!CURRENT_CHAT || CURRENT_CHAT.role === 'spy') return;
  api('/api/message_flag', {
    thread_id: curThread, message_id: m.id, flag: flag, enabled: enabled
  }).then(function (r) {
    m.is_saved = r.is_saved ? 1 : 0;
    m.is_pinned = r.is_pinned ? 1 : 0;
    if (THREAD_CACHE[curThread]) THREAD_CACHE[curThread] = CURRENT_CHAT;
    updateSavedCache(m, enabled);
    paintMessages(CURRENT_CHAT.messages, true);
    renderPinnedStrip(CURRENT_CHAT);
  }).catch(fail);
}

function bubble(m) {
  var b = el('div', 'msg ' + (m.mine ? 'mine' : 'theirs'));
  b.setAttribute('data-mid', String(m.id));
  var inner = el('div', 'bub');
  if (m.file_id) {
    var n;
    if (m.kind === 'photo') {
      n = el('img', 'media'); n.alt = '';
      n.setAttribute('data-fid', m.file_id);
    } else {
      n = lazyMedia(m.kind, m.file_id);
    }
    inner.append(n);
  }
  if (m.content) inner.append(el('div', 'txt', m.content));
  inner.append(el('div', 'tm', timeOf(m.created_at)));
  if (CURRENT_CHAT && CURRENT_CHAT.role !== 'spy') {
    var actions = el('div', 'flag-actions');
    var sv = el('button', 'flag-btn' + (m.is_saved ? ' on' : ''), m.is_saved ? '★' : '☆');
    sv.title = m.is_saved ? tr('unsaveMessage') : tr('saveMessage');
    sv.onclick = function () { changeMessageFlag(m, 'saved', !m.is_saved); };
    var pn = el('button', 'flag-btn' + (m.is_pinned ? ' on' : ''), m.is_pinned ? '📌' : '📍');
    pn.title = m.is_pinned ? tr('unpin') : tr('pin');
    pn.onclick = function () { changeMessageFlag(m, 'pinned', !m.is_pinned); };
    actions.append(sv, pn);
    if (m.file_id) {
      var sh = el('button', 'flag-btn', '↗');
      sh.title = tr('saveTelegram');
      sh.onclick = function () {
        api('/api/share', { thread_id: curThread, message_id: m.id }).then(function (r) {
          if (!tgw || typeof tgw.shareMessage !== 'function') throw new Error(tr('shareFailed'));
          tgw.shareMessage(r.prepared_message_id, function (sent) {
            if (!sent) return;
          });
        }).catch(function () { notice(tr('shareFailed')); });
      };
      actions.append(sh);
    }
    inner.append(actions);
  }
  b.append(inner);
  return b;
}

function renderPinnedStrip(chat) {
  var old = document.getElementById('pinnedStrip');
  if (old) old.remove();
  var box = document.getElementById('msgs');
  if (!box || !chat || chat.role === 'spy') return;
  var pinned = (chat.messages || []).filter(function (m) { return !!m.is_pinned; });
  if (!pinned.length) return;
  var strip = el('div', 'pinned-strip'); strip.id = 'pinnedStrip';
  pinned.forEach(function (m) {
    var label = (m.content || tr(m.kind || 'text')).replace(/\s+/g, ' ').slice(0, 50);
    var b = el('button', 'pin-chip', '📌 ' + label);
    b.onclick = function () {
      var target = document.querySelector('.msg[data-mid="' + m.id + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    strip.append(b);
  });
  box.parentNode.insertBefore(strip, box);
}
// پیام‌ها فقط اضافه می‌شوند؛ پخش‌کننده‌های باز شده دوباره ساخته نمی‌شوند
function paintMessages(list, force) {
  var box = document.getElementById('msgs');
  if (!box) return;
  if (!force && list.length === lastCount) return;
  var nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 160;
  var from = 0;
  if (force || lastCount < 0 || list.length < lastCount) box.innerHTML = '';
  else from = lastCount;
  lastCount = list.length;
  list.slice(from).forEach(function (m) { box.append(bubble(m)); });
  hydrate(box);
  if (force || nearBottom) box.scrollTop = box.scrollHeight;
}

function loadMsgs(id, force) {
  if (curThread !== id) return;
  lastThreadAt = Date.now();
  api('/api/thread', { thread_id: id }).then(function (t) {
    THREAD_CACHE[id] = t; THREAD_CACHE_AT[id] = Date.now();
    if (curThread === id) {
      CURRENT_CHAT = t;
      if (t.role !== 'spy') markReadLocal(id);
      paintMessages(t.messages, force);
      renderPinnedStrip(t);
    }
  }).catch(function (e) { if (e && e.message) fail(e); });
}

function upload(id, text, file, kind, ta) {
  if (file && file.size > 49 * 1024 * 1024) return notice(tr('tooBig'));
  var fd = new FormData();
  fd.append('thread_id', id);
  fd.append('text', text || '');
  if (kind) fd.append('kind', kind);
  if (file) fd.append('file', file, file.name || 'file');
  return api('/api/send', fd).then(function (result) {
    var msg = result.message;
    if (msg && THREAD_CACHE[id]) {
      THREAD_CACHE[id].messages.push(msg);
      THREAD_CACHE_AT[id] = Date.now();
      var all = INBOX.concat(CHATS);
      all.forEach(function (th) {
        if (th.id === id) {
          th.lastKind = msg.kind; th.lastText = msg.content || ''; th.lastAt = msg.created_at;
        }
      });
      INBOX.sort(function (a, b) { return (b.lastAt || 0) - (a.lastAt || 0); });
      CHATS.sort(function (a, b) { return (b.lastAt || 0) - (a.lastAt || 0); });
      if (curThread === id) {
        CURRENT_CHAT = THREAD_CACHE[id];
        paintMessages(CURRENT_CHAT.messages, false);
        renderPinnedStrip(CURRENT_CHAT);
      }
    } else if (curThread === id) {
      loadMsgs(id, true);
    }
  }).catch(function (e) {
    if (ta && !ta.value) ta.value = text || '';
    fail(e);
  });
}

var rec = null, recChunks = [];
function toggleRec(id, ta, btn) {
  if (rec) { rec.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder) return notice(tr('err'));
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
    var r = new MediaRecorder(stream);
    recChunks = [];
    r.ondataavailable = function (e) { if (e.data && e.data.size) recChunks.push(e.data); };
    r.onstop = function () {
      stream.getTracks().forEach(function (tk) { tk.stop(); });
      var type = r.mimeType || 'audio/webm';
      var blob = new Blob(recChunks, { type: type });
      var ext = type.indexOf('ogg') > -1 ? 'ogg' : 'webm';
      rec = null;
      btn.classList.remove('rec');
      btn.textContent = '🎙';
      upload(id, '', new File([blob], 'voice.' + ext, { type: type }), 'voice', ta);
    };
    rec = r;
    btn.classList.add('rec');
    btn.textContent = '⏹';
    r.start();
  }).catch(function () { notice(tr('err')); });
}

function inputFile(accept) {
  var i = el('input');
  i.type = 'file'; i.accept = accept; i.hidden = true;
  return i;
}

function composer(id) {
  var bar = el('div', 'composer');
  var ta = el('textarea', 'ci'); ta.rows = 1; ta.placeholder = tr('typing');
  var fImg = inputFile('image/*,video/*');
  var fAud = inputFile('audio/*');
  var fDoc = inputFile('*/*');
  var bImg = el('button', 'tool', '🖼');
  var bAud = el('button', 'tool', '🎵');
  var bDoc = el('button', 'tool', '📎');
  var bRec = el('button', 'tool', '🎙');
  bImg.onclick = function () { fImg.click(); };
  bAud.onclick = function () { fAud.click(); };
  bDoc.onclick = function () { fDoc.click(); };
  bRec.onclick = function () { toggleRec(id, ta, bRec); };
  function onPick(e) {
    var f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (f) upload(id, ta.value.trim(), f, null, ta);
  }
  fImg.onchange = onPick; fAud.onchange = onPick; fDoc.onchange = onPick;
  var sendBtn = el('button', 'send', '➤');
  function doSend() {
    var v = ta.value.trim();
    if (!v) return;
    ta.value = '';
    upload(id, v, null, 'text', ta);
  }
  sendBtn.onclick = doSend;
  ta.onkeydown = function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); } };
  var tools = el('div', 'tools');
  tools.append(bImg, bAud, bDoc, bRec);
  bar.append(fImg, fAud, fDoc, tools, ta, sendBtn);
  return bar;
}

function startLive(id) {
  stopTimer();
  if (!LIVE_POLL_MS) return;
  timer = setInterval(function () { if (!document.hidden) loadMsgs(id, false); }, LIVE_POLL_MS);
}

// باز کردن چت از کش؛ هر گفتگو فقط بار اول یا با بروزرسانی دستی از Worker خوانده می‌شود.
function showChat(id, chat, focusMessageId) {
  if (curThread !== id) return;
  CURRENT_CHAT = chat;
  THREAD_CACHE[id] = chat; THREAD_CACHE_AT[id] = Date.now();
  if (chat.role !== 'spy') markReadLocal(id);
  var wrap = el('div', 'chat');
  var box = el('div', 'msgs'); box.id = 'msgs';
  var bar = chat.role === 'spy' ? el('div', 'chips') : chips(INBOX.concat(CHATS), id);
  var cannotSend = chat.role === 'sender' && chat.blocked;
  var foot = chat.role === 'spy'
    ? el('div', 'readonly', tr('readonly'))
    : cannotSend
      ? el('div', 'readonly', tr('blockedNote'))
      : composer(id);
  var retention = el('div', 'retention-note', tr('retention'));
  wrap.append(chatTop(chat, id), retention, bar, box, foot);
  view.innerHTML = '';
  view.append(wrap);
  lastCount = -1;
  paintMessages(chat.messages, true);
  renderPinnedStrip(chat);
  if (focusMessageId) {
    requestAnimationFrame(function () {
      var target = document.querySelector('.msg[data-mid="' + focusMessageId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  lastThreadAt = Date.now();
  startLive(id);
}

function renderChat(id, force, focusMessageId) {
  if (curThread !== id && curTab !== 'saved') CHAT_RETURN_TAB = curTab;
  else if (curTab === 'saved') CHAT_RETURN_TAB = 'saved';
  curThread = id;
  stopTimer();
  if (io) { io.disconnect(); io = null; }
  nav.style.display = 'none';
  view.innerHTML = '';
  var cached = THREAD_CACHE[id];
  if (!force && cached && Date.now() - (THREAD_CACHE_AT[id] || 0) < TTL) {
    showChat(id, cached, focusMessageId);
    return;
  }
  lastThreadAt = Date.now();
  api('/api/thread', { thread_id: id }).then(function (chat) {
    if (curThread !== id) return;
    showChat(id, chat, focusMessageId);
  }).catch(fail);
}
// ----- Settings -----

function renderSaved(force) {
  view.innerHTML = '';
  var cached = SAVED_CACHE && Date.now() - SAVED_CACHE_AT < TTL;
  var load = (!force && cached) ? Promise.resolve({ messages: SAVED_CACHE }) : api('/api/saved').then(function (r) {
    SAVED_CACHE = r.messages || []; SAVED_CACHE_AT = Date.now(); return r;
  });
  return load.then(function (r) {
    view.append(listHead(tr('savedMessages'), function () { renderSaved(true); }));
    var back = el('button', 'btn ghost', '‹ ' + tr('settings'));
    back.onclick = function () { go('settings'); };
    view.append(back);
    var list = r.messages || [];
    if (!list.length) view.append(el('div', 'empty', tr('savedEmpty')));
    list.forEach(function (m) {
      var item = el('button', 'saved-item');
      var text = m.content || tr(m.kind || 'text');
      var info = (m.kind || 'text') + ' · ' + timeOf(m.created_at) + (m.is_pinned ? ' · 📌 ' + tr('pinned') : '');
      item.append(el('div', 'nm', text.slice(0, 180)), el('div', 'pv', info));
      item.onclick = function () { renderChat(m.thread_id, false, m.message_id); };
      view.append(item);
    });
  }).catch(fail);
}

function savePreferences(next) {
  api('/api/preferences', next).then(function (r) {
    PREFS = r.preferences || next;
    applyTheme();
    renderSettings();
  }).catch(fail);
}

function renderSettings() {
  view.innerHTML = '';
  view.append(el('div', 'title', tr('settings')));

  var langCard = el('div', 'card');
  langCard.append(el('div', 'lbl', tr('lang')));
  var langRow = el('div', 'row');
  ['en', 'fa'].forEach(function (l) {
    var b = el('button', 'btn' + (LANG === l ? '' : ' ghost'), l === 'en' ? 'English' : 'فارسی');
    b.onclick = function () {
      api('/api/lang', { lang: l }).then(function () {
        LANG = l; if (ME) ME.lang = l; applyLang(); renderSettings();
      }).catch(fail);
    };
    langRow.append(b);
  });
  langCard.append(langRow);
  view.append(langCard);

  var notificationCard = el('div', 'card');
  var notificationState = ME.user_settings && ME.user_settings.notifications_enabled !== false;
  notificationCard.append(el('div', 'lbl', tr('notifications')));
  notificationCard.append(el('div', 'tip', notificationState ? tr('notificationsOn') : tr('notificationsOff')));
  var notificationBtn = el('button', 'btn' + (notificationState ? ' ghost' : ''), notificationState ? tr('disableNotifications') : tr('enableNotifications'));
  notificationBtn.onclick = function () {
    api('/api/notifications', { enabled: !notificationState }).then(function (r) {
      ME.user_settings = ME.user_settings || {};
      ME.user_settings.notifications_enabled = !!r.settings.notifications_enabled;
      renderSettings();
    }).catch(fail);
  };
  notificationCard.append(notificationBtn);
  view.append(notificationCard);

  var appearance = el('div', 'card');
  appearance.append(el('div', 'lbl', tr('theme')));
  var themes = [
    ['violet', '🟣', LANG === 'fa' ? 'بنفش' : 'Violet'],
    ['ocean', '🔵', LANG === 'fa' ? 'اقیانوسی' : 'Ocean'],
    ['rose', '🌸', LANG === 'fa' ? 'رز' : 'Rose'],
    ['emerald', '🟢', LANG === 'fa' ? 'زمردی' : 'Emerald'],
    ['sunset', '🟠', LANG === 'fa' ? 'غروب' : 'Sunset']
  ];
  var themeGrid = el('div', 'theme-grid');
  themes.forEach(function (x) {
    var b = el('button', 'theme-choice' + (PREFS.theme === x[0] ? ' on' : ''), x[1] + ' ' + x[2]);
    b.onclick = function () { savePreferences({ theme: x[0], mascot: PREFS.mascot }); };
    themeGrid.append(b);
  });
  appearance.append(themeGrid, el('div', 'lbl', tr('mascot')));
  var mascotGrid = el('div', 'mascot-grid');
  ['🐰', '🦊', '🐱', '👻', '🐼', '🐸'].forEach(function (m) {
    var b = el('button', 'mascot-choice' + (PREFS.mascot === m ? ' on' : ''), m);
    b.onclick = function () { savePreferences({ theme: PREFS.theme, mascot: m }); };
    mascotGrid.append(b);
  });
  appearance.append(mascotGrid);
  view.append(appearance);

  var savedCard = el('div', 'card');
  var savedBtn = el('button', 'btn ghost', '☆ ' + tr('savedMessages'));
  savedBtn.onclick = function () { go('saved'); };
  savedCard.append(savedBtn);
  view.append(savedCard);

  if (ME.is_spy) {
    var monitorCard = el('div', 'card');
    var m = el('button', 'btn', tr('monitor'));
    m.onclick = function () { go('spy'); };
    monitorCard.append(el('div', 'tip', tr('monitorTip')), m);
    view.append(monitorCard);
  }
  if (ME.is_admin) view.append(el('div', 'card tip', tr('adminTip')));
}
// ----- Boot -----

document.getElementById('langBtn').onclick = function () {
  var next = LANG === 'fa' ? 'en' : 'fa';
  api('/api/lang', { lang: next }).then(function () {
    LANG = next; if (ME) ME.lang = next; applyLang(); go(curTab);
  }).catch(fail);
};
document.querySelectorAll('#nav button').forEach(function (b) {
  b.onclick = function () { go(b.getAttribute('data-tab')); };
});
// وقتی کاربر به مینی‌اپ برمی‌گردد، فقط در صورت کهنه بودن داده بروزرسانی می‌شود
document.addEventListener('visibilitychange', function () {
  if (document.hidden) return;
  if (curThread) { if (Date.now() - lastThreadAt > 60000) loadMsgs(curThread, false); }
  else if (!ME || Date.now() - lastFetch > TTL) go(curTab);
});
go('home');
</script>
</body></html>`;

// ================= Retention cleanup =================
// Configure a daily Cron Trigger (0 3 * * *) in Cloudflare Workers (UTC).
// Only message content/metadata and per-message flags are deleted. User profiles,
// Telegram IDs, usernames, personal links, link settings, threads, preferences,
// notification settings and access permissions are intentionally preserved.
let retentionNoticeTableReady = false;
async function ensureRetentionNoticeTable(env) {
  if (retentionNoticeTableReady) return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS alex_anon_retention_notices (
    thread_id TEXT NOT NULL,
    tg_id TEXT NOT NULL,
    retention_bucket INTEGER NOT NULL,
    notified_at INTEGER NOT NULL,
    PRIMARY KEY (thread_id, tg_id, retention_bucket)
  )`).run();
  retentionNoticeTableReady = true;
}

async function sendRetentionNotices(env, stamp) {
  await ensureRetentionNoticeTable(env);
  const reminderCutoff = stamp - 18 * 24 * 60 * 60;
  const deleteCutoff = stamp - 19 * 24 * 60 * 60;
  const eligible = await env.DB.prepare(`
    SELECT DISTINCT t.id AS thread_id, l.owner_id AS owner_id,
      t.sender_tg_id AS sender_id,
      CAST(m.created_at / 604800 AS INTEGER) AS retention_bucket
    FROM messages m
    JOIN threads t ON t.id = m.thread_id
    JOIN links l ON l.id = t.link_id
    WHERE m.created_at <= ? AND m.created_at > ?
    ORDER BY t.id
    LIMIT 1000
  `).bind(reminderCutoff, deleteCutoff).all();

  for (const item of eligible.results || []) {
    const recipients = new Set([String(item.owner_id), String(item.sender_id)]);
    for (const recipient of recipients) {
      const already = await env.DB.prepare(`SELECT 1 FROM alex_anon_retention_notices
        WHERE thread_id = ? AND tg_id = ? AND retention_bucket = ? LIMIT 1`)
        .bind(item.thread_id, recipient, item.retention_bucket).first();
      if (already) continue;
      const account = await getUser(env, recipient);
      const lang = account?.lang || env.DEFAULT_LANG || "en";
      const result = await send(env, Number(recipient), t(lang, "retentionNotice"), {
        reply_markup: appButton(env, lang),
      });
      if (result?.ok) {
        await env.DB.prepare(`INSERT OR IGNORE INTO alex_anon_retention_notices
          (thread_id, tg_id, retention_bucket, notified_at) VALUES (?, ?, ?, ?)`)
          .bind(item.thread_id, recipient, item.retention_bucket, stamp).run();
      }
    }
  }
}

async function cleanupExpiredMessages(env) {
  const stamp = now();
  await sendRetentionNotices(env, stamp);
  const cutoff = stamp - 19 * 24 * 60 * 60;

  // Remove per-user saved/pinned flags before deleting their message rows.
  await env.DB.prepare(`DELETE FROM alex_anon_message_flags WHERE message_id IN
    (SELECT id FROM messages WHERE created_at <= ?)`).bind(cutoff).run();

  // Delete only conversation messages (text and media references). Do NOT delete
  // users, links, threads, Telegram IDs/usernames, or user preferences/settings.
  await env.DB.prepare("DELETE FROM messages WHERE created_at <= ?").bind(cutoff).run();
}

// ================= Entry =================

export default {
  async scheduled(controller, env, ctx) {
    if (controller.cron === "* * * * *") ctx.waitUntil(runBroadcastTick(env));
    else ctx.waitUntil(cleanupExpiredMessages(env));
  },
  async fetch(req, env) {
    const url = new URL(req.url);

    if (url.pathname === "/webhook" && req.method === "POST") {
      if (req.headers.get("X-Telegram-Bot-Api-Secret-Token") !== env.WEBHOOK_SECRET) {
        return new Response("forbidden", { status: 403 });
      }
      const update = await req.json();
      if (update.callback_query) await handleCallback(env, update.callback_query);
      else if (update.message) await handleMessage(env, update.message);
      return new Response("ok");
    }

    if (url.pathname === "/app") {
      return new Response(APP_HTML, {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600" },
      });
    }

    if (url.pathname === "/api/file" && req.method === "GET") {
      try { return await fileRoute(env, req, url); }
      catch (e) { return new Response("error", { status: 500 }); }
    }

    if (url.pathname.startsWith("/api/") && req.method === "POST") {
      let body;
      try {
        const ct = req.headers.get("content-type") || "";
        body = ct.includes("multipart/form-data")
          ? Object.fromEntries((await req.formData()).entries())
          : await req.json();
      } catch (e) {
        return json({ error: "bad request" }, 400);
      }
      const user = await verifyInitData(env, body.initData);
      if (!user) return json({ error: "unauthorized" }, 401);
      try {
        const dbUser = await getUser(env, user.id);
        if (dbUser && dbUser.is_blocked) return json({ error: "user blocked" }, 403);
        const actionLimit = await checkRateLimit(env, user.id, "api_actions", 12, 10);
        if (!actionLimit.ok) return rateLimited(actionLimit);
        if (url.pathname === "/api/send") {
          const sendLimit = await checkRateLimit(env, user.id, "send", 5, 10);
          if (!sendLimit.ok) return rateLimited(sendLimit);
        }
        return await apiRoute(env, url.pathname, body, user);
      } catch (e) { return json({ error: "server error" }, 500); }
    }

    return new Response("not found", { status: 404 });
  },
};
