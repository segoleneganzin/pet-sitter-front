import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/reduxHooks';
import { getSitterAsync, selectSitter } from '../features/sitterSlice';
import { I_Sitter } from '../models/Sitter';

const Sitter = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const [sitter, setSitter] = useState<I_Sitter | null>();

  useEffect(() => {
    if (id) {
      dispatch(getSitterAsync(id));
    }
  }, [dispatch, id]);

  const sitterFromStore = useAppSelector((state) => selectSitter(state));

  const originalSitter = useMemo(() => sitterFromStore, [sitterFromStore]);

  useEffect(() => {
    setSitter(originalSitter);
  }, [originalSitter]);

  return (
    <div>
      {sitter ? (
        <div>
          <h1>
            {sitter.firstName} {sitter.lastName}
          </h1>
          <p>{sitter.city}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Sitter;
