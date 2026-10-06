import React from 'react';
import { Member, SignatureRecord } from '../types';
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  CreditCard,
  User,
  Fingerprint,
  FileCheck2,
  Lock,
  Download,
  RotateCcw,
} from 'lucide-react';

interface SignatureReceivedCardProps {
  member: Member;
  record?: SignatureRecord;
  onSignAgain?: () => void;
}

export const SignatureReceivedCard: React.FC<SignatureReceivedCardProps> = ({
  member,
  record,
  onSignAgain,
}) => {
  const formattedDate = record
    ? new Date(record.timestamp).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Verified & Saved on File';

  const handleDownload = () => {
    if (!record?.signatureDataUrl) return;
    const link = document.createElement('a');
    link.download = `CashTree_Signature_${member.accountNo}.png`;
    link.href = record.signatureDataUrl;
    link.click();
  };

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-emerald-500 shadow-md shadow-emerald-950/5 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Done Logo / Icon */}
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-md shadow-emerald-900/20 shrink-0">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 fill-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-200">
                  Electronic Signature Mandate
                </span>
                <span className="text-[10px] bg-emerald-500/30 border border-emerald-300/40 rounded-full px-2 py-0.5 text-white font-semibold">
                  Verified
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                Signature Received
              </h3>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3.5 py-2 border border-white/20 text-xs sm:text-right">
            <span className="text-emerald-200 block text-[10px] uppercase font-semibold">
              Member Account
            </span>
            <span className="font-bold text-white font-mono tracking-wide text-sm">
              A/C NO. {member.accountNo}
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-7 bg-slate-50/50 space-y-6">
        {/* Prominent Done Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-emerald-900">
                Signature Successfully Received &amp; Verified
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                The digital signature for <strong className="font-semibold text-emerald-950">{member.name}</strong> has been secured and registered for Account No. <strong className="font-semibold text-emerald-950">{member.accountNo}</strong>.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 rounded-xl px-3 py-1.5 shadow-2xs shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Record Active</span>
          </div>
        </div>

        {/* Signature Preview Frame (if record exists) */}
        {record?.signatureDataUrl && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Captured Signature on File
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Ref: {record.id}
              </span>
            </div>

            <div className="relative p-6 rounded-xl bg-amber-50/20 border-2 border-dashed border-slate-200 flex items-center justify-center min-h-[140px]">
              <div className="absolute inset-x-8 bottom-6 border-b border-slate-300/80 pointer-events-none" />
              <img
                src={record.signatureDataUrl}
                alt={`Signature of ${member.name}`}
                className="max-h-24 max-w-full object-contain relative z-10"
              />
              <div className="absolute right-3 bottom-2 border border-emerald-600/50 text-emerald-800 bg-white/90 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider rotate-[-4deg]">
                ✓ CASH TREE CO-OP VERIFIED
              </div>
            </div>
          </div>
        )}

        {/* Member & Verification Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 flex items-center gap-3">
            <User className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-slate-400 block text-[10px]">Member Name</span>
              <span className="font-bold text-slate-900 truncate block">{member.name}</span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-slate-400 block text-[10px]">Account Number</span>
              <span className="font-bold text-emerald-700 font-mono truncate block">
                A/C NO. {member.accountNo}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-slate-400 block text-[10px]">Date Recorded</span>
              <span className="font-semibold text-slate-800 truncate block">{formattedDate}</span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 flex items-center gap-3">
            <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-slate-400 block text-[10px]">Authorized Purpose</span>
              <span className="font-semibold text-slate-800 truncate block">
                {member.documentPurpose}
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted with SHA-256 and safely stored in society vault.</span>
          </div>

          <div className="flex items-center gap-2">
            {record?.signatureDataUrl && (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            )}

            {onSignAgain && (
              <button
                type="button"
                onClick={onSignAgain}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors text-[11px]"
                title="Update or submit a replacement signature"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Re-sign if needed</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
