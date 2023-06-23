import { useEffect, useState } from "react";

export interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState('');
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        onChange(inputValue);
      }, 500);
      return () => clearTimeout(timeoutId);
    }, [inputValue, 500]);

    useEffect(() => {
        if (value && value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);
  
    return <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} />;
  };
  