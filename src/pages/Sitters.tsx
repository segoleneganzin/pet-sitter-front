import { useState, useEffect, useMemo } from 'react';
import SittersFilter from '../layouts/SittersFilter';
import SittersHero from '../layouts/SittersHero';
import SittersList from '../layouts/SittersList';
import { I_SitterDocument } from '../models/sitter';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import {
  getAllSittersAsync,
  resetSitterStatus,
  selectSitterError,
  selectSitters,
  selectSitterStatus,
} from '../features/sitterSlice';
import PageLayout from '../layouts/PageLayout';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Sitters = () => {
  const dispatch = useAppDispatch();
  const [sitters, setSitters] = useState<I_SitterDocument[] | null>([]);

  const sittersFromStore = useAppSelector(selectSitters);
  const sitterStatus = useAppSelector(selectSitterStatus);
  const sitterError = useAppSelector(selectSitterError);

  // Memoize originalSitters to prevent unnecessary recalculation
  const originalSitters = useMemo(() => sittersFromStore, [sittersFromStore]);

  useEffect(() => {
    if (sittersFromStore.length === 0) {
      dispatch(getAllSittersAsync());
    }
  }, [dispatch, sittersFromStore]);

  useEffect(() => {
    if (sitterStatus === 'succeeded') {
      dispatch(resetSitterStatus());
    }
  }, [dispatch, sitterStatus]);

  // Update the sitters state whenever originalSitters changes
  useEffect(() => {
    setSitters(originalSitters);
  }, [originalSitters]);

  if (sitterStatus === 'loading') {
    return <Loader />;
  }

  if (sitterStatus === 'failed') {
    return <Error textError={sitterError} />;
  }

  return (
    <PageLayout>
      <SittersHero />
      <SittersFilter
        setSitters={setSitters}
        originalSitters={sittersFromStore}
      />
      <SittersList sitters={sitters} />
    </PageLayout>
  );
};

export default Sitters;
