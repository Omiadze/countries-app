import styles from './details.module.css';

import { useParams } from 'react-router-dom';

import { getCountryWithId } from '@/api/countries';
import { useQuery } from '@tanstack/react-query';
// type Countries = {
//   img: string;
//   name: string;
//   population: string;
//   capital: string;
//   info: string;
// };
const DetailsPage: React.FC = () => {
  // const [country, setCountry] = useState<Countries | null>(null);
  const { id } = useParams();
  console.log(id);
  // const location = useLocation();
  // const { country } = location.state;
  // useEffect(() => {
  //   axios.get(`http://localhost:3000/countries/${id}`).then((res) => {
  //     console.log(res.data);
  //     setCountry(res.data);
  //   });
  // }, [id]);
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['countries-list', id],
    queryFn: () => getCountryWithId(id as string),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>ERROR 404</div>;
  }

  return (
    <div className={styles['details-container']}>
      <div className={styles['details-content']}>
        <h1>{country?.name}</h1>
        <p>Population: {country?.population}</p>
        <p>Capital: {country?.capital}</p>
        <p>Details: {country?.info}</p>
      </div>
      <img src={country?.img} alt={country?.name} />
    </div>
  );
};

export default DetailsPage;
