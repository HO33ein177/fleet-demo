// app/page.tsx (Server Component can import a Client Component)
import Link from "next/link";
import FleetDashboard from "./FleetDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Gauge, MapPin, Route, ShieldCheck, Users } from "lucide-react";

const FEATURES = [
  {
    title: "برنامه‌ریزی هوشمند مسیر",
    description: "به کمک الگوریتم‌های بهینه‌سازی، بهترین مسیرها را با توجه به ترافیک، محدودیت وزن و هزینه انتخاب کنید.",
    icon: Route,
  },
  {
    title: "پایش سلامت ناوگان",
    description: "وضعیت فنی کامیون‌ها، زمان سرویس و هشدارهای مهم را به‌صورت یکجا زیر نظر داشته باشید.",
    icon: ShieldCheck,
  },
  {
    title: "همکاری با رانندگان",
    description: "اپلیکیشن موبایل راننده، وضعیت مأموریت را لحظه‌ای به‌روزرسانی کرده و ارتباط را ساده می‌کند.",
    icon: Users,
  },
  {
    title: "بهینه‌سازی هزینه",
    description: "سوخت، عوارض، دستمزد و سایر هزینه‌ها را بسنجید و سناریوهای مختلف را با هم مقایسه کنید.",
    icon: Gauge,
  },
];

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl md:block" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 pb-24 pt-12 md:px-6 lg:px-8">
        <header className="flex flex-col gap-6 text-right md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-emerald-300/80">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1">نسخه‌ی نمایشی محصول</span>
              <span className="text-slate-300">پلتفرم مدیریت ناوگان برای شرکت‌های حمل‌ونقل</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-slate-50 md:text-5xl">
              دید کامل به ناوگان خود با داشبورد فارسی Fleet Demo
            </h1>
            <p className="text-lg leading-relaxed text-slate-300 md:max-w-2xl md:text-xl">
              ردیابی مسیر، بهینه‌سازی ظرفیت، کنترل هزینه و هماهنگی با رانندگان را در یک محیط مدرن و ساده تجربه کنید. این نسخه دمو نشان می‌دهد چگونه می‌توان تصمیم‌های بهتر را در کمترین زمان گرفت.
            </p>
            <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-12 rounded-full bg-emerald-500 px-8 text-base font-semibold text-emerald-950 hover:bg-emerald-400"
                asChild
              >
                <Link href="#dashboard">مشاهده داشبورد زنده</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-slate-600/60 bg-transparent px-8 text-base text-slate-200 hover:bg-slate-800/60"
                asChild
              >
                <Link href="#contact">درخواست جلسه مشاوره</Link>
              </Button>
            </div>
          </div>
          <div className="glass-panel w-full max-w-sm self-end rounded-3xl p-5 text-right shadow-ring">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>عملکرد کلی ناوگان</span>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-200">۹۸٪ رضایت</span>
            </div>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1 text-sm text-slate-300">
                  <p>تحویل به‌موقع</p>
                  <p className="text-xl font-semibold text-slate-50">۹۴٪</p>
                </div>
                <Activity className="h-10 w-10 text-emerald-300" />
              </div>
              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.12)] pt-4">
                <div className="space-y-1 text-sm text-slate-300">
                  <p>میانگین مصرف سوخت</p>
                  <p className="text-xl font-semibold text-slate-50">۳۲ L/۱۰۰km</p>
                </div>
                <Gauge className="h-10 w-10 text-sky-300" />
              </div>
              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.12)] pt-4">
                <div className="space-y-1 text-sm text-slate-300">
                  <p>شهرهای فعال امروز</p>
                  <p className="text-xl font-semibold text-slate-50">۱۸ شهر</p>
                </div>
                <MapPin className="h-10 w-10 text-fuchsia-300" />
              </div>
            </div>
          </div>
        </header>

        <section id="features" className="space-y-8 text-right">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">امکانات کلیدی پلتفرم</h2>
            <p className="text-slate-300 md:text-lg">هر آنچه برای مدیریت ناوگان کامیون‌های سنگین نیاز دارید در یک صفحه گردآوری شده است.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {FEATURES.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="border border-[rgba(255,255,255,0.12)] bg-white/5 text-slate-100 backdrop-blur">
                <CardContent className="space-y-3 p-6">
                  <Icon className="h-8 w-8 text-emerald-300" />
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="dashboard" className="space-y-6 text-right">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">دموی تعاملی</span>
              <h2 className="text-3xl font-semibold text-slate-50">داشبورد عملیاتی ناوگان</h2>
              <p className="text-slate-300 md:text-lg">با فیلتر شهر، جستجوی راننده و مشاهده KPI ها، نحوه عملکرد محصول را لمس کنید.</p>
            </div>
            <Button
              variant="outline"
              className="h-11 rounded-full border-slate-600/60 bg-transparent px-5 text-slate-200 hover:bg-slate-800/60"
              asChild
            >
              <Link href="#contact">دریافت نسخه سفارشی</Link>
            </Button>
          </div>
          <div className="rounded-[34px] border border-[rgba(255,255,255,0.12)] bg-white/5 p-2 shadow-ring backdrop-blur-xl">
            <FleetDashboard />
          </div>
        </section>

        <section id="contact" className="glass-panel rounded-[32px] p-8 text-right">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">پرسش دارید؟ با ما در ارتباط باشید</h2>
            <p className="text-slate-300 md:text-lg">
              تیم ما آماده است تا نیازهای خاص ناوگان شما را بررسی کرده و نسخه‌ای مطابق با فرآیندهای داخلی سازمان پیاده‌سازی کند. فرم تماس یا ایمیل info@fleet-demo.com را ارسال کنید.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button size="lg" className="h-12 rounded-full bg-emerald-500 px-8 text-base font-semibold text-emerald-950 hover:bg-emerald-400">
                رزرو جلسه آنلاین
              </Button>
              <Button size="lg" variant="outline" className="h-12 rounded-full border-slate-600/60 bg-transparent px-8 text-base text-slate-200 hover:bg-slate-800/60">
                دانلود بروشور محصول
              </Button>
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.12)] pt-6 text-center text-sm text-slate-500 md:flex-row md:text-right">
          <p>© {new Date().getFullYear()} Fleet Demo — تمامی حقوق محفوظ است.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link href="#features" className="transition hover:text-slate-200">
              امکانات
            </Link>
            <Link href="#dashboard" className="transition hover:text-slate-200">
              داشبورد زنده
            </Link>
            <Link href="#contact" className="transition hover:text-slate-200">
              ارتباط با ما
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
