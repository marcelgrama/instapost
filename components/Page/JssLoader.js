import React from 'react';
import { JssProvider } from 'react-jss';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

if (typeof document === 'object') {
  jss.options.insertionPoint = document.getElementById('jss-insertion-point');
}

const JssLoader = (props) => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    {props.children}
  </JssProvider>
);

JssLoader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default JssLoader;
