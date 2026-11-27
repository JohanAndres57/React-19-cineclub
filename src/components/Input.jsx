// Reto React 19 (RT-06): ref llega como una prop normal, sin forwardRef.
// "as" permite usarlo como input, textarea o select.
export default function Input({ label, id, error, ref, as: Tag = 'input', className = '', children, ...props }) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1 block w-full rounded-md border p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      >
        {children}
      </Tag>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
