import { Vortex } from 'react-loader-spinner';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      React homework template
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
    </div>
  );
};
