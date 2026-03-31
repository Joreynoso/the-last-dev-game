interface ConfirmModalProps {
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  return (
    <div style={{ minHeight: "400px", background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}
      className="fixed inset-0 z-50">
      <div className="glass border border-zinc-800 rounded-2xl p-8 max-w-md w-full mx-6 space-y-6 animate-in zoom-in-95 duration-300">
        <div className="space-y-2 text-center">
          <p className="text-3xl">⚠️</p>
          <h2 className="text-xl font-black uppercase tracking-tight text-zinc-50">{title}</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-xl border border-red-800 text-red-400 font-bold uppercase tracking-widest text-xs hover:bg-red-950/30 transition-all"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 rounded-xl btn-primary"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  )
}