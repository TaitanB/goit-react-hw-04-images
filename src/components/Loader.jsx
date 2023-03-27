import { Vortex } from 'react-loader-spinner';

export const Loader = () => (
  <Vortex
    visible={true}
    height="80"
    width="80"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['#7994b9', 'blue', '#7994b9', 'blue', 'blue', '#7994b9']}
  />
);
