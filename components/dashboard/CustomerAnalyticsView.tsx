'use client';

import React from 'react';
import { Card, CardAnalytics, toUUID } from '../../lib/directus';

export interface CustomerAnalyticsViewProps {
  user: any;
  cards: Card[];
  analytics: CardAnalytics[];
}

export function CustomerAnalyticsView({
  user,
  cards,
  analytics
}: CustomerAnalyticsViewProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-xl font-bold text-white">گزارشات و آنالیز ترافیک بازدیدکنندگان</h2>
        <p className="text-xs text-slate-400 mt-1">آمار تحلیلی مربوط به مرورگر، منابع ترافیک و ورودی‌های کارت‌های دیجیتال شما.</p>
      </div>

      {cards.length === 0 ? (
        <p className="text-slate-500 text-xs py-6 text-center">هیچ کارت فعالی برای دریافت آمار بازدید وجود ندارد.</p>
      ) : (
        <div className="space-y-8">
          {cards.map((card) => {
            const cardLogs = analytics.filter(a => toUUID(a.card_id) === toUUID(card.id));
            
            // Device counts helper
            const mobileCount = cardLogs.filter(l => l.device.includes('موبایل')).length;
            const desktopCount = cardLogs.filter(l => l.device.includes('دسکتاپ')).length;
            const totalVisits = cardLogs.length || card.views_count || 0;

            // Referrers calculation
            const refCounts: Record<string, number> = {};
            cardLogs.forEach(l => {
              refCounts[l.referrer] = (refCounts[l.referrer] || 0) + 1;
            });

            return (
              <div key={card.id} className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <span className="font-bold text-white text-sm">{card.first_name} {card.last_name} ({card.slug}/)</span>
                  <span className="text-xs font-semibold text-blue-400">{totalVisits} بازدید کل</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                  
                  {/* Device Breakdown Visual */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/60 space-y-3">
                    <span className="font-bold text-white block">نوع دستگاه بازدیدکنندگان:</span>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>موبایل: {mobileCount} بازدید ({totalVisits > 0 ? Math.round((mobileCount/totalVisits)*100) : 0}٪)</span>
                        <span>دسکتاپ: {desktopCount} بازدید ({totalVisits > 0 ? Math.round((desktopCount/totalVisits)*100) : 0}٪)</span>
                      </div>

                      {/* Progress bar visual */}
                      <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden flex">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-500" 
                          style={{ width: `${totalVisits > 0 ? (mobileCount / totalVisits) * 100 : 50}%` }}
                        ></div>
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-500" 
                          style={{ width: `${totalVisits > 0 ? (desktopCount / totalVisits) * 100 : 50}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">اکثریت بازدیدکنندگان با گوشی‌های تلفن همراه کارت شما را اسکن یا لمس کرده‌اند.</p>
                    </div>
                  </div>

                  {/* Referrer traffic sources list */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/60 space-y-3">
                    <span className="font-bold text-white block">منابع ارجاع و کلیک ترافیک:</span>
                    <div className="space-y-2">
                      {Object.entries(refCounts).length === 0 ? (
                        <p className="text-slate-500 text-[10px] py-2">اطلاعاتی ثبت نشده (ترافیک ورودی مستقیم)</p>
                      ) : (
                        Object.entries(refCounts).map(([ref, count]) => (
                          <div key={ref} className="flex justify-between items-center py-1 border-b border-slate-850/60 last:border-b-0">
                            <span className="font-bold text-slate-300">{ref}</span>
                            <span className="font-mono text-blue-400 font-bold">{count} کلیک</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
