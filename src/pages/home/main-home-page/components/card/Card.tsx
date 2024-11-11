import React, { useRef, useState } from 'react';
import { CardContent } from '@/pages/home/main-home-page/components/card/content';
import { CardHeader } from '@/pages/home/main-home-page/components/card/header';
import { CardImg } from '@/pages/home/main-home-page/components/card/image';
import styles from '@/pages/home/main-home-page/components/card/card.module.css';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Inputs from './country-input/inputs';

import {
  addCountry,
  deleteCountry,
  getCountries,
  // getCountriesInfiniteScroll,
  getSortedCountries,
  updateCountry,
} from '@/api/countries';
import {
  // useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';

type Country = {
  id: string;
  img: string;
  name: string;
  population: string;
  capital: string;
  info: string;
  votes: number;
  isDeleted: boolean;
  nameKa: string;
  infoKa: string;
  capitalKa: string;
};

const Card: React.FC = () => {
  const { lang } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isSorting, setIsSorting] = useState(false);
  // const [countryData, setCountryData] = useState<Country[]>([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [displaySureDiv, setDisplaySureDiv] = useState(false);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [editCountryData, setEditCountryData] = useState<Country | null>(null);
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const [addNewCountry, setAddNewCountry] = useState({
    img: '',
    name: '',
    population: '',
    capital: '',
    info: '',
    nameKa: '',
    capitalKa: '',
    infoKa: '',
  });
  const updateFormRef = useRef<HTMLFormElement | null>(null);
  const virtualizerRef = useRef<HTMLDivElement>(null);
  // Get the sorting parameters from the search params
  const sortname = searchParams.get('sortname') || 'votes';
  const sortType = searchParams.get('sortType') || 'asc';

  // using useQuery to get all countries I want to show in my project
  const {
    data: initialData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['countries-list'],
    queryFn: getCountries,
    retry: 0,
    refetchOnWindowFocus: false,
  });
  // useInfiniteQuery
  // const {
  //   data: initialData,
  //   status,
  //   fetchNextPage,
  //   isFetchingNextPage,
  //   hasNextPage,
  //   refetch,
  // } = useInfiniteQuery({
  //   queryKey: ['countries-infinite'],
  //   queryFn: getCountriesInfiniteScroll,
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages) => {
  //     // Logic for fetching next page
  //     return lastPage.length ? allPages.length + 1 : undefined;
  //   },
  // });

  // console.log(data);
  const { data: sortedData, refetch: refetchSort } = useQuery({
    queryKey: ['sorted-countries', sortname, sortType],
    queryFn: () => getSortedCountries(sortname, sortType),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCountry, isPending: updateCountryIsPending } =
    useMutation({
      mutationFn: updateCountry,
      onSuccess: () => {
        refetch();
        refetchSort();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  // useMutation for delete
  const { mutate: mutateDeleteCountry, isPending: deleteCountryIsPending } =
    useMutation({
      mutationFn: deleteCountry,
      onSuccess: () => {
        refetch();
        refetchSort();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  // useMutation for add
  const { mutate: mutateaddCountry, isPending: addCountryIsPending } =
    useMutation({
      mutationFn: addCountry,
      onSuccess: () => {
        refetch();
        refetchSort();
      },
      onError: (error) => {
        console.log(error);
      },
    });

  // handling events
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'name' && value.length > 10) {
      setInputErrorMessage('The name should not be longer than 10 letters');
    } else {
      setInputErrorMessage('');
      setAddNewCountry((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const countryObj: Omit<Country, 'id' | 'isDeleted'> = {
      img: '',
      name: '',
      population: '',
      capital: '',
      info: '',
      nameKa: '',
      infoKa: '',
      capitalKa: '',
      votes: 0,
    };

    for (const [key, value] of formData) {
      if (key === 'img') {
        const file = value as File;
        const base64String = await convertToBase64(file);
        countryObj.img = base64String;
      } else {
        countryObj[key as keyof Omit<Country, 'id' | 'votes' | 'isDeleted'>] =
          value as string;
      }
    }

    mutateaddCountry(countryObj);
    setAddNewCountry({
      img: '',
      name: '',
      population: '',
      capital: '',
      info: '',
      nameKa: '',
      capitalKa: '',
      infoKa: '',
    });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleInputChanges = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = event.target;

    if (name === 'img' && files && files[0]) {
      console.log('files', files);
      const base64String = await convertToBase64(files[0]);
      setEditCountryData((prevData) => ({
        ...prevData!,
        img: base64String,
      }));
    } else {
      setEditCountryData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editCountryData) return;

    console.log(editCountryData.img);

    const updatedData = {
      name: editCountryData.name,
      population: editCountryData.population,
      capital: editCountryData.capital,
      info: editCountryData.info,
      img: editCountryData.img,
    };

    // using mutation to update country
    mutateUpdateCountry({ id: updateId, payload: updatedData });
    setDisplayForm(false);
    setUpdateId(null);
    setEditCountryData(null);
  };

  const handleDeleteBtn = (id: string) => {
    mutateUpdateCountry({ id: id, payload: { isDeleted: true } });
    setDisplaySureDiv(!displaySureDiv);
    setUpdateId(id);
    // console.log(countryData);
  };

  const handleDeleteYesBtn = () => {
    // axios.delete(`http://localhost:3000/countries/${updateId}`).then(() => {
    //   setCountryData((prev) => prev.filter((country) => !country.isDeleted));
    // });
    if (updateId) {
      mutateDeleteCountry(updateId);
      setDisplaySureDiv(!displaySureDiv);
      setUpdateId(null);
    }
  };

  const handleDeleteNoBtn = () => {
    mutateUpdateCountry(
      { id: updateId, payload: { isDeleted: false } },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
    setDisplaySureDiv(!displaySureDiv);
    setUpdateId(null);
  };

  const openUpdateForm = (country: Country) => {
    setUpdateId(country.id);
    setDisplayForm(true);
    setEditCountryData(country);
    setTimeout(() => {
      if (updateFormRef.current) {
        updateFormRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 0);
  };
  // Virtualizer setup
  const rowVirtualizer = useVirtualizer({
    count: initialData?.length || 0,
    // count: initialData
    //   ? initialData.pages.reduce((acc, page) => acc + page.length, 0)
    //   : 0,
    getScrollElement: () => virtualizerRef.current,
    estimateSize: () => 600,
  });
  const virtualItems = rowVirtualizer.getVirtualItems();
  // sort country data
  const sortIncreasing = () => {
    setSearchParams({ sortname: 'votes', sortType: 'asc' });
    refetchSort();
    refetch();
    setIsSorting(true);
  };
  const sortDecreasing = () => {
    setSearchParams({ sortname: '-votes', sortType: 'desc' });
    refetchSort();
    refetch();
    setIsSorting(true);
  };
  // const onScroll = (e) => {
  //   if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
  //     if (hasNextPage && !isFetchingNextPage) {
  //       fetchNextPage();
  //     }
  //   }
  // };

  return (
    <div>
      <div>
        <button onClick={sortIncreasing} className={styles.sortBtn}>
          Sort by Votes (Increasing)
        </button>
        <button onClick={sortDecreasing} className={styles.sortBtn}>
          Sort by Votes (Decreasing)
        </button>
      </div>
      <div
        className={displaySureDiv ? styles['overlay'] : styles['none-sure-div']}
      ></div>
      <div
        className={
          displaySureDiv ? styles['display-sure-div'] : styles['none-sure-div']
        }
      >
        <h1>You Sure You Want To Delete?</h1>
        <button
          className={styles['btn']}
          onClick={handleDeleteYesBtn}
          disabled={deleteCountryIsPending}
        >
          Yes
        </button>
        <button className={styles['btn']} onClick={handleDeleteNoBtn}>
          No
        </button>
      </div>
      <div className={styles['search-div']}>
        <form id="searchForm">
          <input type="text" />
          <button type="submit">
            {lang === 'eng' ? 'Clear Search' : 'ძიების გასუფთავება'}
          </button>
        </form>
      </div>
      {displayForm && editCountryData && (
        <div className={styles.display}>
          <form ref={updateFormRef} onSubmit={handleSaveChanges}>
            <label>
              Update Image
              <input
                type="file"
                name="img"
                accept=".jpg, .jpeg, .png"
                onChange={handleInputChanges}
                // required
              />
            </label>
            <label>
              Update Name:
              <input
                type="text"
                name="name"
                value={editCountryData.name}
                onChange={handleInputChanges}
              />
            </label>
            <label>
              Update Capital:
              <input
                type="text"
                name="capital"
                value={editCountryData.capital}
                onChange={handleInputChanges}
              />
            </label>
            <label>
              Update Population:
              <input
                type="text"
                name="population"
                value={editCountryData.population}
                onChange={handleInputChanges}
              />
            </label>
            <label>
              Update Info:
              <input
                type="text"
                name="info"
                value={editCountryData.info}
                onChange={handleInputChanges}
              />
            </label>
            <button
              className={styles['btn']}
              type="submit"
              disabled={updateCountryIsPending}
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      <div
        // className={styles['cards-container']}
        ref={virtualizerRef}
        // onScroll={onScroll}
        style={{ overflow: 'auto', height: '1000px' }}
      >
        {isLoading ? (
          <h1>Loading</h1>
        ) : isError ? (
          <h1>ERROR 404</h1>
        ) : (
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualItems.map((virtualRow) => {
              const item = isSorting
                ? sortedData?.[virtualRow.index]
                : (initialData?.[virtualRow.index] as Country);
              if (!item) return null;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) {
                      rowVirtualizer.measureElement(el);
                    }
                  }}
                  data-index={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: virtualRow.start,
                    left: 0,
                    width: '100%',
                    height: virtualRow.size,
                  }}
                  className={
                    item.isDeleted
                      ? styles['removed-card-div']
                      : styles['card-div']
                  }
                >
                  <div className={styles['virtual-card-divs']}>
                    <CardHeader
                      id={item.id}
                      votes={item.votes}
                      refetch={refetch}
                      // onVote={() => handleVotes(item.id)}
                    />
                    <Link to={`/${lang}/country/${item.id}`}>
                      <CardImg img={item.img} />
                      <hr />
                      <CardContent
                        name={lang === 'eng' ? item.name : item.nameKa}
                        population={item.population}
                        capital={lang === 'eng' ? item.capital : item.capitalKa}
                      />
                    </Link>
                    <button
                      className={styles['btn']}
                      onClick={() => handleDeleteBtn(item.id)}
                    >
                      {lang === 'eng'
                        ? `${item.isDeleted ? 'Undo' : 'Delete'}`
                        : `${item.isDeleted ? 'დაბრუნება' : 'წაშლა'}`}
                    </button>
                    <button
                      className={styles['btn']}
                      onClick={() => openUpdateForm(item)}
                    >
                      {lang === 'eng' ? 'Update' : 'განახლება'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <Inputs
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          inputErrorMessage={inputErrorMessage}
          name={addNewCountry.name}
          population={addNewCountry.population}
          capital={addNewCountry.capital}
          info={addNewCountry.info}
          nameKa={addNewCountry.nameKa}
          capitalKa={addNewCountry.capitalKa}
          infoKa={addNewCountry.infoKa}
          addCountryIsPending={addCountryIsPending}
        />
      </div>
    </div>
  );
};

export default Card;
