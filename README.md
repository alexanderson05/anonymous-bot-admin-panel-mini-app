# Anonymous Bot + Admin Panel + Mini App

**Language / زبان:** [English](#english) · [فارسی](#فارسی)

---

## English

A Telegram anonymous-message bot running on **Cloudflare Workers** with a **D1** database and a **Mini App** (inbox, chats, media, saved messages, themes, English/Persian UI). It includes a button-based **admin panel** with granular permissions, broadcasts, support tickets and a read-only monitor for the main admin.

### Screenshots

| Mini App settings | Bot admin panel |
|---|---|
| ![Mini App settings](screenshots/mini-app-settings.png) | ![Admin panel](screenshots/admin-panel.png) |

### Features
- Personal anonymous link per user (one link each), with a custom intro message.
- Two-way anonymous chats: owner replies from the Mini App, the sender sees replies in the bot.
- Text, photo, video, voice, audio and file messages in both directions.
- "Seen" notifications for senders.
- Saved and pinned messages, theme and avatar settings, English/Persian UI.
- Admin panel (`/admin`):
  - Users with ban/unban and numeric IDs
  - Link pause/resume
  - Identity-reveal permission (grant/revoke)
  - Broadcasts (queued and sent in batches)
  - Support tickets
  - Admin management with per-permission toggles
  - Purge all messages (main admin, with confirmation)
- Identity reveal is off by default. It is granted only by an admin, directly or by approving a ticket. Every reveal is logged.
- The main admin can monitor chats read-only. Monitoring never marks messages as seen.
- Rate limiting for bot messages, API calls and file uploads.
- 20-day retention for conversation records, with a reminder before deletion.

### Requirements
- A Cloudflare account (Workers and D1 work on the free plan).
- A Telegram bot token from @BotFather.

### Setup
1. **Create the D1 database**: Cloudflare dashboard → Storage & Databases → D1 → create `anon-bot-db`.
2. **Create the Worker**: Workers & Pages → Create Worker → name it `anon-bot`. Replace the code of `worker.js` with the file in this repository.
3. **Bind the database**: Worker → Settings → Bindings → D1 database, variable name `DB`, database `anon-bot-db`.
4. **Set variables and secrets** (Settings → Variables and Secrets):
   - `BOT_TOKEN` (Secret): token from @BotFather.
   - `WEBHOOK_SECRET` (Secret): a long random string you choose.
   - `ADMIN_ID`: the main admin's numeric Telegram ID.
   - `BOT_USERNAME`: bot username without `@`.
   - `MINIAPP_URL`: `https://<worker-name>.<subdomain>.workers.dev/app`.
   - `DEFAULT_LANG`: `en` or `fa`.
5. **Cron triggers** (Settings → Triggers → Cron Triggers):
   - `0 3 * * *` for the daily retention cleanup.
   - `* * * * *` for the broadcast queue.
6. **Deploy**, then register the webhook (replace the placeholders):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<worker-url>/webhook&secret_token=<WEBHOOK_SECRET>
   ```
   You should see `"ok":true`.
7. In Telegram, send `/start` to the bot, then `/admin`.

### Database
Helper tables (`alex_anon_*`) are created automatically on first use. The core tables `users`, `links`, `threads` and `messages` must exist before the first run. Create them with your initial SQL if you start from an empty database.

### Security notes
- Mini App requests are verified with Telegram's `initData` HMAC.
- Webhook requests are checked with `WEBHOOK_SECRET`.
- Never commit tokens or secrets. Keep this repository private.
- If a token was ever shared, revoke it with `/revoke` in @BotFather and use the new one.

### Credits
Made by **alex anderson**.

---

## فارسی

یک ربات پیام ناشناس تلگرام که روی **Cloudflare Workers** و دیتابیس **D1** اجرا می‌شود و یک **مینی‌اپ** کامل دارد (صندوق ورودی، گفتگوها، رسانه، پیام‌های ذخیره‌شده، قالب رنگی، رابط فارسی و انگلیسی). همچنین یک **پنل ادمین** دکمه‌ای با دسترسی‌های جزئی، ارسال همگانی، تیکت پشتیبانی و نظارت فقط‌خواندنی برای ادمین اصلی دارد.

### تصاویر

| تنظیمات مینی‌اپ | پنل ادمین در ربات |
|---|---|
| ![تنظیمات مینی‌اپ](screenshots/mini-app-settings.png) | ![پنل ادمین](screenshots/admin-panel.png) |

### امکانات
- لینک ناشناس شخصی برای هر کاربر (فقط یک لینک) با متن معرفی دلخواه.
- گفتگوی دوطرفه ناشناس: صاحب لینک از مینی‌اپ پاسخ می‌دهد و فرستنده پاسخ را در ربات می‌بیند.
- ارسال و دریافت متن، عکس، ویدیو، ویس، موزیک و فایل در هر دو جهت.
- اعلان «دیده شد» برای فرستنده.
- پیام‌های ذخیره‌شده و سنجاق‌شده، تنظیم قالب رنگی و آواتار، رابط فارسی و انگلیسی.
- پنل ادمین (`/admin`):
  - کاربران با شناسه عددی و قابلیت بن و آن‌بن
  - توقف و فعال‌سازی لینک
  - دسترسی افشای هویت (اعطا و لغو)
  - ارسال همگانی با صف و ارسال دسته‌ای
  - تیکت‌های پشتیبانی
  - مدیریت ادمین‌ها با دسترسی‌های قابل تغییر
  - پاک‌سازی همه پیام‌ها (فقط ادمین اصلی، با تأیید)
- افشای هویت به‌صورت پیش‌فرض بسته است و فقط ادمین آن را می‌دهد (مستقیم یا با تأیید تیکت). هر افشا ثبت می‌شود.
- ادمین اصلی می‌تواند گفتگوها را فقط‌خواندنی ببیند. این نظارت پیام‌ها را «دیده شده» نمی‌کند.
- محدودیت نرخ برای پیام‌های ربات، درخواست‌های API و آپلود فایل.
- نگهداری اطلاعات گفتگو تا ۲۰ روز، همراه با اعلان قبل از حذف.

### نیازمندی‌ها
- حساب Cloudflare (Workers و D1 در پلن رایگان کار می‌کنند).
- توکن ربات از @BotFather.

### راه‌اندازی
1. **ساخت دیتابیس D1**: داشبورد Cloudflare → Storage & Databases → D1 → ساخت `anon-bot-db`.
2. **ساخت Worker**: Workers & Pages → Create Worker → نام `anon-bot`. محتوای `worker.js` را با فایل این ریپازیتوری جایگزین کنید.
3. **اتصال دیتابیس**: Worker → Settings → Bindings → D1 database با نام متغیر `DB` و دیتابیس `anon-bot-db`.
4. **متغیرها و سکرت‌ها** (Settings → Variables and Secrets):
   - `BOT_TOKEN` (Secret): توکن از @BotFather.
   - `WEBHOOK_SECRET` (Secret): یک رشته تصادفی بلند که خودتان می‌سازید.
   - `ADMIN_ID`: آیدی عددی ادمین اصلی.
   - `BOT_USERNAME`: یوزرنیم ربات بدون `@`.
   - `MINIAPP_URL`: `https://<نام-worker>.<subdomain>.workers.dev/app`.
   - `DEFAULT_LANG`: `en` یا `fa`.
5. **تریگر Cron** (Settings → Triggers → Cron Triggers):
   - `0 3 * * *` برای پاک‌سازی روزانه.
   - `* * * * *` برای صف ارسال همگانی.
6. **Deploy** و سپس ثبت وبهوک (جای‌نگهدارها را پر کنید):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<worker-url>/webhook&secret_token=<WEBHOOK_SECRET>
   ```
   باید `"ok":true` ببینید.
7. در تلگرام به ربات `/start` و سپس `/admin` بفرستید.

### دیتابیس
جدول‌های کمکی (`alex_anon_*`) هنگام اولین استفاده خودکار ساخته می‌شوند. جدول‌های اصلی `users`، `links`، `threads` و `messages` باید قبل از اولین اجرا وجود داشته باشند. اگر از دیتابیس خالی شروع می‌کنید، آن‌ها را با SQL راه‌اندازی اولیه بسازید.

### نکات امنیتی
- درخواست‌های مینی‌اپ با امضای HMAC و `initData` تلگرام بررسی می‌شوند.
- درخواست‌های وبهوک با `WEBHOOK_SECRET` بررسی می‌شوند.
- توکن و سکرت را هرگز در ریپازیتوری نگذارید و ریپو را خصوصی نگه دارید.
- اگر توکنی جایی فاش شد، با `/revoke` در @BotFather باطل کنید و توکن جدید بگیرید.

### سازنده
ساخته‌شده توسط **alex anderson**.
