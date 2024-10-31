import OtpInputs from '../components/otp';

const FavoritesPage = () => {
  // const inputNumber: number = 5;
  const inputNumString: string | null = prompt(
    'How many inputs would you like to have? (Number must be less than 16):'
  );
  const inputNumber =
    inputNumString !== null && +inputNumString < 15 ? +inputNumString : 0;

  return (
    <div>
      <OtpInputs inputNumber={+inputNumber} />
    </div>
  );
};

export default FavoritesPage;
