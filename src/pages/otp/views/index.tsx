import OtpInputs from '../components/otp';

const FavoritesPage = () => {
  const inputNumber: number = 5;
  return (
    <div>
      <OtpInputs inputNumber={inputNumber} />
    </div>
  );
};

export default FavoritesPage;
