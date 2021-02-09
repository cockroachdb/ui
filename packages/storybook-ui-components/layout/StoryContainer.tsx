import React, { FunctionComponent } from 'react';

const StoryContainer: FunctionComponent = ({ children }) => (
  <section
    style={{
      marginLeft: '25px',
      fontFamily: "'Source Sans Pro', sans-serif",
      color: '#394455',
    }}
  >
    {children}
  </section>
);

export default StoryContainer;
