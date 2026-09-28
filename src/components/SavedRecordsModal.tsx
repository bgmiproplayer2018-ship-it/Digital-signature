import React from 'react';
import { SignatureRecord } from '../types';
import { X, ShieldCheck, Download, Trash2, Calendar, CreditCard, User, Phone } from 'lucide-react';

interface SavedRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: SignatureRecord[];
  onClearRecords: () => void;
}

export const SavedRecordsModal: React.FC<SavedRecordsModalProps> = ({
  isOpen,
  onClose,
  records,
  onClearRecords,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Securely Stored Signatures Vault
              </h3>
              <p className="text-xs text-slate-500">
                Audited records stored for Cash Tree Co-operative Society members
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {records.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm font-medium">No saved signatures yet.</p>
              <p className="text-xs mt-1 text-slate-400">
                Select Amit Kumar or Sonu to capture and submit a signature.
              </p>
            </div>
          ) : (
            records.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-sm">{rec.memberName}</span>
                    <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      A/C {rec.accountNo}
                    </span>
                    {rec.contactNumber && (
                      <span className="text-xs font-mono text-slate-600 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{rec.contactNumber}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(rec.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/70 max-w-[180px] shrink-0">
                    <img
                      src={rec.signatureDataUrl}
                      alt={`Signature of ${rec.memberName}`}
                      className="h-12 max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0 text-xs">
                    <span className="text-slate-400 block text-[10px]">Document Ref</span>
                    <span className="font-mono text-slate-700 truncate block">{rec.id}</span>
                    <span className="text-slate-400 block text-[10px] mt-1">Audit Hash</span>
                    <span className="font-mono text-slate-500 truncate block text-[10px]">
                      {rec.auditHash}
                    </span>
                  </div>

                  <a
                    href={rec.signatureDataUrl}
                    download={`CashTree_Signature_${rec.accountNo}.png`}
                    className="p-2 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors shrink-0"
                    title="Download signature PNG"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {records.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Total {records.length} signature record{records.length > 1 ? 's' : ''} stored securely in browser storage
            </span>
            <button
              type="button"
              onClick={onClearRecords}
              className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Records</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
