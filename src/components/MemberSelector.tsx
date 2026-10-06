import React from 'react';
import { Member } from '../types';
import { CheckCircle2, User, CreditCard, ShieldCheck, Phone } from 'lucide-react';

interface MemberSelectorProps {
  members: Member[];
  selectedMember: Member | null;
  onSelectMember: (member: Member) => void;
  savedCountByMember: Record<string, number>;
}

export const MemberSelector: React.FC<MemberSelectorProps> = ({
  members,
  selectedMember,
  onSelectMember,
  savedCountByMember,
}) => {
  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Select Society Member / Account</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Choose an account holder to load their profile and activate the digital signature pad below.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>2 Verified KYC Members Loaded</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member) => {
          const isSelected = selectedMember?.id === member.id;
          const previousSignatures = savedCountByMember[member.id] || 0;

          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onSelectMember(member)}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 ${
                isSelected
                  ? 'border-emerald-600 bg-gradient-to-br from-emerald-50/90 via-white to-orange-50/40 shadow-md shadow-emerald-900/5 ring-1 ring-emerald-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Radio indicator */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                        {member.name}
                      </span>
                      {previousSignatures > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Signature Received</span>
                        </span>
                      ) : (
                        isSelected && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                            Selected
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 text-sm mt-0.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-800">
                        A/C NO. <span className="text-emerald-700 font-bold">{member.accountNo}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 mt-1 ${
                    previousSignatures > 0
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : isSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {(previousSignatures > 0 || isSelected) && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>

              {/* Account Details Box */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Account Type</span>
                  <span className="font-medium text-slate-700 truncate block">
                    {member.accountType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Member ID</span>
                  <span className="font-mono text-slate-700 font-medium">{member.memberId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Number</span>
                  <span className="font-mono text-slate-900 font-bold flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{member.contactNumber}</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Audit History</span>
                  <span className="text-slate-700 font-medium">
                    {previousSignatures > 0
                      ? `${previousSignatures} signature${previousSignatures > 1 ? 's' : ''} on record`
                      : 'No prior submissions'}
                  </span>
                </div>
              </div>

              {/* Highlight bar for active */}
              {isSelected && (
                <div className="mt-3.5 flex items-center justify-between text-xs font-medium text-emerald-800 bg-emerald-100/60 rounded-lg px-3 py-1.5">
                  {previousSignatures > 0 ? (
                    <>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Signature Already Received &amp; Verified</span>
                      </span>
                      <span className="text-emerald-800 font-semibold">View Mandate ↓</span>
                    </>
                  ) : (
                    <>
                      <span>Pad Ready for Drawing</span>
                      <span className="text-emerald-700 font-semibold underline">Scroll below to sign ↓</span>
                    </>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
