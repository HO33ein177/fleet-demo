"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MapPin, Truck, Fuel, Wrench, Gauge, Activity, Clock, Navigation, Search, AlertTriangle, CheckCircle2, Settings, Smartphone, DollarSign, PackageSearch } from "lucide-react";

// --- Mock Data ---
const TRUCKS = Array.from({ length: 10 }).map((_, i) => ({
  id: `TRK-${100 + i}`,
  driver: [
    "حسین رضایی",
    "مهدی احمدی",
    "سارا موسوی",
    "رضا کاظمی",
    "الهام کریمی",
    "نیما اسدی",
    "علی سلطانی",
    "محمد قاسمی",
    "نازنین رفیعی",
    "پوریا اعتماد"
  ][i],
  status: ["آماده", "در مسیر", "در حال بارگیری", "نیاز به سرویس"][i % 4],
  from: ["تهران", "اصفهان", "تبریز", "مشهد", "کرج"][i % 5],
  to: ["شیراز", "اهواز", "قم", "رشت", "یزد"][i % 5],
  etaHours: [6, 12, 4, 20, 8, 5, 7, 10, 14, 9][i],
  fuel: 30 + (i * 6) % 65, // %
  loadFactor: 55 + (i * 9) % 45, // %
  speed: 50 + (i * 3) % 40, // km/h
  emptyKm: 10 + (i * 5) % 35, // %
  lastServiceKm: 7000 + (i * 350) % 9000, // since service
}));

// Rough city-to-city distance (km) mock
const DIST: Record<string, Record<string, number>> = {
  "تهران": { "شیراز": 920, "اهواز": 820, "قم": 150, "رشت": 330, "یزد": 620 },
  "اصفهان": { "شیراز": 480, "اهواز": 540, "قم": 300, "رشت": 850, "یزد": 330 },
  "تبریز": { "شیراز": 1400, "اهواز": 1100, "قم": 640, "رشت": 310, "یزد": 1150 },
  "مشهد": { "شیراز": 1600, "اهواز": 1650, "قم": 900, "رشت": 1450, "یزد": 950 },
  "کرج": { "شیراز": 930, "اهواز": 830, "قم": 120, "رشت": 300, "یزد": 600 },
};

const STATUS_COLORS: Record<string, string> = {
  "آماده": "bg-emerald-100 text-emerald-700",
  "در مسیر": "bg-blue-100 text-blue-700",
  "در حال بارگیری": "bg-amber-100 text-amber-800",
  "نیاز به سرویس": "bg-rose-100 text-rose-700",
};

const kpi = (trucks: typeof TRUCKS) => {
  const onTime = Math.round(95 - (trucks.filter(t => t.status === "نیاز به سرویس").length * 1.5));
  const emptyKm = Math.round(trucks.reduce((s, t) => s + t.emptyKm, 0) / trucks.length);
  const avgFuel = Math.round(trucks.reduce((s, t) => s + t.fuel, 0) / trucks.length);
  const load = Math.round(trucks.reduce((s, t) => s + t.loadFactor, 0) / trucks.length);
  return { onTime, emptyKm, avgFuel, load };
};

export default function FleetDashboard() {
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);
  const [ecoMode, setEcoMode] = useState(true);
  const [selected, setSelected] = useState<typeof TRUCKS[0] | null>(null);

  const filtered = useMemo(() => {
    return TRUCKS.filter(t =>
      (!cityFilter || t.from === cityFilter || t.to === cityFilter) &&
      (t.id.includes(query) || t.driver.includes(query) || t.from.includes(query) || t.to.includes(query))
    );
  }, [query, cityFilter]);

  const metrics = useMemo(() => kpi(filtered), [filtered]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">داشبورد مدیریت ناوگان (۱۰ کامیون)</h1>
            <p className="text-slate-600 mt-1">بهینه‌سازی مسیر، سوخت، ظرفیت و سرویس — نسخه دمو</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-slate-700">اکو-مود</Label>
              <Switch checked={ecoMode} onCheckedChange={setEcoMode} />
            </div>
            <Button variant="outline" className="gap-2"><Settings className="h-4 w-4"/>تنظیمات</Button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-500">تحویل به‌موقع</p>
                  <h3 className="text-2xl font-semibold flex items-center gap-2"><CheckCircle2 className="h-5 w-5"/> {metrics.onTime}%</h3>
                </div>
                <div className="w-24"><Progress value={metrics.onTime} /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-500">کیلومتر خالی</p>
                  <h3 className="text-2xl font-semibold flex items-center gap-2"><Navigation className="h-5 w-5"/> {metrics.emptyKm}%</h3>
                </div>
                <div className="w-24"><Progress value={metrics.emptyKm} /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-500">میانگین سوخت</p>
                  <h3 className="text-2xl font-semibold flex items-center gap-2"><Fuel className="h-5 w-5"/> {metrics.avgFuel}%</h3>
                </div>
                <div className="w-24"><Progress value={metrics.avgFuel} /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-500">میانگین پرشدگی بار</p>
                  <h3 className="text-2xl font-semibold flex items-center gap-2"><Gauge className="h-5 w-5"/> {metrics.load}%</h3>
                </div>
                <div className="w-24"><Progress value={metrics.load} /></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="جستجوی کامیون، راننده یا شهر" value={query} onChange={e => setQuery(e.target.value)} className="pr-9" />
          </div>
          <Select onValueChange={setCityFilter}>
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="فیلتر شهر" />
            </SelectTrigger>
            <SelectContent>
              {["تهران","اصفهان","تبریز","مشهد","کرج","شیراز","اهواز","قم","رشت","یزد"].map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2"><Navigation className="h-4 w-4"/> تخصیص مسیر جدید</Button>
            </DialogTrigger>
            <AssignRouteModal />
          </Dialog>
        </div>

        <Tabs defaultValue="fleet">
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="fleet" className="gap-2"><Truck className="h-4 w-4"/> ناوگان</TabsTrigger>
            <TabsTrigger value="map" className="gap-2"><MapPin className="h-4 w-4"/> نقشه</TabsTrigger>
            <TabsTrigger value="driver" className="gap-2"><Smartphone className="h-4 w-4"/> اپ راننده</TabsTrigger>
            <TabsTrigger value="cost" className="gap-2"><DollarSign className="h-4 w-4"/> هزینه سفر</TabsTrigger>
            <TabsTrigger value="backhaul" className="gap-2"><PackageSearch className="h-4 w-4"/> بار برگشتی</TabsTrigger>
          </TabsList>

          {/* Fleet Table */}
          <TabsContent value="fleet" className="mt-4">
            <Card className="shadow-sm">
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-3">کد</th>
                      <th className="p-3">راننده</th>
                      <th className="p-3">مبدأ → مقصد</th>
                      <th className="p-3">وضعیت</th>
                      <th className="p-3">ETA</th>
                      <th className="p-3">سوخت</th>
                      <th className="p-3">پرشدگی</th>
                      <th className="p-3">Km خالی</th>
                      <th className="p-3">از سرویس (km)</th>
                      <th className="p-3">اقدام</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(t => (
                      <tr key={t.id} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{t.id}</td>
                        <td className="p-3">{t.driver}</td>
                        <td className="p-3">{t.from} → {t.to}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${STATUS_COLORS[t.status]}`}>{t.status}</span>
                        </td>
                        <td className="p-3 flex items-center gap-1"><Clock className="h-4 w-4"/> {t.etaHours}h</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2"><Fuel className="h-4 w-4"/>{t.fuel}%</div>
                          <Progress className="mt-1" value={t.fuel} />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2"><Gauge className="h-4 w-4"/>{t.loadFactor}%</div>
                          <Progress className="mt-1" value={t.loadFactor} />
                        </td>
                        <td className="p-3">{t.emptyKm}%</td>
                        <td className="p-3">{t.lastServiceKm.toLocaleString()}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelected(t)}>جزئیات</Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="gap-1"><DollarSign className="h-4 w-4"/> هزینه</Button>
                              </DialogTrigger>
                              <CostModal preset={t} />
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="gap-1"><Navigation className="h-4 w-4"/> مسیر</Button>
                              </DialogTrigger>
                              <AssignRouteModal presetTruck={t.id} />
                            </Dialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {selected && (
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <Card className="shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Truck className="h-5 w-5"/> {selected.id} — {selected.driver}</h3>
                    <p className="text-slate-600 flex items-center gap-2"><MapPin className="h-4 w-4"/> مسیر فعلی: {selected.from} → {selected.to}</p>
                    <div className="flex items-center gap-2 text-slate-600"><Clock className="h-4 w-4"/> ETA: {selected.etaHours}h</div>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <MiniStat label="سوخت" value={`${selected.fuel}%`} icon={<Fuel className="h-4 w-4"/>} />
                      <MiniStat label="پرشدگی" value={`${selected.loadFactor}%`} icon={<Gauge className="h-4 w-4"/>} />
                      <MiniStat label="Km خالی" value={`${selected.emptyKm}%`} icon={<Navigation className="h-4 w-4"/>} />
                    </div>
                    <div className="mt-3">
                      <Label>هشدارها</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selected.fuel < 35 && <Badge variant="secondary" className="gap-1"><AlertTriangle className="h-3 w-3"/> سوخت پایین</Badge>}
                        {selected.lastServiceKm > 12000 && <Badge variant="destructive" className="gap-1"><Wrench className="h-3 w-3"/> زمان سرویس</Badge>}
                        {selected.emptyKm > 25 && <Badge className="bg-amber-200 text-amber-800 gap-1"><Activity className="h-3 w-3"/> Km خالی بالا</Badge>}
                        {selected.fuel >= 35 && selected.lastServiceKm <= 12000 && selected.emptyKm <= 25 && (
                          <Badge className="gap-1"><CheckCircle2 className="h-3 w-3"/> وضعیت نرمال</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm md:col-span-2">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">نقشه مسیر (نمایش نمونه)</h3>
                    <div className="rounded-2xl border border-dashed border-slate-300 h-64 grid place-items-center bg-white">
                      <div className="text-slate-500 flex flex-col items-center">
                        <MapPin className="h-6 w-6 mb-2"/>
                        <p>اینجا می‌توانید نقشه واقعی (Google/OSM) را متصل کنید</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="mt-4">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">نقشه زنده ناوگان (دمو)</h3>
                  <div className="text-sm text-slate-500">نشانگرها رنگ‌بندی وضعیت را دنبال می‌کنند</div>
                </div>
                <div className="rounded-2xl border border-dashed border-slate-300 h-96 grid place-items-center bg-white">
                  <div className="text-slate-500 text-center">
                    <MapPin className="h-6 w-6 mb-2 mx-auto"/>
                    <p>این بخش به‌سادگی با هر SDK نقشه (OSM/Mapbox/رهنما) قابل اتصال است.</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(STATUS_COLORS).map(([label, cls]) => (
                    <span key={label} className={`px-3 py-1 rounded-full text-xs ${cls}`}>{label}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Driver App Tab */}
          <TabsContent value="driver" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2"><Smartphone className="h-5 w-5"/> اپ راننده — صفحه مأموریت</h3>
                  <div className="rounded-2xl border p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">کامیون</p>
                        <p className="font-semibold">TRK-103</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">در مسیر</Badge>
                    </div>
                    <div className="mt-3 text-sm">
                      <p>مسیر: تهران → شیراز</p>
                      <p>محل بارگیری: شهرک صنعتی شمس‌آباد</p>
                      <p>ETA: 8h</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <MiniStat label="سرعت" value="76 km/h" icon={<Activity className="h-4 w-4"/>} />
                      <MiniStat label="سوخت" value="58%" icon={<Fuel className="h-4 w-4"/>} />
                      <MiniStat label="پرشدگی" value="92%" icon={<Gauge className="h-4 w-4"/>} />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1">شروع/پایان مأموریت</Button>
                      <Button variant="outline" className="flex-1">گزارش توقف</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2"><Wrench className="h-5 w-5"/> اپ راننده — گزارش خرابی</h3>
                  <div className="rounded-2xl border p-4 bg-white space-y-3">
                    <Label>نوع مشکل</Label>
                    <Select>
                      <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب مشکل"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tire">لاستیک</SelectItem>
                        <SelectItem value="engine">موتور</SelectItem>
                        <SelectItem value="brake">ترمز</SelectItem>
                        <SelectItem value="electrical">برق</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label>توضیحات</Label>
                    <Input placeholder="توضیح مختصر راننده" />
                    <div className="flex gap-2">
                      <Button className="flex-1">ارسال گزارش</Button>
                      <Button variant="outline" className="flex-1">تماس با پشتیبانی</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cost Calculator Tab */}
          <TabsContent value="cost" className="mt-4">
            <CostCalculator />
          </TabsContent>

          {/* Backhaul Finder Tab */}
          <TabsContent value="backhaul" className="mt-4">
            <BackhaulFinder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-slate-50 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="flex items-center gap-2 mt-1">
        {icon}
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function AssignRouteModal({ presetTruck }: { presetTruck?: string }) {
  const [truck, setTruck] = useState<string | undefined>(presetTruck);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [to, setTo] = useState<string | undefined>(undefined);
  const [time, setTime] = useState("08:00");

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>تخصیص مسیر جدید</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-2">
        <div className="grid grid-cols-4 items-center gap-3">
          <Label className="text-right">کامیون</Label>
          <div className="col-span-3">
            <Select value={truck} onValueChange={setTruck}>
              <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب کامیون"/></SelectTrigger>
              <SelectContent>
                {TRUCKS.map(t => <SelectItem key={t.id} value={t.id}>{t.id} — {t.driver}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-3">
          <Label className="text-right">مبدأ</Label>
          <div className="col-span-3">
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب شهر"/></SelectTrigger>
              <SelectContent>
                {["تهران","اصفهان","تبریز","مشهد","کرج"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-3">
          <Label className="text-right">مقصد</Label>
          <div className="col-span-3">
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب شهر"/></SelectTrigger>
              <SelectContent>
                {["شیراز","اهواز","قم","رشت","یزد"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-3">
          <Label className="text-right">ساعت حرکت</Label>
          <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="col-span-3"/>
        </div>
      </div>
      <DialogFooter>
        <Button className="w-full">ثبت مسیر</Button>
      </DialogFooter>
    </DialogContent>
  );
}

// ------------------ Cost Calculator ------------------
function CostCalculator() {
  const [truckId, setTruckId] = useState<string | undefined>(TRUCKS[0]?.id);
  const truck = TRUCKS.find(t => t.id === truckId) || TRUCKS[0];

  const [from, setFrom] = useState(truck.from);
  const [to, setTo] = useState(truck.to);
  const [distance, setDistance] = useState(() => DIST[from]?.[to] ?? 500);

  const [fuelPrice, setFuelPrice] = useState(15000); // تومان / لیتر (نمونه)
  const [consumption, setConsumption] = useState(32); // لیتر در 100km
  const [toll, setToll] = useState(200000); // عوارض کل راه
  const [wage, setWage] = useState(1200000); // دستمزد راننده برای سفر
  const [other, setOther] = useState(300000); // سایر هزینه ها

  const liters = useMemo(() => (distance * consumption) / 100, [distance, consumption]);
  const fuelCost = useMemo(() => Math.round(liters * fuelPrice), [liters, fuelPrice]);
  const total = useMemo(() => fuelCost + toll + wage + other, [fuelCost, toll, wage, other]);
  const cpk = useMemo(() => (distance ? Math.round(total / distance) : 0), [total, distance]);

  const updateDist = (f: string, t: string) => setDistance(DIST[f]?.[t] ?? distance);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2"><DollarSign className="h-5 w-5"/> محاسبه هزینه سفر</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <Label>کامیون</Label>
            <Select value={truckId} onValueChange={(v) => { setTruckId(v); }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب"/></SelectTrigger>
              <SelectContent>
                {TRUCKS.map(t => <SelectItem key={t.id} value={t.id}>{t.id} — {t.driver}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>مبدأ</Label>
            <Select value={from} onValueChange={(v) => { setFrom(v); updateDist(v, to); }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب"/></SelectTrigger>
              <SelectContent>
                {Object.keys(DIST).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>مقصد</Label>
            <Select value={to} onValueChange={(v) => { setTo(v); updateDist(from, v); }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب"/></SelectTrigger>
              <SelectContent>
                {Object.keys(DIST[from] || {}).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-3">
          <div>
            <Label>مسافت (km)</Label>
            <Input type="number" value={distance} onChange={e => setDistance(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label>مصرف (L/100km)</Label>
            <Input type="number" value={consumption} onChange={e => setConsumption(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label>قیمت سوخت (تومان/لیتر)</Label>
            <Input type="number" value={fuelPrice} onChange={e => setFuelPrice(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label>عوارض (تومان)</Label>
            <Input type="number" value={toll} onChange={e => setToll(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label>دستمزد (تومان)</Label>
            <Input type="number" value={wage} onChange={e => setWage(Number(e.target.value) || 0)} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <Label>سایر هزینه‌ها (تومان)</Label>
            <Input type="number" value={other} onChange={e => setOther(Number(e.target.value) || 0)} />
          </div>
          <div className="rounded-xl border p-3 bg-white">
            <div className="text-xs text-slate-500">حجم سوخت (لیتر)</div>
            <div className="font-semibold mt-1">{Math.round(liters).toLocaleString()}</div>
          </div>
          <div className="rounded-xl border p-3 bg-white">
            <div className="text-xs text-slate-500">هزینه سوخت (تومان)</div>
            <div className="font-semibold mt-1">{fuelCost.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Card className="border-dashed">
            <CardContent className="p-4">
              <div className="text-slate-500">هزینه کل سفر</div>
              <div className="text-2xl font-bold mt-1">{total.toLocaleString()} تومان</div>
            </CardContent>
          </Card>
          <Card className="border-dashed">
            <CardContent className="p-4">
              <div className="text-slate-500">Cost per KM</div>
              <div className="text-2xl font-bold mt-1">{cpk.toLocaleString()} تومان</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

function CostModal({ preset }: { preset: typeof TRUCKS[0] }) {
  const [open, setOpen] = useState(true);
  // We reuse calculator UI but prefill from preset
  const from = preset.from, to = preset.to;
  const baseDist = DIST[from]?.[to] ?? 500;
  const [distance, setDistance] = useState(baseDist);
  const [fuelPrice, setFuelPrice] = useState(15000);
  const [consumption, setConsumption] = useState(32);
  const [toll, setToll] = useState(200000);
  const [wage, setWage] = useState(1200000);
  const [other, setOther] = useState(300000);

  const liters = (distance * consumption) / 100;
  const fuelCost = Math.round(liters * fuelPrice);
  const total = fuelCost + toll + wage + other;
  const cpk = distance ? Math.round(total / distance) : 0;

  return (
    <DialogContent className="sm:max-w-[560px]">
      <DialogHeader>
        <DialogTitle>هزینه سفر — {preset.id} ({from} → {to})</DialogTitle>
      </DialogHeader>
      <div className="grid md:grid-cols-2 gap-3 py-2">
        <div>
          <Label>مسافت (km)</Label>
          <Input type="number" value={distance} onChange={e => setDistance(Number(e.target.value) || 0)} />
        </div>
        <div>
          <Label>مصرف (L/100km)</Label>
          <Input type="number" value={consumption} onChange={e => setConsumption(Number(e.target.value) || 0)} />
        </div>
        <div>
          <Label>قیمت سوخت</Label>
          <Input type="number" value={fuelPrice} onChange={e => setFuelPrice(Number(e.target.value) || 0)} />
        </div>
        <div>
          <Label>عوارض</Label>
          <Input type="number" value={toll} onChange={e => setToll(Number(e.target.value) || 0)} />
        </div>
        <div>
          <Label>دستمزد</Label>
          <Input type="number" value={wage} onChange={e => setWage(Number(e.target.value) || 0)} />
        </div>
        <div>
          <Label>سایر</Label>
          <Input type="number" value={other} onChange={e => setOther(Number(e.target.value) || 0)} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <Card className="border-dashed"><CardContent className="p-4"><div className="text-slate-500">هزینه کل</div><div className="text-2xl font-bold">{total.toLocaleString()} تومان</div></CardContent></Card>
        <Card className="border-dashed"><CardContent className="p-4"><div className="text-slate-500">Cost per KM</div><div className="text-2xl font-bold">{cpk.toLocaleString()} تومان</div></CardContent></Card>
      </div>
      <DialogFooter>
        <Button className="w-full">ذخیره گزارش</Button>
      </DialogFooter>
    </DialogContent>
  );
}

// ------------------ Backhaul Finder ------------------
const MOCK_BACKHAUL = [
  { id: "BH-901", from: "شیراز", to: "تهران", distance: 920, weightT: 8, ratePerKm: 12000, goods: "کاشی و سرامیک" },
  { id: "BH-902", from: "اهواز", to: "اصفهان", distance: 540, weightT: 10, ratePerKm: 15000, goods: "فولاد" },
  { id: "BH-903", from: "قم", to: "تبریز", distance: 640, weightT: 7, ratePerKm: 11000, goods: "لوازم خانگی" },
  { id: "BH-904", from: "رشت", to: "کرج", distance: 300, weightT: 6, ratePerKm: 10000, goods: "کاغذ" },
  { id: "BH-905", from: "یزد", to: "تهران", distance: 620, weightT: 12, ratePerKm: 13000, goods: "سنگ" },
];

function BackhaulFinder() {
  const [city, setCity] = useState("شیراز");
  const [minRate, setMinRate] = useState(10000);
  const [minWeight, setMinWeight] = useState(6);

  const offers = useMemo(() => {
    return MOCK_BACKHAUL.filter(o => o.from === city && o.ratePerKm >= minRate && o.weightT >= minWeight)
      .map(o => ({ ...o, revenue: o.distance * o.ratePerKm }));
  }, [city, minRate, minWeight]);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2"><PackageSearch className="h-5 w-5"/> جستجوی بار برگشتی</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <Label>شهر مبدأ برگشت</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full"><SelectValue placeholder="انتخاب"/></SelectTrigger>
              <SelectContent>
                {Array.from(new Set(MOCK_BACKHAUL.map(o => o.from))).map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>حداقل کرایه (تومان/کیلومتر)</Label>
            <Input type="number" value={minRate} onChange={e => setMinRate(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label>حداقل وزن (تن)</Label>
            <Input type="number" value={minWeight} onChange={e => setMinWeight(Number(e.target.value) || 0)} />
          </div>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="p-3">کد پیشنهاد</th>
                <th className="p-3">مبدأ → مقصد</th>
                <th className="p-3">مسافت</th>
                <th className="p-3">وزن (تن)</th>
                <th className="p-3">کرایه/کم</th>
                <th className="p-3">درآمد کل (تومان)</th>
                <th className="p-3">اقدام</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(o => (
                <tr key={o.id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium">{o.id}</td>
                  <td className="p-3">{o.from} → {o.to}</td>
                  <td className="p-3">{o.distance.toLocaleString()} km</td>
                  <td className="p-3">{o.weightT}</td>
                  <td className="p-3">{o.ratePerKm.toLocaleString()}</td>
                  <td className="p-3">{o.revenue.toLocaleString()}</td>
                  <td className="p-3"><Button size="sm">رزرو</Button></td>
                </tr>
              ))}
              {offers.length === 0 && (
                <tr><td colSpan={7} className="p-4 text-slate-500">هیچ پیشنهادی با فیلترهای فعلی یافت نشد.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
