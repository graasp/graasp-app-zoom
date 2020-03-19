import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import MeetingNotConfigured from '../../common/MeetingNotConfigured';
import Loader from '../../common/Loader';

const styles = () => ({
  main: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    height: '100%',
  },
});

export const StudentView = ({ t, classes, username, meetingId }) => {
  if (meetingId === '') {
    return <MeetingNotConfigured />;
  }

  if (!meetingId) {
    return <Loader />;
  }
  const encodedUsername = btoa(username);
  return (
    <div className={classes.main}>
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12}>
          <iframe
            title={t('Meeting')}
            src={`https://zoom.us/wc/${meetingId}/join?prefer=1&un=${encodedUsername}`}
            sandbox="allow-forms allow-scripts allow-same-origin allow-modals"
            allow="microphone; camera; fullscreen"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    main: PropTypes.string,
    container: PropTypes.string,
  }).isRequired,
  meetingId: PropTypes.string,
  username: PropTypes.string,
};

StudentView.defaultProps = {
  username: 'Guest',
  meetingId: null,
};

const mapStateToProps = ({ appInstance, context }) => {
  const { user: { name } = {} } = context;
  const {
    settings: { meetingId },
  } = appInstance.content;
  return {
    meetingId,
    username: name,
  };
};

const ConnectedComponent = connect(mapStateToProps)(StudentView);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
