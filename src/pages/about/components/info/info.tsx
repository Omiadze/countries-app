import aboutImage from '@components/assets/about.jpg';
import styles from './info.module.css';
import { useParams } from 'react-router-dom';

const Info: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();

  return (
    <>
      <div>
        <img
          className={styles['about-img']}
          src={aboutImage}
          alt="About Countrymania"
        />
      </div>
      <div className={styles['about-text-container']}>
        {lang === 'eng' ? (
          <>
            <div className={styles['about-text']}>
              <p>
                Explore with Ease: Our user-friendly interface makes it easy to
                navigate through countries, view stunning images, and access
                valuable information at your fingertips.
              </p>
            </div>
            <div className={styles['about-text']}>
              <p>
                Stay Updated: We regularly update our content to ensure that you
                have the latest information and trends about countries, making
                CountryMania a reliable resource.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={styles['about-text']}>
              <p>
                მარტივად აღმოაჩინეთ: ჩვენი მარტივი ინტერფეისი გაწვდობთ
                საშუალებას გაწვდოთ ქვეყნების ინფორმაციის გაგება, ნახოთ მშვენიერი
                სურათები და მიიღოთ ღირებული ინფორმაცია ხელმისაწვდომობაში.
              </p>
            </div>
            <div className={styles['about-text']}>
              <p>
                დარჩით განახლებულ: ჩვენ რეგულარულად განვახლებთ ჩვენს შინაარსს,
                რომ უზრუნველვყოთ თქვენთვის ბოლო ინფორმაცია და ტენდენციები
                ქვეყნების შესახებ, რაც CountryMania-ს საიმედო წყაროა.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Info;
