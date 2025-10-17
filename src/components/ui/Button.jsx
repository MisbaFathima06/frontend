// src/components/ui/Button.jsx
export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
