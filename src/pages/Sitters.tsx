import { useState, useEffect, useMemo } from 'react';
import SittersFilter from '../layouts/sitters/SittersFilter';
import SittersHero from '../layouts/sitters/SittersHero';
import SittersList from '../layouts/sitters/SittersList';
import { I_UserDocument } from '../interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  getAllSittersAsync,
  resetSittersStatus,
  selectSittersError,
  selectSitters,
  selectSittersStatus,
} from '../features/sittersSlice';
import PageLayout from '../layouts/templates/PageLayout';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Button from '../components/Button';

const Sitters = () => {
  const dispatch = useAppDispatch();
  const [sitters, setSitters] = useState<I_UserDocument[] | null>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const sittersFromStore = useAppSelector(selectSitters);
  const sittersStatus = useAppSelector(selectSittersStatus);
  const sittersError = useAppSelector(selectSittersError);

  // Memoize originalSitters to prevent unnecessary recalculation
  const originalSitters = useMemo(() => sittersFromStore, [sittersFromStore]);

  useEffect(() => {
    if (sittersFromStore.length === 0 && sittersStatus === 'idle') {
      dispatch(getAllSittersAsync());
    }
    if (sittersStatus === 'succeeded') {
      setSitters(sittersFromStore);
      dispatch(resetSittersStatus());
    }
  }, [dispatch, sittersFromStore, sittersStatus]);

  // Update the sitters state whenever originalSitters changes
  useEffect(() => {
    setSitters(originalSitters);
  }, [originalSitters]);

  if (sittersStatus === 'loading') {
    return (
      <PageLayout mainClassName='sitters'>
        <Loader />
      </PageLayout>
    );
  }

  if (sittersStatus === 'failed') {
    return (
      <PageLayout mainClassName='sitters'>
        <Error textError={sittersError} />
      </PageLayout>
    );
  }

  return (
    <PageLayout mainClassName='sitters'>
      <SittersHero />
      <div className='sitters__main-content'>
        {isFilterOpen ? (
          <SittersFilter
            setSitters={setSitters}
            originalSitters={sittersFromStore}
            setIsFilterOpen={setIsFilterOpen}
          />
        ) : (
          <Button handleClick={() => setIsFilterOpen(true)} content='Filtrer' />
        )}
        <SittersList sitters={sitters} />
      </div>
    </PageLayout>
  );
};

export default Sitters;
