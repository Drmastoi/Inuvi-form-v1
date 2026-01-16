
import React from 'react';
import { YesNo } from '../types';

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (val: any) => void;
  options?: { label: string; value: string }[];
  description?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  options = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }],
  description
}) => (
  <div className="mb-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <label className="block font-medium text-slate-700">{label}</label>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-6 py-2 rounded-lg border transition-all ${
              value === opt.value 
                ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-blue-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  suffix?: string;
}> = ({ label, value, onChange, placeholder, type = 'text', suffix }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
      />
      {suffix && (
        <span className="absolute right-3 top-2 text-slate-400 text-sm">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

export const TextArea: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[100px] placeholder:text-slate-400"
    />
  </div>
);

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8 border-b border-slate-100 pb-4">
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
  </div>
);
