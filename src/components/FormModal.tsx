import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Generic field definition for form fields
export type FormField = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  rows?: number;
  validation?: {
    required?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
  };
};

// Props for the ReusableModalForm component
interface ReusableModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  title: string;
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
  initialValues?: Record<string, any>;
  className?: string;
}

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  initialValues = {},
  className = '',
}: ReusableModalFormProps) => {
  const [formValues, setFormValues] = React.useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Reset form when modal is opened with new initialValues
  React.useEffect(() => {
    if (isOpen) {
      setFormValues(initialValues);
      setErrors({});
    }
  }, [isOpen, initialValues]);

  const validateField = (field: FormField, value: any): string | undefined => {
    if (!field.validation) return undefined;

    const { validation } = field;

    if (validation.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return validation.required || `${field.label} is required`;
    }

    if (validation.min !== undefined && Number(value) < validation.min) {
      return `${field.label} must be at least ${validation.min}`;
    }

    if (validation.max !== undefined && Number(value) > validation.max) {
      return `${field.label} cannot exceed ${validation.max}`;
    }

    if (validation.minLength !== undefined && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    if (validation.maxLength !== undefined && value.length > validation.maxLength) {
      return `${field.label} cannot exceed ${validation.maxLength} characters`;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      return `${field.label} has an invalid format`;
    }

    if (validation.custom) {
      return validation.custom(value);
    }

    return undefined;
  };

  const handleChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));

    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const value = formValues[field.id];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      onSubmit(formValues);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 ${className}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(field => (
                <div key={field.id} className="space-y-1">
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.validation?.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {field.type === 'select' && (
                    <select
                      id={field.id}
                      value={formValues[field.id] || ''}
                      onChange={e => handleChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">
                        {field.placeholder || `Select ${field.label.toLowerCase()}`}
                      </option>
                      {field.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      id={field.id}
                      value={formValues[field.id] || ''}
                      onChange={e => handleChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field.placeholder}
                      rows={field.rows || 3}
                    />
                  )}

                  {field.type === 'checkbox' && (
                    <div className="flex items-center">
                      <input
                        id={field.id}
                        type="checkbox"
                        checked={!!formValues[field.id]}
                        onChange={e => handleChange(field.id, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{field.placeholder}</span>
                    </div>
                  )}

                  {(field.type === 'text' || field.type === 'number' || field.type === 'date') && (
                    <input
                      id={field.id}
                      type={field.type}
                      value={formValues[field.id] || ''}
                      onChange={e =>
                        handleChange(
                          field.id,
                          field.type === 'number'
                            ? e.target.value
                              ? Number(e.target.value)
                              : ''
                            : e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field.placeholder}
                    />
                  )}

                  {errors[field.id] && <p className="text-sm text-red-500">{errors[field.id]}</p>}
                </div>
              ))}

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {cancelLabel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : submitLabel}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;
