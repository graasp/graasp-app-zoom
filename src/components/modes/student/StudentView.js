import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { addQueryParamsToUrl } from '../../../utils/url';

const styles = theme => ({
  main: {
    textAlign: 'center',
    margin: theme.spacing.unit,
  },
  message: {
    padding: theme.spacing.unit,
    backgroundColor: theme.status.danger.background[500],
    color: theme.status.danger.color,
    marginBottom: theme.spacing.unit * 2,
  },
});

export const StudentView = ({ t, classes }) => {
  return (
    <iframe
      src="https://zoom.us/wc/9134413356/join?prefer=1&un=TWluZGF1Z2Fz"
      sandbox="allow-forms allow-scripts allow-same-origin allow-modals"
      allow="microphone; camera; fullscreen"
      width="100%"
      height="100%"
    >
    </iframe>
  );
}

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    main: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(StudentView);

export default withTranslation()(StyledComponent);
