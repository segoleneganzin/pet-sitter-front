import { useState, useEffect, useMemo } from 'react';
import SittersFilter from '../layouts/SittersFilter';
import SittersHero from '../layouts/SittersHero';
import SittersList from '../layouts/SittersList';
import { I_Sitter } from '../models/Sitter';
import { useAppDispatch, useAppSelector } from '../utils/reduxHooks';
import { getAllSittersAsync, selectSitters } from '../features/sitterSlice';

const Sitters = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllSittersAsync());
  }, [dispatch]);

  const sittersFromStore = useAppSelector((state) => selectSitters(state));

  // Memoize originalSitters to prevent unnecessary recalculation
  const originalSitters = useMemo(() => sittersFromStore, [sittersFromStore]);

  const [sitters, setSitters] = useState<I_Sitter[] | null>([]);

  // Update the sitters state whenever originalSitters changes
  useEffect(() => {
    setSitters(originalSitters);
  }, [originalSitters]);

  return (
    <>
      <SittersHero />
      <SittersFilter
        setSitters={setSitters}
        originalSitters={sittersFromStore}
      />
      <SittersList sitters={sitters} />
    </>
  );
};

export default Sitters;
