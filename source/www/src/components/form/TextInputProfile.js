import React from 'react';
import TextInput from './TextInput';

const styles = {
  container: {  },
  text: {
    width: '100%',
    padding: 8,
    fontSize: 16,
    outline: 'none',
    textAlign: 'right',
  },
};

const TextInputProfile = (props) => (
  <TextInput
    containerStyle={styles.container}
    style={styles.text}
    {...props}
  />
);

export default TextInputProfile;
