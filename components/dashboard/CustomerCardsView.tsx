'use client';

import React from 'react';
import { 
  Plus, Edit2, Trash2, Globe, ExternalLink, Copy, Check, Eye, Save, 
  Settings, User, LayoutGrid, CreditCard, BarChart2, ShieldCheck, 
  Users, Building, DollarSign, ArrowLeft, Sliders, Smartphone, Palette, 
  Code, Link2, Trash, CheckSquare, Sparkles, HelpCircle, RefreshCw, Star, ArrowRight,
  Phone, Mail, Send, MessageCircle, ChevronLeft, MapPin, Instagram
} from 'lucide-react';
import { Card, Template, toUUID } from '../../lib/directus';

export interface CustomerCardsViewProps {
  user: any;
  cards: Card[];
  templates: Template[];
  editingCard: Card | null;
  setEditingCard: (card: Card | null) => void;
  isCreatingCard: boolean;
  isSavingCard: boolean;
  cardError: string | null;
  setCardError: (err: string | null) => void;
  cardSuccess: string | null;
  setCardSuccess: (msg: string | null) => void;
  isCopiedSlug: string | null;
  setIsCopiedSlug: (slug: string | null) => void;
  newBtnLabel: string;
  setNewBtnLabel: (val: string) => void;
  newBtnUrl: string;
  setNewBtnUrl: (val: string) => void;
  newExtraPhone: string;
  setNewExtraPhone: (val: string) => void;
  uploadingProfile: boolean;
  uploadingCover: boolean;
  handleFileUpload: (file: File, type: 'profile' | 'cover') => Promise<void>;
  handleAddNewCard: () => Promise<void>;
  handleSaveCard: () => Promise<void>;
  handleDeleteCard: (id: string) => Promise<void>;
  handleCopyCardLink: (slug: string) => void;
  handleAddCustomBtn: () => void;
  handleRemoveCustomBtn: (id: string) => void;
}

export function CustomerCardsView({
  user,
  cards,
  templates,
  editingCard,
  setEditingCard,
  isCreatingCard,
  isSavingCard,
  cardError,
  setCardError,
  cardSuccess,
  setCardSuccess,
  isCopiedSlug,
  setIsCopiedSlug,
  newBtnLabel,
  setNewBtnLabel,
  newBtnUrl,
  setNewBtnUrl,
  newExtraPhone,
  setNewExtraPhone,
  uploadingProfile,
  uploadingCover,
  handleFileUpload,
  handleAddNewCard,
  handleSaveCard,
  handleDeleteCard,
  handleCopyCardLink,
  handleAddCustomBtn,
  handleRemoveCustomBtn
}: CustomerCardsViewProps) {
  return (
    <div className="space-y-6">
      
      {/* Alert Notifications */}
      {cardError && (
        <div className="p-4 bg-red-950/40 border border-red-900/40 rounded-2xl text-red-200 text-xs font-bold flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-red-400 shrink-0" />
            <span>{cardError}</span>
          </div>
          <button onClick={() => setCardError(null)} className="text-red-400 hover:text-red-200 transition text-sm">✕</button>
        </div>
      )}
      {cardSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-200 text-xs font-bold flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{cardSuccess}</span>
          </div>
          <button onClick={() => setCardSuccess(null)} className="text-emerald-400 hover:text-emerald-200 transition text-sm">✕</button>
        </div>
      )}

      {/* If NOT editing, render standard cards workspace index */}
      {!editingCard ? (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h2 className="text-xl font-bold text-white">مدیریت کارت‌های ویزیت دیجیتال</h2>
              <p className="text-xs text-slate-400 mt-1">لیست کارت‌های فعال و پیش‌نویس شما در سامانه.</p>
            </div>

            <button
              onClick={handleAddNewCard}
              disabled={isCreatingCard}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-xl text-xs font-extrabold text-white transition flex items-center gap-1.5 shadow shadow-blue-600/10"
            >
              {isCreatingCard ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {isCreatingCard ? 'در حال ایجاد...' : 'ساخت کارت ویزیت جدید'}
            </button>
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-3xl space-y-4">
              <LayoutGrid className="h-12 w-12 text-slate-600 mx-auto" />
              <div className="space-y-1">
                <p className="font-bold text-white text-sm">هیچ کارت ویزیت هوشمندی ندارید!</p>
                <p className="text-slate-500 text-xs">همین حالا با کلیک روی دکمه بالا، اولین هویت دیجیتال اختصاصی خود را خلق کنید.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cards.map((card) => {
                const template = templates.find(t => toUUID(t.id) === toUUID(card.template_id));
                return (
                  <div 
                    key={card.id} 
                    className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden p-4 flex flex-col justify-between gap-4 group hover:border-slate-700 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                        <img 
                          src={card.profile_image || 'https://picsum.photos/150/150?random=1'} 
                          alt="avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{card.first_name} {card.last_name}</h3>
                        <p className="text-[11px] text-blue-400 font-semibold truncate">{card.job_title}</p>
                        <p className="text-[10px] text-slate-500 truncate">{card.company}</p>
                      </div>
                    </div>

                    <div className="py-2 border-t border-b border-slate-900 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">تم: <span className="text-slate-200 font-bold">{template?.name || 'کلاسیک'}</span></span>
                      <span className="text-slate-400">بازدید کل: <span className="text-emerald-400 font-bold">{card.views_count?.toLocaleString('fa-IR') || 0}</span></span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        card.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {card.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </div>

                    {/* Actions bar */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => setEditingCard(card)}
                        className="flex-1 py-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-[10px] font-bold border border-slate-800 hover:border-slate-750 transition flex items-center justify-center gap-1.5"
                      >
                        <Edit2 className="h-3 w-3 text-blue-400" />
                        ویرایش کارت
                      </button>

                      <button
                        onClick={() => handleCopyCardLink(card.slug)}
                        className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-[10px] font-bold border border-slate-800 hover:border-slate-750 transition"
                        title="کپی لینک اختصاصی"
                      >
                        {isCopiedSlug === card.slug ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>

                      <a
                        href={`/${card.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-[10px] font-bold border border-slate-800 hover:border-slate-750 transition text-blue-400"
                        title="مشاهده آنلاین کارت"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>

                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-2 bg-slate-900 hover:bg-red-950/20 rounded-xl text-[10px] font-bold border border-slate-800 hover:border-red-900/30 transition text-red-400"
                        title="حذف دائمی کارت"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* ==============================================
            SANDBOX LIVE CARD EDITOR (SPLIT SCREEN)
           ============================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 bg-slate-950/60 p-5 rounded-2xl border border-slate-850 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditingCard(null)}
                  className="p-1 hover:bg-slate-900 rounded-lg text-slate-400"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
                <div>
                  <h4 className="text-sm font-bold text-white">ویرایشگر زنده کارت ویزیت</h4>
                  <p className="text-[10px] text-slate-500">تمامی تغییرات به صورت پیش‌نمایش در موبایل قابل مشاهده است.</p>
                </div>
              </div>

              <button 
                onClick={handleSaveCard}
                disabled={isSavingCard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-xl text-xs font-black text-white transition flex items-center gap-1.5"
              >
                {isSavingCard ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                {isSavingCard ? 'در حال ذخیره...' : 'ذخیره نهایی'}
              </button>
            </div>

            {/* Editor Form fields */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 text-xs">
              
              {/* Name & Slug */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">نام کوچک:</label>
                  <input 
                    type="text" 
                    value={editingCard.first_name || ''} 
                    onChange={(e) => setEditingCard({ ...editingCard, first_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">نام خانوادگی:</label>
                  <input 
                    type="text" 
                    value={editingCard.last_name || ''} 
                    onChange={(e) => setEditingCard({ ...editingCard, last_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">لینک اختصاصی کارت (Slug):</label>
                  <input 
                    type="text" 
                    value={editingCard.slug || ''} 
                    onChange={(e) => setEditingCard({ ...editingCard, slug: e.target.value.replace(/[^a-zA-Z0-9-]/g, '') })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none text-left font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">وضعیت نمایش کارت:</label>
                  <select 
                    value={editingCard.status || 'draft'}
                    onChange={(e) => setEditingCard({ ...editingCard, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="draft">پیش‌نویس (خصوصی)</option>
                    <option value="published">منتشر شده (عمومی)</option>
                  </select>
                </div>
              </div>

              {/* Job Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">سمت شغلی:</label>
                  <input 
                    type="text" 
                    value={editingCard.job_title || ''} 
                    onChange={(e) => setEditingCard({ ...editingCard, job_title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">نام شرکت / برند:</label>
                  <input 
                    type="text" 
                    value={editingCard.company || ''} 
                    onChange={(e) => setEditingCard({ ...editingCard, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Profile Image & Cover Image Direct Upload */}
              <div className="grid grid-cols-2 gap-3">
                {/* Profile Image Direct Upload */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">تصویر اصلی پروفایل:</label>
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.[0]) {
                        handleFileUpload(e.dataTransfer.files[0], 'profile');
                      }
                    }}
                    onClick={() => document.getElementById('profile-file-input')?.click()}
                    className="h-28 border-2 border-dashed border-slate-800 hover:border-blue-500 bg-slate-900 rounded-lg flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden group p-2 text-center"
                  >
                    <input 
                      id="profile-file-input"
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], 'profile');
                        }
                      }}
                      className="hidden" 
                    />
                    
                    {uploadingProfile ? (
                      <div className="flex flex-col items-center gap-1">
                        <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
                        <span className="text-[10px] text-slate-400">در حال آپلود...</span>
                      </div>
                    ) : editingCard.profile_image ? (
                      <>
                        <img 
                          src={editingCard.profile_image} 
                          alt="Profile" 
                          className="w-full h-full object-cover rounded" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                          <span className="text-[10px] text-white bg-blue-600 px-2 py-1 rounded">تغییر تصویر</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-slate-500">
                        <User className="h-6 w-6" />
                        <span className="text-[10px] leading-tight">برای بارگذاری کلیک کنید یا بکشید اینجا</span>
                        <span className="text-[8px] text-slate-600">فرمت‌های مجاز: JPG, PNG</span>
                      </div>
                    )}
                  </div>
                  {editingCard.profile_image && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCard({ ...editingCard, profile_image: '' });
                      }}
                      className="text-[10px] text-red-400 hover:underline mt-1"
                    >
                      حذف تصویر
                    </button>
                  )}
                </div>

                {/* Cover Image Direct Upload */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">تصویر کاور:</label>
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.[0]) {
                        handleFileUpload(e.dataTransfer.files[0], 'cover');
                      }
                    }}
                    onClick={() => document.getElementById('cover-file-input')?.click()}
                    className="h-28 border-2 border-dashed border-slate-800 hover:border-blue-500 bg-slate-900 rounded-lg flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden group p-2 text-center"
                  >
                    <input 
                      id="cover-file-input"
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], 'cover');
                        }
                      }}
                      className="hidden" 
                    />
                    
                    {uploadingCover ? (
                      <div className="flex flex-col items-center gap-1">
                        <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
                        <span className="text-[10px] text-slate-400">در حال آپلود...</span>
                      </div>
                    ) : editingCard.cover_image ? (
                      <>
                        <img 
                          src={editingCard.cover_image} 
                          alt="Cover" 
                          className="w-full h-full object-cover rounded" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                          <span className="text-[10px] text-white bg-blue-600 px-2 py-1 rounded">تغییر کاور</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-slate-500">
                        <Palette className="h-6 w-6" />
                        <span className="text-[10px] leading-tight">برای بارگذاری کلیک کنید یا بکشید اینجا</span>
                        <span className="text-[8px] text-slate-600">فرمت‌های مجاز: JPG, PNG</span>
                      </div>
                    )}
                  </div>
                  {editingCard.cover_image && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCard({ ...editingCard, cover_image: '' });
                      }}
                      className="text-[10px] text-red-400 hover:underline mt-1"
                    >
                      حذف تصویر کاور
                    </button>
                  )}
                </div>
              </div>

              {/* Biography */}
              <div className="space-y-1">
                <label className="font-bold text-slate-400">درباره من (بیوگرافی):</label>
                <textarea 
                  rows={3}
                  value={editingCard.bio || ''} 
                  onChange={(e) => setEditingCard({ ...editingCard, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Choose Visual Template */}
              <div className="space-y-2">
                <label className="font-bold text-slate-400 block">انتخاب قالب ظاهری کارت (Template):</label>
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((temp) => (
                    <div 
                      key={temp.id}
                      onClick={() => setEditingCard({ ...editingCard, template_id: temp.id })}
                      className={`p-3 rounded-xl border text-right cursor-pointer transition ${
                        editingCard.template_id === temp.id 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-slate-850 bg-slate-900/40 hover:bg-slate-900'
                      }`}
                    >
                      <span className="font-bold text-white block text-xs">{temp.name}</span>
                      <span className="text-[9px] text-slate-400 mt-0.5 block">{temp.is_premium ? 'طرح ویژه (VIP)' : 'طرح استاندارد'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CUSTOM COLORS */}
              <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-3">
                <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Palette className="h-4 w-4 text-blue-400" />
                  تنظیمات رنگ اختصاصی کارت
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">رنگ اصلی:</span>
                    <div className="flex gap-1">
                      <input 
                        type="color" 
                        value={editingCard.custom_colors?.primary || '#3b82f6'} 
                        onChange={(e) => setEditingCard({
                          ...editingCard,
                          custom_colors: { ...(editingCard.custom_colors || {}), primary: e.target.value }
                        })}
                        className="h-7 w-7 rounded bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text"
                        value={editingCard.custom_colors?.primary || '#3b82f6'}
                        onChange={(e) => setEditingCard({
                          ...editingCard,
                          custom_colors: { ...(editingCard.custom_colors || {}), primary: e.target.value }
                        })}
                        className="w-full px-1 py-0.5 bg-slate-950 text-[10px] font-mono rounded"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">رنگ پس‌زمینه کارت:</span>
                    <div className="flex gap-1">
                      <input 
                        type="color" 
                        value={editingCard.custom_colors?.card_bg || '#ffffff'} 
                        onChange={(e) => setEditingCard({
                          ...editingCard,
                          custom_colors: { ...(editingCard.custom_colors || {}), card_bg: e.target.value }
                        })}
                        className="h-7 w-7 rounded bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text"
                        value={editingCard.custom_colors?.card_bg || '#ffffff'}
                        onChange={(e) => setEditingCard({
                          ...editingCard,
                          custom_colors: { ...(editingCard.custom_colors || {}), card_bg: e.target.value }
                        })}
                        className="w-full px-1 py-0.5 bg-slate-950 text-[10px] font-mono rounded"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">رنگ کل لندینگ:</span>
                    <div className="flex gap-1">
                      <input 
                        type="color" 
                        value={editingCard.custom_colors?.background || '#f1f5f9'} 
                        onChange={(e) => setEditingCard({
                          ...editingCard,
                          custom_colors: { ...(editingCard.custom_colors || {}), background: e.target.value }
                        })}
                        className="h-7 w-7 rounded bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text"
                        value={editingCard.custom_colors?.background || '#f1f5f9'}
                        onChange={(e) => setEditingCard({
                          ...editingCard,
                          custom_colors: { ...(editingCard.custom_colors || {}), background: e.target.value }
                        })}
                        className="w-full px-1 py-0.5 bg-slate-950 text-[10px] font-mono rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* MAPS LINKS */}
              <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-3">
                <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  لینک‌های آدرس روی نقشه (نشان، بلد، ویز و گوگل مپ)
                </h5>
                <p className="text-[10px] text-slate-400">لینک مستقیم موقعیت مکانی خود را روی نقشه‌های مختلف قرار دهید تا کاربران بتوانند به راحتی شما را مسیریابی کنند.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">نقشه نشان (Neshan):</span>
                    <input 
                      type="text" 
                      value={editingCard.neshan || ''} 
                      onChange={(e) => setEditingCard({ ...editingCard, neshan: e.target.value })}
                      placeholder="https://neshan.org/maps/..."
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">نقشه بلد (Balad):</span>
                    <input 
                      type="text" 
                      value={editingCard.balad || ''} 
                      onChange={(e) => setEditingCard({ ...editingCard, balad: e.target.value })}
                      placeholder="https://balad.ir/location?..."
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">مسیریاب ویز (Waze):</span>
                    <input 
                      type="text" 
                      value={editingCard.waze || ''} 
                      onChange={(e) => setEditingCard({ ...editingCard, waze: e.target.value })}
                      placeholder="https://waze.com/ul?..."
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">گوگل مپ (Google Maps):</span>
                    <input 
                      type="text" 
                      value={editingCard.googlemap || ''} 
                      onChange={(e) => setEditingCard({ ...editingCard, googlemap: e.target.value })}
                      placeholder="https://maps.google.com/..."
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SOCIAL LINKS */}
              <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-3">
                <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Link2 className="h-4 w-4 text-blue-400" />
                  آدرس شبکه‌های اجتماعی و تماس
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">تلفن ثابت:</span>
                    <input 
                      type="text" 
                      value={editingCard.social_links?.phone || ''} 
                      onChange={(e) => setEditingCard({
                        ...editingCard,
                        social_links: { ...(editingCard.social_links || {}), phone: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">تلفن همراه (موبایل):</span>
                    <input 
                      type="text" 
                      value={editingCard.social_links?.mobile || ''} 
                      onChange={(e) => setEditingCard({
                        ...editingCard,
                        social_links: { ...(editingCard.social_links || {}), mobile: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">ایمیل:</span>
                    <input 
                      type="text" 
                      value={editingCard.social_links?.email || ''} 
                      onChange={(e) => setEditingCard({
                        ...editingCard,
                        social_links: { ...(editingCard.social_links || {}), email: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">تلگرام (بدون @):</span>
                    <input 
                      type="text" 
                      value={editingCard.social_links?.telegram || ''} 
                      onChange={(e) => setEditingCard({
                        ...editingCard,
                        social_links: { ...(editingCard.social_links || {}), telegram: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">اینستاگرام (بدون @):</span>
                    <input 
                      type="text" 
                      value={editingCard.social_links?.instagram || ''} 
                      onChange={(e) => setEditingCard({
                        ...editingCard,
                        social_links: { ...(editingCard.social_links || {}), instagram: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>
                </div>

                {/* MULTIPLE PHONE NUMBERS */}
                <div className="border-t border-slate-800 pt-3 space-y-2">
                  <span className="text-[10px] font-bold text-white block">شماره تماس‌های ثابت/همراه اضافی دیگر:</span>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="مثلاً: ۰۲۱۸۸۸۸۸۸۸۸ یا ۰۹۱۲۳۴۵۶۷۸۹"
                      value={newExtraPhone}
                      onChange={(e) => setNewExtraPhone(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newExtraPhone.trim()) return;
                        const currentExtra = editingCard.social_links?.extra_phones || [];
                        setEditingCard({
                          ...editingCard,
                          social_links: {
                            ...(editingCard.social_links || {}),
                            extra_phones: [...currentExtra, newExtraPhone.trim()]
                          }
                        });
                        setNewExtraPhone('');
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-[11px] text-white font-bold transition"
                    >
                      افزودن شماره
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(editingCard.social_links?.extra_phones || []).map((ph, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-950 border border-slate-800 text-[10px] text-slate-300 rounded-full">
                        <span>{ph}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentExtra = editingCard.social_links?.extra_phones || [];
                            setEditingCard({
                              ...editingCard,
                              social_links: {
                                ...(editingCard.social_links || {}),
                                extra_phones: currentExtra.filter((_, i) => i !== idx)
                              }
                            });
                          }}
                          className="text-red-400 hover:text-red-300 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CUSTOM BUTTONS CREATOR */}
              <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-3">
                <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-blue-400" />
                  ایجاد دکمه‌های لینک دلخواه (مانند کاتالوگ، رزومه، وقت قبلی)
                </h5>

                <div className="space-y-3">
                  {/* list existing buttons */}
                  {(editingCard.custom_buttons || []).map((btn) => (
                    <div key={btn.id} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-[11px]">
                      <span>{btn.label} <span className="opacity-40 font-mono">({btn.url})</span></span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveCustomBtn(btn.id)}
                        className="text-red-400 hover:text-red-300 font-bold"
                      >
                        حذف
                      </button>
                    </div>
                  ))}

                  {/* Inputs row */}
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      placeholder="عنوان دکمه (مثلا: دانلود کاتالوگ شرکت)"
                      value={newBtnLabel}
                      onChange={(e) => setNewBtnLabel(e.target.value)}
                      className="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded text-[11px]"
                    />
                    <input 
                      type="text"
                      placeholder="آدرس لینک (URL)"
                      value={newBtnUrl}
                      onChange={(e) => setNewBtnUrl(e.target.value)}
                      className="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded text-[11px] text-left font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCustomBtn}
                    className="w-full py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg text-[10px] font-bold border border-blue-600/20 transition"
                  >
                    افزودن دکمه جدید
                  </button>
                </div>
              </div>

              {/* CSS CUSTOM BLOCK */}
              <div className="space-y-1">
                <label className="font-bold text-slate-400 flex items-center gap-1.5">
                  <Code className="h-4 w-4 text-amber-500" />
                  تزریق کدهای CSS اختصاصی (مخصوص طراحان حرفه‌ای):
                </label>
                <textarea 
                  rows={3}
                  placeholder=".my-card { filter: blur(0px); } ... "
                  value={editingCard.custom_css || ''} 
                  onChange={(e) => setEditingCard({ ...editingCard, custom_css: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-blue-500 focus:outline-none text-left font-mono text-[11px]"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Live mobile preview iframe simulation */}
          <div className="lg:col-span-5 flex flex-col justify-start items-center space-y-4">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Smartphone className="h-4 w-4 text-emerald-400 animate-pulse" />
              شبیه‌ساز پیش‌نمایش زنده در گوشی مخاطب:
            </span>

            <div className="w-[300px] h-[580px] bg-slate-950 border-8 border-slate-800 rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col shrink-0">
              {/* Notch representation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-950 mr-1"></div>
                <div className="h-1 w-8 rounded-full bg-slate-900"></div>
              </div>

              <div className="flex-grow overflow-y-auto bg-slate-900 text-slate-100 flex flex-col font-sans select-none" dir="rtl">
                {(() => {
                  const templateId = editingCard.template_id;
                  const isClassic = templateId === 'temp-1' || templateId === 'classic' || templateId === '11111111-1111-1111-1111-111111111111';
                  const isNeonGlass = templateId === 'temp-2' || templateId === 'neon-glass' || templateId === '22222222-2222-2222-2222-222222222222';
                  const isMinimal = templateId === 'temp-3' || templateId === 'minimal' || templateId === '33333333-3333-3333-3333-333333333333';
                  const isLuxuryDark = templateId === 'temp-4' || templateId === 'luxury-dark' || templateId === '44444444-4444-4444-4444-444444444444';

                  const primaryColor = editingCard.custom_colors?.primary || '#3b82f6';
                  const secondaryColor = editingCard.custom_colors?.secondary || '#64748b';
                  const cardBg = editingCard.custom_colors?.card_bg || '#ffffff';
                  const textColor = editingCard.custom_colors?.text || '#1e293b';

                  // Check if it is a custom template from Directus (not one of the 4 hardcoded)
                  const isCustomTemplate = !isClassic && !isNeonGlass && !isMinimal && !isLuxuryDark;
                  const activeTemplate = templates.find(t => toUUID(t.id) === toUUID(templateId));

                  return (
                    <>
                      {/* Classic Style */}
                      {isClassic && (
                        <div className="w-full min-h-full bg-slate-100 text-slate-850 flex flex-col font-sans" style={{ backgroundColor: cardBg, color: textColor }}>
                          {/* Cover photo */}
                          <div className="h-20 bg-slate-300 relative shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
                            <div className="h-full w-full bg-blue-600/20"></div>
                          </div>

                          {/* Profile Pic overlapping cover */}
                          <div className="px-3 -mt-6 relative z-10 flex justify-between items-end">
                            <div className="h-14 w-14 rounded-xl border-2 border-white overflow-hidden shadow-sm bg-white">
                              <img 
                                src={editingCard.profile_image || 'https://picsum.photos/150/150?random=1'} 
                                alt="profile" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-[7px] bg-slate-200/80 px-1.5 py-0.5 rounded-full text-slate-600 font-bold">
                              پیش‌نمایش کلاسیک
                            </span>
                          </div>

                          {/* Info */}
                          <div className="p-3 space-y-3.5 flex-grow">
                            <div>
                              <h4 className="text-xs font-black" style={{ color: textColor }}>{editingCard.first_name || 'نام'} {editingCard.last_name || 'خانوادگی'}</h4>
                              <p className="text-[9px] font-bold mt-0.5" style={{ color: primaryColor }}>{editingCard.job_title || 'سمت شغلی'}</p>
                              <p className="text-[8px] opacity-70">{editingCard.company || 'نام برند یا شرکت'}</p>
                            </div>

                            {editingCard.bio && (
                              <div className="p-2 bg-white/60 rounded-xl text-[8px] leading-relaxed border border-slate-200/50 opacity-90">
                                {editingCard.bio}
                              </div>
                            )}

                            {/* Social Contact links Grid */}
                            <div className="grid grid-cols-4 gap-1.5 pt-1">
                              {editingCard.social_links?.phone && (
                                <div className="flex flex-col items-center justify-center p-1 bg-white/80 border border-slate-200/40 rounded-lg text-[7px] font-bold shadow-sm">
                                  <Phone className="h-3.5 w-3.5 text-blue-500 mb-0.5" />
                                  <span>تلفن ثابت</span>
                                </div>
                              )}
                              {editingCard.social_links?.mobile && (
                                <div className="flex flex-col items-center justify-center p-1 bg-white/80 border border-slate-200/40 rounded-lg text-[7px] font-bold shadow-sm">
                                  <Phone className="h-3.5 w-3.5 text-emerald-500 mb-0.5" />
                                  <span>موبایل</span>
                                </div>
                              )}
                              {editingCard.social_links?.email && (
                                <div className="flex flex-col items-center justify-center p-1 bg-white/80 border border-slate-200/40 rounded-lg text-[7px] font-bold shadow-sm">
                                  <Mail className="h-3.5 w-3.5 text-blue-400 mb-0.5" />
                                  <span>ایمیل</span>
                                </div>
                              )}
                              {editingCard.social_links?.telegram && (
                                <div className="flex flex-col items-center justify-center p-1 bg-white/80 border border-slate-200/40 rounded-lg text-[7px] font-bold shadow-sm">
                                  <Send className="h-3.5 w-3.5 text-sky-500 mb-0.5" />
                                  <span>تلگرام</span>
                                </div>
                              )}
                            </div>

                            {/* Additional custom button links */}
                            {editingCard.custom_buttons && editingCard.custom_buttons.length > 0 && (
                              <div className="space-y-1 pt-1.5 border-t border-slate-200/50">
                                {editingCard.custom_buttons.map((btn) => (
                                  <div 
                                    key={btn.id}
                                    className="p-1.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-[8px] font-bold shadow-sm"
                                    style={{ borderRightColor: primaryColor, borderRightWidth: '3px' }}
                                  >
                                    <span>{btn.label}</span>
                                    <span className="opacity-40">➔</span>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                      {/* Neon Glass Style */}
                      {isNeonGlass && (
                        <div className="w-full min-h-full bg-slate-950 text-slate-100 p-3.5 space-y-3.5 flex flex-col font-sans" style={{ backgroundColor: cardBg, color: textColor }}>
                          <div className="p-3 bg-zinc-900/80 border border-zinc-800/80 rounded-2xl relative overflow-hidden backdrop-blur space-y-3 flex-grow">
                            <div className="absolute top-0 right-0 h-10 w-10 bg-blue-500/10 rounded-full blur-xl"></div>
                            <div className="absolute bottom-0 left-0 h-10 w-10 bg-purple-500/10 rounded-full blur-xl"></div>

                            <div className="flex justify-between items-start">
                              <div className="h-12 w-12 rounded-xl border border-blue-500/30 overflow-hidden shrink-0 bg-zinc-950">
                                <img 
                                  src={editingCard.profile_image || 'https://picsum.photos/150/150?random=1'} 
                                  alt="profile" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-[6px] text-blue-400 font-black tracking-widest bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-full">
                                NEON GLASS
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-xs font-black text-white">{editingCard.first_name || 'نام'} {editingCard.last_name || 'خانوادگی'}</h4>
                              <p className="text-[9px] text-blue-400 font-extrabold">{editingCard.job_title || 'سمت شغلی'}</p>
                              <p className="text-[8px] text-zinc-500 leading-tight">{editingCard.company || 'نام برند یا شرکت'}</p>
                            </div>

                            {editingCard.bio && (
                              <p className="text-[8px] text-zinc-400 leading-relaxed bg-zinc-950/60 p-2 border border-zinc-850 rounded-xl">
                                {editingCard.bio}
                              </p>
                            )}

                            {/* Social connections */}
                            <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                              {editingCard.social_links?.mobile && (
                                <div className="p-1.5 bg-zinc-950/60 border border-zinc-800 rounded-lg flex items-center gap-1.5 text-[7px] font-bold text-zinc-300">
                                  <Phone className="h-3 w-3 text-emerald-400 shrink-0" />
                                  <span className="truncate">تماس مستقیم</span>
                                </div>
                              )}
                              {editingCard.social_links?.telegram && (
                                <div className="p-1.5 bg-zinc-950/60 border border-zinc-800 rounded-lg flex items-center gap-1.5 text-[7px] font-bold text-zinc-300">
                                  <Send className="h-3 w-3 text-sky-400 shrink-0" />
                                  <span className="truncate">پیام تلگرام</span>
                                </div>
                              )}
                            </div>

                            {/* custom buttons */}
                            {editingCard.custom_buttons && editingCard.custom_buttons.length > 0 && (
                              <div className="space-y-1 pt-2">
                                {editingCard.custom_buttons.map((btn) => (
                                  <div 
                                    key={btn.id}
                                    className="p-1.5 bg-gradient-to-l from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg flex items-center justify-between text-[8px] font-bold text-blue-300"
                                  >
                                    <span>{btn.label}</span>
                                    <span className="text-purple-400">⚡</span>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                      {/* Minimal Style */}
                      {isMinimal && (
                        <div className="w-full min-h-full bg-stone-50 text-stone-800 p-4 space-y-4 flex flex-col font-sans" style={{ backgroundColor: cardBg, color: textColor }}>
                          <div className="flex flex-col items-center text-center space-y-2 flex-grow">
                            <div className="h-14 w-14 rounded-full overflow-hidden border border-stone-200 p-0.5 bg-white shrink-0">
                              <img 
                                src={editingCard.profile_image || 'https://picsum.photos/150/150?random=1'} 
                                alt="profile" 
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <h4 className="text-xs font-black text-stone-900">{editingCard.first_name || 'نام'} {editingCard.last_name || 'خانوادگی'}</h4>
                              <p className="text-[8px] font-medium text-stone-500 uppercase tracking-widest">{editingCard.job_title || 'سمت شغلی'}</p>
                              {editingCard.company && <p className="text-[8px] text-stone-400">{editingCard.company}</p>}
                            </div>

                            {editingCard.bio && (
                              <p className="text-[8px] text-stone-600 leading-relaxed text-center px-2">
                                {editingCard.bio}
                              </p>
                            )}

                            {/* Minimal Links */}
                            <div className="w-full space-y-1 pt-2.5">
                              {editingCard.social_links?.mobile && (
                                <div className="p-1.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl flex items-center justify-between text-[8px] font-bold text-stone-700">
                                  <span className="flex items-center gap-1.5">
                                    <Phone className="h-3 w-3 text-stone-500" />
                                    موبایل
                                  </span>
                                  <span className="text-stone-400 font-mono text-[7px]">{editingCard.social_links?.mobile}</span>
                                </div>
                              )}
                              {editingCard.social_links?.email && (
                                <div className="p-1.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl flex items-center justify-between text-[8px] font-bold text-stone-700">
                                  <span className="flex items-center gap-1.5">
                                    <Mail className="h-3 w-3 text-stone-500" />
                                    پست الکترونیکی
                                  </span>
                                  <span className="text-stone-400 font-mono text-[7px] truncate max-w-[100px]">{editingCard.social_links?.email}</span>
                                </div>
                              )}

                              {editingCard.custom_buttons && editingCard.custom_buttons.length > 0 && (
                                <div className="space-y-1 pt-2 border-t border-stone-200">
                                  {editingCard.custom_buttons.map((btn) => (
                                    <div 
                                      key={btn.id}
                                      className="p-1.5 bg-stone-900 text-white rounded-xl flex items-center justify-between text-[8px] font-bold shadow-sm"
                                    >
                                      <span>{btn.label}</span>
                                      <span>➔</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      )}

                      {/* Luxury Dark Style */}
                      {isLuxuryDark && (
                        <div className="w-full min-h-full bg-stone-950 text-amber-100 p-4 space-y-4 flex flex-col font-sans" style={{ backgroundColor: cardBg, color: textColor }}>
                          <div className="border border-amber-500/20 bg-stone-900/60 p-3 rounded-2xl flex flex-col flex-grow space-y-3.5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 h-16 w-16 bg-amber-500/5 rounded-full blur-2xl"></div>

                            <div className="flex justify-between items-center">
                              <span className="text-[5px] text-amber-500/70 font-mono tracking-widest uppercase border border-amber-500/10 px-2 py-0.5 rounded-full">
                                LUXURY COLLECTION
                              </span>
                              <div className="h-10 w-10 rounded-lg border-2 border-amber-500/40 overflow-hidden shrink-0">
                                <img 
                                  src={editingCard.profile_image || 'https://picsum.photos/150/150?random=1'} 
                                  alt="profile" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            <div className="space-y-0.5 text-right">
                              <h4 className="text-xs font-serif font-bold text-amber-200 tracking-wide">{editingCard.first_name || 'نام'} {editingCard.last_name || 'خانوادگی'}</h4>
                              <p className="text-[7.5px] font-mono uppercase tracking-wider text-amber-500">{editingCard.job_title || 'سمت شغلی'}</p>
                              {editingCard.company && <p className="text-[7px] text-stone-500">{editingCard.company}</p>}
                            </div>

                            {editingCard.bio && (
                              <p className="text-[7.5px] text-stone-400 leading-relaxed bg-stone-950/40 p-2 rounded-lg border border-stone-800/40 text-justify">
                                {editingCard.bio}
                              </p>
                            )}

                            {/* Luxury contact info list */}
                            <div className="space-y-1 pt-1">
                              {editingCard.social_links?.mobile && (
                                <div className="py-1 border-b border-stone-800/60 flex justify-between items-center text-[7px] text-stone-300">
                                  <span className="opacity-50">تلفن مستقیم:</span>
                                  <span className="font-mono text-amber-500/90">{editingCard.social_links?.mobile}</span>
                                </div>
                              )}
                              {editingCard.social_links?.instagram && (
                                <div className="py-1 border-b border-stone-800/60 flex justify-between items-center text-[7px] text-stone-300">
                                  <span className="opacity-50">اینستاگرام:</span>
                                  <span className="font-mono text-amber-500/90">@{editingCard.social_links?.instagram}</span>
                                </div>
                              )}
                            </div>

                            {/* Custom buttons */}
                            {editingCard.custom_buttons && editingCard.custom_buttons.length > 0 && (
                              <div className="space-y-1">
                                {editingCard.custom_buttons.map((btn) => (
                                  <div 
                                    key={btn.id}
                                    className="p-1.5 bg-stone-900 border border-amber-500/30 rounded-lg flex items-center justify-between text-[8px] font-bold text-amber-300"
                                  >
                                    <span>{btn.label}</span>
                                    <span className="opacity-40">➔</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Fallback Custom Template */}
                      {isCustomTemplate && (() => {
                        const tSchema = activeTemplate?.schema || {};
                        const isDarkTheme = tSchema.theme === 'dark';
                        const tColors = tSchema.colors || {};
                        const tLayout = tSchema.layout || {};

                        const pColor = tColors.primary || '#8d5b4c';
                        const sColor = tColors.secondary || '#f4ece1';
                        const bColor = tColors.background || '#faf6f0';
                        const txtColor = tColors.text || '#2d221e';
                        const txtSecColor = tColors.text_secondary || '#6e5a53';
                        const customCardBg = isDarkTheme ? '#18181b' : '#ffffff';
                        
                        const isCircleAvatar = (tLayout.avatar_shape || 'circle') === 'circle';
                        const isSplitHeader = tLayout.header_style === 'split';

                        return (
                          <div 
                            className="w-full min-h-full transition-all p-3.5 space-y-3.5 flex flex-col justify-between text-right font-sans"
                            style={{ 
                              backgroundColor: customCardBg, 
                              color: txtColor
                            }}
                          >
                            <div className="space-y-3.5 flex-grow">
                              <div className="flex justify-between items-center text-[7px]">
                                <span className="px-1.5 py-0.5 rounded-full text-[6px] font-bold" style={{ backgroundColor: sColor, color: pColor }}>
                                  {activeTemplate?.name || 'قالب اختصاصی'}
                                </span>
                              </div>

                              {isSplitHeader ? (
                                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                                  <div className="h-10 w-10 overflow-hidden border shrink-0" style={{ borderColor: pColor, borderRadius: isCircleAvatar ? '9999px' : '6px' }}>
                                    <img 
                                      src={editingCard.profile_image || 'https://picsum.photos/150/150?random=1'} 
                                      alt="profile" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="text-[10px] font-black">{editingCard.first_name || 'نام'} {editingCard.last_name || 'خانوادگی'}</h4>
                                    <p className="text-[8px] font-bold" style={{ color: pColor }}>{editingCard.job_title || 'سمت شغلی'}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center text-center space-y-1.5">
                                  <div className="h-12 w-12 overflow-hidden border p-0.5" style={{ borderColor: pColor, borderRadius: isCircleAvatar ? '9999px' : '8px' }}>
                                    <img 
                                      src={editingCard.profile_image || 'https://picsum.photos/150/150?random=1'} 
                                      alt="profile" 
                                      className="w-full h-full object-cover"
                                      style={{ borderRadius: isCircleAvatar ? '9999px' : '6px' }}
                                    />
                                  </div>
                                  <div>
                                    <h4 className="text-[10px] font-black">{editingCard.first_name || 'نام'} {editingCard.last_name || 'خانوادگی'}</h4>
                                    <p className="text-[8px] font-bold mt-0.5" style={{ color: pColor }}>{editingCard.job_title || 'سمت شغلی'}</p>
                                  </div>
                                </div>
                              )}

                              {editingCard.bio && (
                                <p className="text-[7.5px] leading-relaxed text-center" style={{ color: txtSecColor }}>
                                  {editingCard.bio}
                                </p>
                              )}

                              {/* Mini Contact Buttons */}
                              <div className="grid grid-cols-4 gap-1.5 pt-2">
                                {['تلفن', 'واتساپ', 'تلگرام', 'سایت'].map((social, i) => (
                                  <div key={social} className="flex flex-col items-center justify-center p-1 rounded-md border text-[7px]" style={{ borderColor: sColor, backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' }}>
                                    {i === 0 && <Phone className="h-3 w-3 text-blue-500" style={{ color: pColor }} />}
                                    {i === 1 && <MessageCircle className="h-3 w-3 text-emerald-500" style={{ color: pColor }} />}
                                    {i === 2 && <Send className="h-3 w-3 text-sky-500" style={{ color: pColor }} />}
                                    {i === 3 && <Globe className="h-3 w-3 text-zinc-500" style={{ color: pColor }} />}
                                    <span className="text-[5.5px] font-bold mt-0.5" style={{ color: txtSecColor }}>{social}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
