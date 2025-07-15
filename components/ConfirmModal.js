"use client";
export default function ConfirmModal({ title, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-2xl shadow-xl p-8 max-w-sm text-center space-y-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
