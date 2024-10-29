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
    const newValue = event.target.value.replace(/\D/g, '');
    if (newValue.length > 1) return;

    const updateInputValue = [...inputValues];
    updateInputValue[index] = newValue;
    setInputValues(updateInputValue);

    if (index < inputNumber) {
      if (newValue) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleOnKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace' && inputValues[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };
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

  // for (let i = 0; i < inputNumber; i++) {
  //   inputs.push(
  //     <input
  //       className={styles['input-el']}
  //       onChange={handleOnChange}
  //       key={i}
  //       type="text"
  //       minlength="1"
  //       maxlength="1"
  //       pattern="[0-9]"
  //     />
  //   );
  // }

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
