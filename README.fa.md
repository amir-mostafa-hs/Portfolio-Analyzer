# تحلیلگر پورتفولیو (Portfolio Analyzer)

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![N8N](https://img.shields.io/badge/N8N-Workflow-orange?logo=n8n)](https://n8n.io/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?logo=vite)](https://vitejs.dev/)

این پروژه یک نسخه تمرینی و MVP برای یک پلتفرم آنالیز سبد ارز دیجیتال است. با استفاده از این پلتفرم شما می‌توانید با وصل شدن به والت خود تمام دارایی‌های موجود در آن را روی شبکه BSC به صورت خودکار دریافت کرده و ارزش کلی آن را به دلار ببینید و یک آنالیز با کمک AI دریافت کنید.

**لینک نسخه دمو:** **[https://portfolio-analyzer-0gik.onrender.com](https://portfolio-analyzer-0gik.onrender.com)**

## تصاویر پروژه

|                                صفحه اصلی                                 |                                     صفحه پورتفولیو                                      |
| :----------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| ![_[Home Page Screenshot]_](Frontend/public/screencapture-home-page.png) |   ![_[Portfolio Page Screenshot]_](Frontend/public/screencapture-portfolio-page.png)    |
|                                                                          | [Portfolio Full Page Screenshot](Frontend/public/screencapture-portfolio-full-page.png) |

## توضیحات پروژه

این پروژه یک نسخه اولیه (MVP) از یک پلتفرم تحلیلگر سبد ارز دیجیتال است. با اتصال به کیف پول خود، می‌توانید به صورت خودکار تمام دارایی‌های خود را روی **شبکه BSC** دریافت کرده و ارزش کل آن‌ها را به دلار مشاهده کنید. این پلتفرم همچنین درصد و مقدار دلاری رشد یا کاهش دارایی‌های شما در ۲۴ ساعت گذشته را نمایش می‌دهد. برای اطمینان از دقت محاسبات، اپلیکیشن به صورت خودکار توکن‌هایی که احتمال اسپم بودن دارند یا از نظر امنیتی امتیاز پایینی دارند را فیلتر می‌کند.

در داشبورد، دو بخش با استفاده از API سایت CoinGecko پیاده‌سازی شده است: نمایش ۱۰ ارزی که بیشترین رشد قیمت را در یک ساعت اخیر داشته‌اند و ۱۰ ارزی که بیشترین کاهش را تجربه کرده‌اند.

ویژگی اصلی این پلتفرم، تحلیل مبتنی بر هوش مصنوعی است. بر اساس دارایی‌های معتبر شما، اطلاعات به یک **AI Agent در N8N** ارسال می‌شود. این ایجنت یک تحلیل جامع از پورتفولیوی شما به همراه پیشنهاداتی ارائه می‌دهد. این تحلیل با کمک مدل **Gemini 2.0 Flash Lite** و بر اساس قیمت دارایی‌های شما و آخرین اخبار از CoinDesk و CryptoPanic تولید می‌شود.

علاوه بر این، بخشی برای نمایش تمام دارایی‌های شما (چه معتبر و چه غیر معتبر) و همچنین ۱۰ تراکنش آخر شما در نظر گرفته شده است.

## ویژگی‌های کلیدی

- **اتصال به کیف پول Web3**: اتصال آسان و امن با استفاده از Rainbow Appkit.
- **تمرکز بر شبکه BSC**: نسخه اولیه پروژه بر روی شبکه هوشمند بایننس متمرکز است.
- **دریافت دارایی‌ها و تراکنش‌ها**: دریافت اطلاعات دارایی‌ها و تاریخچه تراکنش‌های کاربر با استفاده از Moralis API.
- **دریافت قیمت و داده‌های بازار**: دریافت قیمت لحظه‌ای و تغییرات ۲۴ ساعته از CoinGecko API.
- **تحلیل پورتفولیو با هوش مصنوعی**: استفاده از بک‌اند N8N و مدل Gemini 2.0 برای تحلیل سبد کاربر بر اساس داده‌های بازار از CoinDesk و CryptoPanic.
- **فیلتر کردن توکن‌های اسپم**: شناسایی و حذف خودکار توکن‌های اسپم از محاسبات اصلی.
- **نمایش پرنوسان‌ترین ارزها**: نمایش ۱۰ ارز با بیشترین رشد و کاهش ساعتی از CoinGecko.

## تکنولوژی‌های استفاده شده

- **فرانت‌اند**: React.js, TypeScript, Vite, React Router, Framer Motion, Shadcn UI
- **طراحی اولیه UI**: lovable.dev
- **بک‌اند / ورک‌فلو**: N8N
- **APIهای خارجی**: Moralis API, CoinGecko API, CoinDesk API, CryptoPanic API, Google AI (Gemini)

## مراحل نصب و راه‌اندازی

برای اجرای پروژه به صورت محلی، مراحل زیر را دنبال کنید:

```bash
git clone https://github.com/amir-mostafa-hs/Portfolio-Analyzer.git
```

### برای فرانت‌اند:

1.  وارد پوشه `Frontend` شوید:
    ```bash
    cd Frontend
    ```
2.  بسته‌ها را با استفاده از pnpm نصب کنید:
    ```bash
    pnpm install
    ```
3.  یک فایل `.env` محلی از روی فایل نمونه بسازید:
    ```bash
    cp .env.example .env
    ```
4.  فایل `.env` را باز کرده و اطلاعات مورد نیاز (کلیدهای API و...) را وارد کنید.
5.  سرور توسعه را اجرا کنید:
    ```bash
    pnpm dev
    ```
6.  اپلیکیشن فرانت‌اند روی آدرس `http://localhost:8080` در دسترس خواهد بود.

### برای بک‌اند (N8N):

1.  وارد پوشه `Backend` شوید:
    ```bash
    cd Backend
    ```
2.  قبل از شروع، می‌توانید آخرین ایمیج n8n را دریافت کنید:
    ```bash
    docker pull n8nio/n8n:latest
    ```
3.  سرویس n8n را با استفاده از Docker Compose اجرا کنید:
    ```bash
    docker-compose up -d
    ```
4.  آدرس `http://localhost:5678/` را در مرورگر خود باز کرده و یک حساب کاربری ادمین برای n8n بسازید.
5.  یک ورک‌فلو جدید و خالی ایجاد کنید.
6.  از منوی بالا سمت راست، گزینه "Import from File" را انتخاب کنید.
7.  فایل `Portfolio_Analyzer.json` موجود در پوشه `Backend` را برای ساخت AI Agent انتخاب و وارد کنید.
8.  **مهم**: در محیط کاربری n8n، باید برای Webhook، CryptoPanic API و Gemini API، بخش احراز هویت (Credentials) را ایجاد و تنظیم کنید تا ورک‌فلو به درستی کار کند.
9.  آدرس API یا همان Webhook شما به این شکل خواهد بود: `http://localhost:5678/webhook-test/<your-random-uuid>`

## نحوه استقرار (دپلوی)

این پروژه را می‌توان با استفاده از پلن رایگان وب‌سایت [Render.com](http.render.com) مستقر کرد.

- **فرانت‌اند**: به عنوان یک **Static Site** دپلوی کنید. دستور build و پوشه publish را بر اساس تنظیمات Vite خود مشخص کنید.
- **بک‌اند (N8N)**: به عنوان یک **Web Service** و با استفاده از قابلیت **Existing Image** دپلوی کنید. از ایمیج رسمی `n8nio/n8n` موجود در Docker Hub استفاده نمایید.

**نکته بسیار مهم در مورد پلن رایگان Render:**
سرویس‌های رایگان Render پس از ۱۵ دقیقه عدم فعالیت، خاموش (spin down) می‌شوند. برای n8n، این به معنای از دست رفتن ورک‌فلوها و تنظیمات ذخیره شده است. برای جلوگیری از این مشکل، دو راه‌حل وجود دارد:

1.  **Cron Job**: یک سرویس رایگان cron-job (مانند [cron-job.org](http://cron-job.org)) تنظیم کنید تا هر ۵ الی ۱۰ دقیقه یک درخواست به سرویس n8n شما ارسال کرده و آن را فعال نگه دارد.
2.  **دیتابیس پایدار**: برای یک راه‌حل مطمئن‌تر، یک سرویس دیتابیس PostgreSQL در Render ایجاد کرده و سرویس n8n خود را برای استفاده از آن تنظیم کنید. این کار نیازمند اضافه کردن متغیرهای محیطی مربوط به دیتابیس به تنظیمات سرویس n8n شماست.

## نحوه استفاده

1.  برای استفاده از اپلیکیشن، شما باید یک کیف پول ارز دیجیتال (مانند MetaMask یا Trust Wallet) با دارایی‌هایی بر بستر **شبکه BSC** داشته باشید.
2.  پس از ورود به اپلیکیشن، روی دکمه **"Connect Wallet"** کلیک کنید.
3.  کیف پول مورد نظر خود را از لیستی که Rainbow Appkit نمایش می‌دهد، انتخاب کنید.
4.  پس از اتصال موفق، به صفحه **Portfolio** منتقل می‌شوید و در آنجا می‌توانید اطلاعات دارایی‌ها و تحلیل هوش مصنوعی سبد خود را مشاهده کنید.
