import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PauseIcon from '@material-ui/icons/Pause';
import { withTranslation } from 'react-i18next';

const styles = () => ({
  paused: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MeetingPaused = props => {
  const { classes, t } = props;
  return (
    <div className={classes.paused}>
      <PauseIcon fontSize="large" />
      <Typography>{t('You have paused your participation.')}</Typography>
    </div>
  );
};

MeetingPaused.propTypes = {
  classes: PropTypes.shape({
    paused: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

const StyledComponent = withStyles(styles)(MeetingPaused);

export default withTranslation()(StyledComponent);
