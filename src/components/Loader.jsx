import { Vortex } from 'react-loader-spinner';

export const Loader = () => (
  <Vortex
    visible={true}
    height="80"
    width="80"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={[
      'rgb(97 188 213)',
      'blue',
      'rgb(97 188 213)',
      'blue',
      'blue',
      'rgb(97 188 213)',
    ]}
  />
);
