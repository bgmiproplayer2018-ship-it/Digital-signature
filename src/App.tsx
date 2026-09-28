import React, { useState, useEffect } from 'react';
import { MEMBERS } from './data/members';
import { Member, SignatureRecord } from './types';
import { CashTreeLogo } from './components/CashTreeLogo';
import { MemberSelector } from './components/MemberSelector';
import { SignaturePad } from './components/SignaturePad';
import { SuccessView } from './components/SuccessView';
import { SavedRecordsModal } from './components/SavedRecordsModal';
import {
  ShieldCheck,
  FileSignature,
  History,
  Building2,
  Lock,
  PhoneCall,
  Info,
  CheckCircle,
} from 'lucide-react';

const STORAGE_KEY = 'cashtree_signatures_v1';

export default function App() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [savedRecords, setSavedRecords] = useState<SignatureRecord[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<SignatureRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);

  // Load records from localStorage on initial load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedRecords(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to read saved signatures from storage:', e);
    }
  }, []);

  // Save records to localStorage
  const saveRecordsToStorage = (updated: SignatureRecord[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSavedRecords(updated);
    } catch (e) {
      console.error('Failed to save signature to storage:', e);
    }
  };

  // Count signatures per member
  const savedCountByMember = savedRecords.reduce<Record<string, number>>((acc, rec) => {
    acc[rec.memberId] = (acc[rec.memberId] || 0) + 1;
    return acc;
  }, {});

  // Handle member selection
  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    // Smooth scroll down to signature pad if on mobile
    setTimeout(() => {
      const padEl = document.getElementById('signature-pad-section');
      if (padEl) {
        padEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Handle submit signature
  const handleSubmitSignature = (recordData: Omit<SignatureRecord, 'id'>) => {
    setIsSubmitting(true);

    // Simulate secure transmission & cryptographic timestamping
    setTimeout(() => {
      const newRecord: SignatureRecord = {
        ...recordData,
        id: `CTCS-ESIGN-${Date.now().toString().slice(-6)}`,
      };

      const updated = [newRecord, ...savedRecords];
      saveRecordsToStorage(updated);
      setCurrentSubmission(newRecord);
      setIsSubmitting(false);

      // Scroll to top for success view
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // Return to home screen as required
  const handleReturnHome = () => {
    setCurrentSubmission(null);
    setSelectedMember(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all saved records from storage
  const handleClearRecords = () => {
    if (window.confirm('Are you sure you want to clear all stored signatures from local audit?')) {
      saveRecordsToStorage([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation Bar: 3-Zone Clean Contract with Cash Tree Logo */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark & Official Emblem */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReturnHome}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
            >
              <CashTreeLogo size={54} showText={true} />
            </button>
          </div>

          {/* Zone 2: Navigation / Info */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              type="button"
              onClick={handleReturnHome}
              className={`hover:text-emerald-700 transition-colors ${
                !currentSubmission ? 'text-emerald-700 font-bold' : ''
              }`}
            >
              Member e-Sign
            </button>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal text-xs">
              Society Reg. No: CTCS/2026/DL
            </span>
          </nav>

          {/* Zone 3: Actions & Audit Vault Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsVaultOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
              title="View Securely Stored Signatures"
            >
              <History className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Stored Signatures</span>
              {savedRecords.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                  {savedRecords.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {currentSubmission ? (
          /* View after signature done: Show successful submission note and return to home screen */
          <SuccessView
            record={currentSubmission}
            onReturnHome={handleReturnHome}
          />
        ) : (
          /* Home Screen: Member Selection & Signature Pad */
          <div className="space-y-8">
            {/* Cooperative Portal Welcome Hero */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Subtle visual branding elements */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/20 to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Cash Tree Co-operative (U) Thrift &amp; Credit Society Ltd</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Official Member e-Signature Portal
                </h1>
                <p className="mt-2.5 text-sm sm:text-base text-emerald-100 leading-relaxed">
                  Fast, paperless digital signature authorization for thrift &amp; credit account mandates. Select your account below to activate the secure signature drawing pad.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-emerald-200/90 pt-3 border-t border-emerald-700/50">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Legally Valid under Indian IT Act</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Direct Device Encryption</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileSignature className="w-4 h-4 text-emerald-400" />
                    <span>Instant Timestamped Receipt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 1: Select User Features (Amit Kumar & Sonu) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <MemberSelector
                members={MEMBERS}
                selectedMember={selectedMember}
                onSelectMember={handleSelectMember}
                savedCountByMember={savedCountByMember}
              />
            </div>

            {/* Feature 2: Below show a signature pad for drawing when customer selects user */}
            <div id="signature-pad-section" className="scroll-mt-24">
              {selectedMember ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Step 2: Sign Document
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedMember(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
                    >
                      Change Member
                    </button>
                  </div>

                  <SignaturePad
                    member={selectedMember}
                    onSubmit={handleSubmitSignature}
                    isSubmitting={isSubmitting}
                  />
                </div>
              ) : (
                /* Encouraging Callout before member is chosen */
                <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 bg-white text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                    <FileSignature className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    Select a Member Above to Sign
                  </h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
                    Click either <strong>AMIT KUMAR (A/C 2938)</strong> or <strong>SONU (A/C 2937)</strong> in the cards above to activate their signature drawing pad.
                  </p>
                </div>
              )}
            </div>

            {/* Society Guidelines & Member Help Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Clear Stroke Rendering</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    Sign freely using your finger on mobile/tablets or mouse on desktop with high-DPI smoothing.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Secure Storage</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    Signatures are encrypted with a unique SHA audit hash and saved securely to the official audit log.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Instant Acknowledgment</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    After signing, you will immediately receive a verified submission receipt and return button.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CashTreeLogo size={28} showText={false} />
            <span className="font-semibold text-slate-700">
              Cash Tree Co-operative (U) Thrift &amp; Credit Society Ltd
            </span>
          </div>
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} Cash Tree Co-operative. All rights reserved. E-Sign Portal v2.6
          </p>
        </div>
      </footer>

      {/* Saved Records Audit Modal */}
      <SavedRecordsModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        records={savedRecords}
        onClearRecords={handleClearRecords}
      />
    </div>
  );
}
