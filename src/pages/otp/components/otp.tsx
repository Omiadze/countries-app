import styles from '@/pages/otp/components/otp.module.css';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

type TypeForInputNumber = {
  inputNumber: number;
};
const OtpInputs: React.FC<TypeForInputNumber> = ({ inputNumber }) => {
  const [inputValues, setInputValues] = useState(Array(inputNumber).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const handleOnChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value.replace(/\D/g, ''); //ამ ცვლადში ვინახავ მხოლოდ ციფრებს, დანარჩენი რაც ციფრი არ არის ვშლი
    if (newValue.length > 1) return;

    const updateInputValue = [...inputValues];
    updateInputValue[index] = newValue;
    setInputValues(updateInputValue);

    if (newValue) {
      if (index === inputNumber - 1) {
        inputRefs.current[index]?.blur(); //თუ ბოლო ინფუთზე ვდგავართ ფოკუსი უნდა მოშორდეს
      } else if (index < inputNumber) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleOnKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace' && inputValues[index] === '') {
      // ინფუთებიდან ციფრების წაშლის ფუნქციონალი
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ჩაკოპირების ფუნქციონალი (ისევ და ისევ მხოლოდ ციფრები)
  const handlePaste = (
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const pasteData = event.clipboardData.getData('text').replace(/\D/g, '');

    const updatedValues = [...inputValues];

    for (let i = 0; i < pasteData.length && index < inputNumber; i++) {
      updatedValues[index] = pasteData[i];
      index++;
    }

    setInputValues(updatedValues);

    const nextIndex = Math.min(index, inputNumber - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={styles['input-div']}>
      {Array.from({ length: inputNumber }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="tel"
          className={styles['input-el']}
          value={inputValues[i]}
          onChange={(event) => handleOnChange(i, event)}
          onKeyDown={(event) => handleOnKeyDown(i, event)}
          onPaste={(event) => handlePaste(i, event)}
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OtpInputs;
