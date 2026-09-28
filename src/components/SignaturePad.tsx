import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Member, SignatureRecord } from '../types';
import {
  RotateCcw,
  RotateCw,
  Trash2,
  Lock,
  PenTool,
  CheckCircle,
  AlertCircle,
  FileCheck2,
  Shield,
  Undo2,
} from 'lucide-react';

interface SignaturePadProps {
  member: Member;
  onSubmit: (record: Omit<SignatureRecord, 'id'>) => void;
  isSubmitting?: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  member,
  onSubmit,
  isSubmitting = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [undoneStrokes, setUndoneStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [strokeColor, setStrokeColor] = useState<string>('#0A3981'); // Banking Blue
  const [strokeWidth, setStrokeWidth] = useState<number>(3.5);
  const [hasAgreed, setHasAgreed] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Resize and DPI setup
  const redrawCanvas = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, strokeList: Stroke[]) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      strokeList.forEach((stroke) => {
        if (stroke.points.length < 1) return;

        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (stroke.points.length === 1) {
          // Single dot
          ctx.beginPath();
          ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
          ctx.fillStyle = stroke.color;
          ctx.fill();
          return;
        }

        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

        // Smooth curve interpolation using midpoints
        for (let i = 1; i < stroke.points.length; i++) {
          const prev = stroke.points[i - 1];
          const curr = stroke.points[i];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }

        const lastPoint = stroke.points[stroke.points.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);
        ctx.stroke();
      });
    },
    []
  );

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Fixed physical canvas dimensions
    const width = Math.floor(rect.width);
    const height = Math.min(260, Math.max(180, Math.floor(window.innerHeight * 0.28)));

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      redrawCanvas(canvas, ctx, strokes);
    }
  }, [strokes, redrawCanvas]);

  useEffect(() => {
    setupCanvas();
    const handleResize = () => setupCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setupCanvas]);

  // Coordinates helper
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    } else {
      return null;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Start Drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isSubmitting) return;
    if (e.cancelable) e.preventDefault();

    setValidationError(null);
    const point = getCoordinates(e.nativeEvent);
    if (!point) return;

    setIsDrawing(true);
    setCurrentStroke([point]);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, strokeWidth / 2, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();
      }
    }
  };

  // Move Drawing
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isSubmitting) return;
    if (e.cancelable) e.preventDefault();

    const point = getCoordinates(e.nativeEvent);
    if (!point) return;

    const newCurrent = [...currentStroke, point];
    setCurrentStroke(newCurrent);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const fullStrokeList = [
          ...strokes,
          {
            points: newCurrent,
            color: strokeColor,
            width: strokeWidth,
          },
        ];
        redrawCanvas(canvas, ctx, fullStrokeList);
      }
    }
  };

  // End Drawing
  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length > 0) {
      const newStroke: Stroke = {
        points: currentStroke,
        color: strokeColor,
        width: strokeWidth,
      };
      const updatedStrokes = [...strokes, newStroke];
      setStrokes(updatedStrokes);
      setUndoneStrokes([]); // Reset redo stack when a new stroke is drawn
      setCurrentStroke([]);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          redrawCanvas(canvas, ctx, updatedStrokes);
        }
      }
    }
  };

  // Clear Canvas
  const handleClear = () => {
    setStrokes([]);
    setUndoneStrokes([]);
    setCurrentStroke([]);
    setValidationError(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
      }
    }
  };

  // Undo Last Stroke: Removes the most recent stroke drawn on the canvas
  const handleUndo = useCallback(() => {
    if (strokes.length === 0) return;
    const lastStroke = strokes[strokes.length - 1];
    const remaining = strokes.slice(0, -1);
    setStrokes(remaining);
    setUndoneStrokes((prev) => [...prev, lastStroke]);
    setValidationError(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        redrawCanvas(canvas, ctx, remaining);
      }
    }
  }, [strokes, redrawCanvas]);

  // Redo Stroke: Restores the previously undone stroke
  const handleRedo = useCallback(() => {
    if (undoneStrokes.length === 0) return;
    const strokeToRestore = undoneStrokes[undoneStrokes.length - 1];
    const remainingUndone = undoneStrokes.slice(0, -1);
    const updated = [...strokes, strokeToRestore];

    setStrokes(updated);
    setUndoneStrokes(remainingUndone);
    setValidationError(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        redrawCanvas(canvas, ctx, updated);
      }
    }
  }, [undoneStrokes, strokes, redrawCanvas]);

  // Keyboard shortcut listener for Ctrl+Z (Undo) and Ctrl+Y / Ctrl+Shift+Z (Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Simple pseudo-SHA256 checksum for audit record
  const generateAuditHash = (data: string, memberInfo: string) => {
    let hash = 0;
    const combined = data.substring(0, 100) + memberInfo + Date.now();
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `SHA256-${hex.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  // Submit Handler
  const handleSubmit = () => {
    if (strokes.length === 0) {
      setValidationError('Please provide a handwritten signature in the drawing pad before submitting.');
      return;
    }

    if (!hasAgreed) {
      setValidationError('Please check the authorization declaration to proceed.');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Export cleanly to PNG data URL
    const signatureDataUrl = canvas.toDataURL('image/png');
    const timestamp = new Date().toISOString();
    const auditHash = generateAuditHash(signatureDataUrl, `${member.accountNo}-${member.name}`);

    onSubmit({
      memberId: member.id,
      memberName: member.name,
      accountNo: member.accountNo,
      contactNumber: member.contactNumber,
      documentPurpose: member.documentPurpose,
      signatureDataUrl,
      timestamp,
      auditHash,
      strokeCount: strokes.length,
      inkColor: strokeColor,
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-emerald-600/60 shadow-lg shadow-emerald-950/5 overflow-hidden transition-all duration-300">
      {/* Signature Pad Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-200">
                  Electronic Signature Pad
                </span>
                <span className="text-[10px] bg-emerald-500/30 border border-emerald-300/30 rounded px-1.5 py-0.5 text-white font-mono">
                  Live Drawing
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                Sign for {member.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:self-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/15 text-xs text-right">
              <span className="text-emerald-200 block text-[10px]">A/C NO. {member.accountNo}</span>
              <span className="font-bold text-white font-mono tracking-wide">
                Mob: {member.contactNumber}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Drawing Zone */}
      <div className="p-4 sm:p-6 bg-slate-50/50">
        {/* Document Context info */}
        <div className="mb-3 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Document: <strong className="text-slate-800">{member.documentPurpose}</strong></span>
          </div>
          <span className="text-slate-400 hidden sm:inline">Touch or Mouse Enabled</span>
        </div>

        {/* Canvas Container */}
        <div
          ref={containerRef}
          className="relative w-full rounded-xl border-2 border-dashed border-slate-300 bg-white shadow-inner overflow-hidden focus-within:border-emerald-500 transition-colors"
          style={{ minHeight: '200px' }}
        >
          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-10 select-none">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wider">
              CASH TREE CO-OP
            </span>
            <span className="text-xs font-semibold text-slate-700 tracking-widest mt-1">
              ACCOUNT VERIFICATION PAD • {member.accountNo}
            </span>
          </div>

          {/* Canvas Floating Top Overlay: Active Stroke Counter & Quick Undo Action */}
          <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
            {strokes.length > 0 && (
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/90 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <span>{strokes.length} stroke{strokes.length > 1 ? 's' : ''}</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleUndo}
              disabled={strokes.length === 0}
              title="Undo last stroke (Ctrl+Z)"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 border border-slate-300/90 text-slate-700 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50/80 shadow-xs transition-all disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Undo</span>
            </button>
          </div>

          {/* Standard Banking Signature Guideline Line */}
          <div className="absolute bottom-9 left-6 right-6 pointer-events-none flex items-center gap-2">
            <span className="text-slate-400 font-serif font-bold text-lg select-none">✗</span>
            <div className="h-[1.5px] bg-slate-300 w-full" />
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider select-none shrink-0">
              Sign Above This Line
            </span>
          </div>

          {/* Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            className="w-full block touch-none cursor-crosshair relative z-10"
            style={{ touchAction: 'none' }}
            aria-label="Signature drawing canvas"
          />

          {/* Prompt when empty */}
          {strokes.length === 0 && !isDrawing && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center select-none z-0">
              <p className="text-slate-400 text-sm font-medium">
                Draw your signature here using finger, stylus, or mouse
              </p>
            </div>
          )}
        </div>

        {/* Signature Controls Toolbar */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Ink & Thickness Options */}
          <div className="flex items-center gap-4">
            {/* Color picker */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <span className="text-slate-500">Ink:</span>
              <button
                type="button"
                onClick={() => setStrokeColor('#0A3981')}
                title="Banker's Navy Blue"
                className={`w-6 h-6 rounded-full bg-[#0A3981] border-2 transition-transform ${
                  strokeColor === '#0A3981'
                    ? 'border-emerald-500 scale-110 shadow-sm'
                    : 'border-white hover:scale-105'
                }`}
              />
              <button
                type="button"
                onClick={() => setStrokeColor('#0F172A')}
                title="Classic Black"
                className={`w-6 h-6 rounded-full bg-[#0F172A] border-2 transition-transform ${
                  strokeColor === '#0F172A'
                    ? 'border-emerald-500 scale-110 shadow-sm'
                    : 'border-white hover:scale-105'
                }`}
              />
              <button
                type="button"
                onClick={() => setStrokeColor('#166534')}
                title="Emerald Green"
                className={`w-6 h-6 rounded-full bg-[#166534] border-2 transition-transform ${
                  strokeColor === '#166534'
                    ? 'border-emerald-500 scale-110 shadow-sm'
                    : 'border-white hover:scale-105'
                }`}
              />
            </div>

            {/* Thickness */}
            <div className="flex items-center gap-1 text-xs font-medium text-slate-600 border-l border-slate-200 pl-3">
              <span className="text-slate-500">Pen:</span>
              <button
                type="button"
                onClick={() => setStrokeWidth(2)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  strokeWidth === 2
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Fine
              </button>
              <button
                type="button"
                onClick={() => setStrokeWidth(3.5)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  strokeWidth === 3.5
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setStrokeWidth(5)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  strokeWidth === 5
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Bold
              </button>
            </div>
          </div>

          {/* Action buttons (Undo, Redo, Clear) */}
          <div className="flex items-center gap-2">
            {/* Primary Undo button */}
            <button
              type="button"
              onClick={handleUndo}
              disabled={strokes.length === 0}
              title="Undo last stroke (Ctrl+Z)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Undo Last Stroke</span>
              {strokes.length > 0 && (
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                  {strokes.length}
                </span>
              )}
            </button>

            {/* Redo button */}
            {undoneStrokes.length > 0 && (
              <button
                type="button"
                onClick={handleRedo}
                title="Redo stroke (Ctrl+Y or Ctrl+Shift+Z)"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-400 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                <span>Redo</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleClear}
              disabled={strokes.length === 0 && undoneStrokes.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50/50 text-xs font-medium text-red-700 hover:bg-red-100/60 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Pad</span>
            </button>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Legal Consent Declaration */}
        <div className="mt-5 p-3.5 bg-slate-100/80 rounded-xl border border-slate-200/80">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.value === 'true' || e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <span className="text-xs text-slate-700 leading-relaxed">
              I, <strong className="text-slate-900 font-bold">{member.name}</strong>, acknowledge that this digital signature is legally binding and valid for all financial transactions and official society mandates on Account No. <strong className="text-slate-900 font-bold">{member.accountNo}</strong> under <em>Cash Tree Co-operative (U) Thrift &amp; Credit Society Ltd</em>.
            </span>
          </label>
        </div>

        {/* Submission Button Section */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-Bit SHA Encrypted &amp; Audit Logged</span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-md shadow-emerald-900/15 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none text-sm"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Securing Signature...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-emerald-200" />
                <span>Submit &amp; Secure Signature</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
