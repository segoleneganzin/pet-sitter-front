import { useState, useEffect, useMemo } from 'react';
import SittersFilter from '../layouts/SittersFilter';
import SittersHero from '../layouts/SittersHero';
import SittersList from '../layouts/SittersList';
import { I_SitterDocument } from '../models/sitter';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import {
  getAllSittersAsync,
  resetSittersStatus,
  selectSittersError,
  selectSitters,
  selectSittersStatus,
} from '../features/sittersSlice';
import PageLayout from '../layouts/PageLayout';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Button from '../components/Button';

const Sitters = () => {
  const dispatch = useAppDispatch();
  const [sitters, setSitters] = useState<I_SitterDocument[] | null>([]);
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
    return <Loader />;
  }

  if (sittersStatus === 'failed') {
    return <Error textError={sittersError} />;
  }

  return (
    <PageLayout mainClassName='sitters'>
      <SittersHero />
      {isFilterOpen ? (
        <SittersFilter
          setSitters={setSitters}
          originalSitters={sittersFromStore}
        />
      ) : (
        <Button handleClick={() => setIsFilterOpen(true)} content='Filter' />
      )}
      <SittersList sitters={sitters} />
    </PageLayout>
  );
};

export default Sitters;
