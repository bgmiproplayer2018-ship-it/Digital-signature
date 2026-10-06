import React from 'react';
import {
  CheckCircle2,
  Clock,
  User,
  CreditCard,
  IndianRupee,
  ShieldCheck,
  FileCheck2,
  Camera,
  Landmark,
  Briefcase,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface Step {
  id: number;
  label: string;
  sublabel: string;
  status: 'done' | 'pending';
  icon: React.ElementType;
}

export const LoanStatusCard: React.FC = () => {
  const applicant = {
    name: 'Gagan kumar rana',
    accountNo: '2800',
    approvedAmount: '50,000/-',
    applicationId: 'CTCS-LN-2026-2800',
    loanType: 'Personal Thrift Loan',
    disbursalEstimate: 'Within 2-4 Hours after final verification',
  };

  const steps: Step[] = [
    {
      id: 1,
      label: 'Basic details',
      sublabel: 'Personal & contact info verified',
      status: 'done',
      icon: User,
    },
    {
      id: 2,
      label: 'Working professional',
      sublabel: 'Employment & income verified',
      status: 'done',
      icon: Briefcase,
    },
    {
      id: 3,
      label: 'Submit kyc docs',
      sublabel: 'Aadhaar & PAN matched',
      status: 'done',
      icon: FileCheck2,
    },
    {
      id: 4,
      label: 'Submit your selfie',
      sublabel: 'Biometric face match completed',
      status: 'done',
      icon: Camera,
    },
    {
      id: 5,
      label: 'Upload bank statement',
      sublabel: '6-month statement verified',
      status: 'done',
      icon: Landmark,
    },
    {
      id: 6,
      label: 'Waiting for disbursal',
      sublabel: 'Final society clearance in progress',
      status: 'pending',
      icon: Clock,
    },
  ];

  const doneCount = steps.filter((s) => s.status === 'done').length;
  const totalCount = steps.length;
  const progressPercent = Math.round((doneCount / totalCount) * 100);

  return (
    <section className="w-full bg-gradient-to-br from-white via-slate-50/70 to-emerald-50/40 rounded-3xl border-2 border-emerald-500/40 shadow-lg shadow-emerald-950/5 overflow-hidden transition-all duration-300">
      {/* Top Banner / Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 sm:p-6 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-emerald-100 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Society Loan Disbursement Tracker</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Loan Application Status</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Real-time approval progress for Cash Tree Co-operative Society member loan account.
            </p>
          </div>

          {/* Right Highlight Badge: Approved Amount */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-200 block">
                Approved Amount
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                ₹{applicant.approvedAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Summary Details Strip */}
      <div className="p-5 sm:p-6 bg-white border-b border-slate-200/80">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Member Name */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Applicant Name
              </span>
              <span className="text-base font-extrabold text-slate-900 truncate block">
                {applicant.name}
              </span>
            </div>
          </div>

          {/* Account Number */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Account Number
              </span>
              <span className="text-base font-extrabold text-emerald-700 font-mono block">
                A/C NO. {applicant.accountNo}
              </span>
            </div>
          </div>

          {/* Application Status */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                Disbursal Stage
              </span>
              <span className="text-sm font-extrabold text-amber-900 block truncate">
                5 of 6 Steps Done • Disbursal Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Loan Dots Progress Section */}
      <div className="p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Loan Disbursal Stages (6-Step Tracker)
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-mono">
                5 Done / 1 Pending
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              5 dots completed with verified society credentials, 6th dot currently awaiting disbursal release.
            </p>
          </div>

          {/* Overall progress indicator */}
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto shrink-0">
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700 font-mono">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Desktop / Tablet Horizontal Timeline */}
        <div className="hidden lg:block relative my-4">
          {/* Connecting track line */}
          <div className="absolute top-6 left-10 right-10 h-1 bg-slate-200 -z-0">
            <div
              className="h-full bg-emerald-600 transition-all duration-700"
              style={{ width: '82%' }}
            />
          </div>

          <div className="grid grid-cols-6 gap-3 relative z-10">
            {steps.map((step) => {
              const isDone = step.status === 'done';
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex flex-col items-center text-center group">
                  {/* The Step Dot (Circle) */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm border-2 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-amber-500 border-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Clock className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Dot status badge */}
                  <span
                    className={`mt-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isDone
                        ? 'text-emerald-700 bg-emerald-100/80'
                        : 'text-amber-800 bg-amber-100 font-extrabold'
                    }`}
                  >
                    {isDone ? `Dot ${step.id} • Done` : `Dot ${step.id} • Pending`}
                  </span>

                  {/* Step Label */}
                  <h4 className="mt-1 text-xs font-bold text-slate-900 leading-snug">
                    {step.label}
                  </h4>

                  {/* Subtext */}
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                    {step.sublabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline Cards */}
        <div className="lg:hidden space-y-3">
          {steps.map((step, idx) => {
            const isDone = step.status === 'done';
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`relative p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-white border-slate-200/90 shadow-2xs'
                    : 'bg-amber-50/60 border-amber-300 shadow-xs ring-1 ring-amber-300'
                }`}
              >
                {/* Dot Icon indicator */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-bold ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-amber-500 border-amber-500 text-white shadow-xs animate-pulse'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Clock className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Step {step.id}: {step.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isDone
                          ? 'text-emerald-700 bg-emerald-100'
                          : 'text-amber-800 bg-amber-100'
                      }`}
                    >
                      {isDone ? 'Done' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {step.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Disbursal Alert Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold block">Current Stage:(Waiting for disbursal)</span>
              <span className="text-amber-800 text-[11px]">
                Your approved ₹50,000/- loan sanction. The amount will be transferred to Account North east small finance/11382***********84 shortly.
              </span>
            </div>
          </div>
          <div className="shrink-0 self-end sm:self-auto">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sanction Approved</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
