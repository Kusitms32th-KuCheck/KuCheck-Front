'use client'

type InputFieldProps = {
  label: string
  placeholder?: string
  children?: React.ReactNode
}

export default function InputField({ label, placeholder, children }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="body-lg-semibold block">{label}</label>
      {children ? (
        children
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="placeholder:body-lg-medium focus:ring-primary-500 w-full rounded-[8px] border border-gray-300 px-3 py-[10px] placeholder:text-gray-400 focus:ring-1 focus:outline-none"
        />
      )}
    </div>
  )
}
