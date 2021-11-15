import { useAppDispatch } from '../app/hooks';
import { initializeBurgers } from '../features/burgers/burgersSlice';
import { initializeStatus, setLoading } from '../features/status/statusSlice';
import * as helpers from '../helpers';

export const useModalHandler = ({ stopAudio }: { stopAudio: () => void }) => {
  const dispatch = useAppDispatch();

  const handleRestart = () => {
    initializeGame({ withWelcomeScreen: false });
  };
  const handleExit = () => {
    stopAudio();
    initializeGame({ withWelcomeScreen: true });
  };

  const initializeGame = ({
    withWelcomeScreen,
  }: {
    withWelcomeScreen: boolean;
  }) => {
    dispatch(setLoading());
    helpers.setTimeoutWithRequestAnimationFrame(() => {
      dispatch(initializeStatus({ withWelcomeScreen }));
      dispatch(initializeBurgers());
    }, 100);
  };
  return { handleRestart, handleExit };
};
