import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SignatureRecord } from '../types';
import { CashTreeLogo } from './CashTreeLogo';
import {
  CheckCircle2,
  Home,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  CreditCard,
  User,
  Fingerprint,
  FileCheck,
  Phone,
  Clock,
  Hash,
  Copy,
  Check,
} from 'lucide-react';

interface SuccessViewProps {
  record: SignatureRecord;
  onReturnHome: () => void;
  onNewSignature?: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  record,
  onReturnHome,
  onNewSignature,
}) => {
  const [copiedId, setCopiedId] = React.useState(false);

  // Fire festive celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#16A34A', '#F97316', '#22C55E', '#F59E0B', '#0D9488'],
      });
    } catch {
      // Fallback gracefully if canvas context unavailable
    }
  }, []);

  const dateObj = new Date(record.timestamp);

  // Formatted date (e.g., Monday, 28 September 2026)
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Exact time of submission (e.g., 02:27:04 PM IST with seconds)
  const formattedExactTime = dateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });

  const fullDateTimeString = `${formattedDate} at ${formattedExactTime}`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(record.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDownloadReceipt = () => {
    // Generate a downloadable image certificate or trigger receipt download
    const link = document.createElement('a');
    link.download = `CashTree_eSign_Receipt_${record.accountNo}_${record.id}.png`;
    link.href = record.signatureDataUrl;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Success Banner */}
      <div className="bg-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-900/10 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-emerald-600 mb-4 animate-bounce duration-1000">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <span className="text-xs uppercase tracking-widest font-bold text-emerald-200 bg-white/10 px-3 py-1 rounded-full mb-2">
            Verification Complete
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Signature Submitted Successfully!
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mt-2 leading-relaxed">
            Your digital signature for <strong className="text-white font-bold">{record.memberName}</strong> has been securely verified, encrypted, and attached to Account No. <strong className="text-white font-bold">{record.accountNo}</strong>.
          </p>

          {/* Quick Pill showing Record ID & Submission Timestamp */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 bg-emerald-800/60 backdrop-blur-xs border border-emerald-400/30 rounded-xl px-4 py-2 text-xs text-emerald-100">
            <span className="flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-emerald-300" />
              <span>Record ID:</span>
              <strong className="font-mono text-white tracking-wide">{record.id}</strong>
            </span>
            <span className="text-emerald-400/60 hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Submitted:</span>
              <strong className="text-white font-medium">{formattedExactTime}</strong>
            </span>
          </div>

          {/* Primary Action: Return to Home Screen (as explicitly requested) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all active:scale-[0.98] cursor-pointer text-sm"
            >
              <Home className="w-4 h-4 text-emerald-600" />
              <span>Return to Home Screen</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-emerald-700/80 hover:bg-emerald-700 border border-white/20 transition-all text-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Signature</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Certificate & Receipt Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 print:p-0 print:border-none print:shadow-none">
        {/* Official Society Header in Receipt */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 gap-4">
          <CashTreeLogo size={56} showText={true} />
          <div className="sm:text-right">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
              Official e-Sign Mandate
            </span>
            {/* Prominent Unique Record ID with copy button */}
            <div className="mt-1.5 flex items-center justify-start sm:justify-end gap-1.5">
              <span className="text-xs text-slate-500 font-medium">Record ID:</span>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded select-all">
                {record.id}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                title="Copy Record ID"
                className="p-1 rounded text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                {copiedId ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Member Details Matrix */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-200">
          {/* Unique Record ID Field */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
            <Hash className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-xs text-slate-500 block">Unique Record ID</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-bold font-mono text-emerald-800 tracking-wide select-all">
                  {record.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="text-[11px] font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedId ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Member Name */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
            <User className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-500 block">Member Name</span>
              <span className="text-base font-bold text-slate-900">{record.memberName}</span>
            </div>
          </div>

          {/* Account Number */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
            <CreditCard className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-500 block">Account Number</span>
              <span className="text-base font-bold text-emerald-700 font-mono">
                A/C NO. {record.accountNo}
              </span>
            </div>
          </div>

          {/* Registered Contact Number */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
            <Phone className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-500 block">Registered Contact Number</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {record.contactNumber ? `+91 ${record.contactNumber}` : 'Verified on File'}
              </span>
            </div>
          </div>

          {/* Formatted Date of Submission */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
            <Calendar className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-500 block">Submission Date</span>
              <span className="text-sm font-semibold text-slate-900">{formattedDate}</span>
            </div>
          </div>

          {/* Exact Time of Submission */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
            <Clock className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-500 block">Exact Submission Time</span>
              <span className="text-sm font-bold text-emerald-800 font-mono">
                {formattedExactTime}
              </span>
            </div>
          </div>

          {/* Document Mandate */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl sm:col-span-2">
            <FileCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-500 block">Authorized Document</span>
              <span className="text-xs font-semibold text-slate-800 truncate block">
                {record.documentPurpose}
              </span>
            </div>
          </div>
        </div>

        {/* Signature Preview Frame with Official Stamp */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Captured Digital Signature
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified &amp; Stored</span>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-amber-50/30 border-2 border-slate-200 flex items-center justify-center min-h-[160px] overflow-hidden">
            {/* Background watermarked lines */}
            <div className="absolute inset-x-8 bottom-8 border-b border-slate-300 pointer-events-none" />

            {/* Rendered signature image */}
            <img
              src={record.signatureDataUrl}
              alt={`Signature of ${record.memberName}`}
              className="max-h-28 max-w-full object-contain relative z-10"
            />

            {/* Official Society Stamp Overlay */}
            <div className="absolute right-4 bottom-3 border-2 border-emerald-600/70 text-emerald-800 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider rotate-[-6deg] shadow-xs pointer-events-none">
              ✓ CASH TREE CO-OP APPROVED
            </div>
          </div>
        </div>

        {/* Audit Hash & Security Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-slate-400" />
            <span className="font-mono text-[11px] truncate max-w-xs sm:max-w-md">
              Audit Hash: {record.auditHash}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Mandate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Return home secondary button footer */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onReturnHome}
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
        >
          ← Return to Member Selection
        </button>
      </div>
    </div>
  );
};
