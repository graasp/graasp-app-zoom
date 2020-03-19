import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import { withTranslation } from 'react-i18next';

const styles = () => ({
  notConfigured: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ModelNotConfigured = props => {
  const { classes, t } = props;
  return (
    <div className={classes.notConfigured}>
      <BrokenImageIcon fontSize="large" />
      <Typography>{t('This meeting has not been configured.')}</Typography>
    </div>
  );
};

ModelNotConfigured.propTypes = {
  classes: PropTypes.shape({
    notConfigured: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

const StyledComponent = withStyles(styles)(ModelNotConfigured);

export default withTranslation()(StyledComponent);
