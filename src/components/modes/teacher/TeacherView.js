import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import './TeacherView.css';
import {
  openSettings, patchAppInstance,
} from '../../../actions';
import { getUsers } from '../../../actions/users';
import Settings from './Settings';
import { MAX_INPUT_LENGTH, MAX_ROWS } from '../../../config/settings';
import Loader from '../../common/Loader';

export class TeacherView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchOpenSettings: PropTypes.func.isRequired,
    dispatchPatchAppInstance: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string,
      main: PropTypes.string,
      grid: PropTypes.string,
      fab: PropTypes.string,
      container: PropTypes.string,
      textField: PropTypes.string,
    }).isRequired,
    dispatchGetUsers: PropTypes.func.isRequired,
    ready: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      meetingId: PropTypes.string,
    }).isRequired,
  };

  static styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    grid: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      textAlign: 'center',
      padding: theme.spacing.unit,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      overflowX: 'hidden',
    },
    fab: {
      margin: theme.spacing.unit,
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  });

  state = {
    meetingId: '',
  };

  saveToApi = _.debounce(({ meetingId }) => {
    const { settings, dispatchPatchAppInstance } = this.props;
    const newSettings = {
      ...settings,
      meetingId,
    };
    dispatchPatchAppInstance({
      data: newSettings,
    });
  }, 1000);

  constructor(props) {
    super(props);
    const { dispatchGetUsers } = this.props;
    dispatchGetUsers();
  }

  componentDidMount() {
    const { settings: { meetingId } } = this.props;

    if (meetingId) {
      this.setState({ meetingId });
    }
  }

  componentDidUpdate(
    {
      settings: { meetingId: prevPropMeetingId},
    },
    { meetingId: prevStateMeetingId }
  ) {
    const { settings: { meetingId } } = this.props;

    // set state here safely by ensuring that it does not cause an infinite loop
    if (prevPropMeetingId !== meetingId && prevStateMeetingId !== meetingId) {
      // eslint-disable-next-line
      this.setState({ meetingId });
    }
  }

  handleChangeText = ({ target }) => {
    const { value } = target;
    this.setState({
      meetingId: value,
    });
    this.saveToApi({ meetingId: value });
  };

  render() {
    const { meetingId } = this.state;
    const {
      classes,
      t,
      ready,
      dispatchOpenSettings,
    } = this.props;

    if (!ready) {
      return <Loader />;
    }

    return (
      <>
        <div className={classes.root}>
          <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} className={classes.main}>
              <Typography variant="h6">
                { t('Please enter your 9-11 digit meeting ID (numbers only).') }
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.main}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  inputProps={{
                    maxLength: MAX_INPUT_LENGTH,
                  }}
                  key="inputTextField"
                  id="inputTextField"
                  label={t('Meeting ID')}
                  multiline
                  rowsMax={MAX_ROWS}
                  value={meetingId}
                  helperText={t('E.g. 123456789')}
                  onChange={this.handleChangeText}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </form>
            </Grid>
          </Grid>
        </div>
        <Settings />
        <Fab
          color="primary"
          aria-label={t('Settings')}
          className={classes.fab}
          onClick={dispatchOpenSettings}
        >
          <SettingsIcon />
        </Fab>
      </>
    );
  }
}

// get the app instance resources that are saved in the redux store
const mapStateToProps = ({ appInstance }) => ({
  settings: appInstance.content.settings,
  ready: appInstance.ready,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchGetUsers: getUsers,
  dispatchPatchAppInstance: patchAppInstance,
  dispatchOpenSettings: openSettings,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherView);

const StyledComponent = withStyles(TeacherView.styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
