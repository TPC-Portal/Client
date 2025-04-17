// components/ui/input.js
export function Input({ type, className, ...props }) {
    return (
        <input
            type={type}
            className={`border rounded-lg p-2 text-sm w-full ${className}`}
            {...props}
        />
    );
}
