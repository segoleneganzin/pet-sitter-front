import { useState, useEffect, useMemo } from 'react';
import SittersFilter from '../layouts/SittersFilter';
import SittersHero from '../layouts/SittersHero';
import SittersList from '../layouts/SittersList';
import { I_Sitter } from '../models/sitter';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import {
  clearSitter,
  getAllSittersAsync,
  selectSitter,
  selectSitters,
} from '../features/sitterSlice';
import PageLayout from '../layouts/PageLayout';

const Sitters = () => {
  const dispatch = useAppDispatch();
  const [sitters, setSitters] = useState<I_Sitter[] | null>([]);

  const sitterFromStore = useAppSelector((state) => selectSitter(state));
  const sittersFromStore = useAppSelector((state) => selectSitters(state));
  // Memoize originalSitters to prevent unnecessary recalculation
  const originalSitters = useMemo(() => sittersFromStore, [sittersFromStore]);

  useEffect(() => {
    if (sitterFromStore) {
      dispatch(clearSitter());
    }
  }, [dispatch, sitterFromStore]);

  useEffect(() => {
    if (sittersFromStore.length === 0) {
      dispatch(getAllSittersAsync());
    }
  }, [dispatch, sittersFromStore]);

  // Update the sitters state whenever originalSitters changes
  useEffect(() => {
    setSitters(originalSitters);
  }, [originalSitters]);

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
