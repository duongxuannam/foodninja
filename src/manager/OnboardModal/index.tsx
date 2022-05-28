import React from 'react';
import {useSelector} from 'store/index';
import OnboardModalCpn from './OnboardModal';

const OnboardModal = () => {
  const onboard = useSelector(state => state.app.onboard);
  return onboard ? null : <OnboardModalCpn />;
};

export default OnboardModal;
