import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import LaunchIcon from '@material-ui/icons/Launch';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import MeetingNotConfigured from '../../common/MeetingNotConfigured';
import Loader from '../../common/Loader';
import MeetingPaused from '../../common/MeetingPaused';

const styles = theme => ({
  main: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    height: '100%',
  },
  fab: {
    margin: theme.spacing(),
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  play: {
    margin: theme.spacing(),
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
});

export class StudentView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      main: PropTypes.string,
      container: PropTypes.string,
      fab: PropTypes.string,
      play: PropTypes.string,
    }).isRequired,
    meetingId: PropTypes.string,
    username: PropTypes.string,
  };

  static defaultProps = {
    username: 'Guest',
    meetingId: null,
  };

  state = {
    paused: false,
  };

  render() {
    const { t, classes, username, meetingId } = this.props;
    const { paused } = this.state;

    if (meetingId === '') {
      return <MeetingNotConfigured />;
    }

    const desktopClientLink = `zoommtg://zoom.us/join?action=join&confno=${meetingId}`;

    if (!meetingId) {
      return <Loader />;
    }
    const encodedUsername = btoa(username);
    return (
      <div className={classes.main}>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12}>
            {paused ? (
              <MeetingPaused />
            ) : (
              <iframe
                title={t('Meeting')}
                src={`https://zoom.us/wc/${meetingId}/join?prefer=1&un=${encodedUsername}`}
                sandbox="allow-forms allow-scripts allow-same-origin allow-modals"
                allow="microphone; camera; fullscreen"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            )}
          </Grid>
        </Grid>
        <Fab
          color="primary"
          aria-label={t('Open with Desktop Client')}
          className={classes.fab}
          href={desktopClientLink}
        >
          <LaunchIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label={paused ? t('Play') : t('Pause')}
          className={classes.play}
          onClick={() => this.setState({ paused: !paused })}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </Fab>
      </div>
    );
  }
}

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
