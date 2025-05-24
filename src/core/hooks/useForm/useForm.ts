import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export const useForm = <T extends Record<string, any>>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [formDataError, setFormDataError] = useState<Partial<Record<keyof T, string>>>({});
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  // Función para manejar cambios en los inputs de React Native
  const handleChange = (name: keyof T) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Alternativa para manejar el evento directamente desde TextInput
  const handleInputChange = (
    name: keyof T
  ) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = e.nativeEvent;
    setFormData(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleSubmit = (
    onSubmit: () => Promise<void> | void
  ) => async () => {
    const validateErrors = validateForm(formData);

    if (Object.keys(validateErrors).length > 0) {
      setFormDataError(validateErrors);
      setTimeout(() => {
        setFormDataError({});
      }, 10000);
      return;
    }

    try {
      await onSubmit();
      resetFormData();
      setFormDataError({});
    } catch (error) {
      console.error('Error en submit:', error);
    }
  };

  const resetFormData = () => {
    setFormData(initialData);
  };

  const toggleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const validateForm = (data: T) => {
    const errors: Partial<Record<keyof T, string>> = {};

    Object.keys(data).forEach((fieldName) => {
      if (!data[fieldName]) {
        (errors as any)[fieldName] = 'Este campo es obligatorio';
      }

      if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data[fieldName])) {
          (errors as any)[fieldName] = 'El email no es válido';
        }
      }

      if (fieldName === 'password') {
        const passwordRegex = 
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%"*?&])[A-Za-z\d@$!"#%*?&]{8,14}$/;
        if (!passwordRegex.test(data[fieldName])) {
          (errors as any)[fieldName] =
            'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial';
        }
      }
    });

    return errors;
  };

  return {
    formData,
    isVisiblePassword,
    formDataError,
    handleChange,
    handleInputChange,
    resetFormData,
    toggleVisiblePassword,
    handleSubmit,
    setFormData, // Para casos donde necesites sobrescribir todo el formData
  };
};