/* @flow */
import React from 'react';
import createHashHistory from 'history/createHashHistory';
import History from 'react-router/History';
import { StaticRouter } from 'react-router';
import { addLeadingSlash } from 'history/PathUtils';
import { changeLocation } from 'js/actions';

type DispatchingRouterProps = {
  store: Object,
  history: Object,
  action: string,
  location: Object | string,
  basename: ?string
};

class DispatchingRouter extends React.Component {
  props: DispatchingRouterProps

  constructor(props: DispatchingRouterProps) {
    super(props);
    this.onLocationChange(this.props.location);
  }

  onLocationChange(location: Object) {
    this.props.store.dispatch(changeLocation(location));
  }

  componentWillReceiveProps(nextProps: DispatchingRouterProps) {
    this.onLocationChange(nextProps.location);
  }

  createHref = (path: string) => (`#${addLeadingSlash(path)}`);

  render() {
    const { history, action, location, basename, ...props } = this.props;

    return (
      <StaticRouter
        action={action}
        location={location}
        basename={basename}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        createHref={this.createHref}
        {...props}
      />
    );
  }
}

/**
 * A router that uses the URL hash.
 */
type CustomRouterProps = {
  basename: ?string,
  getUserConfirmation: ?Function,
  store: ?Object,
  basename: ?string
};

class CustomRouter extends React.Component {
  props: CustomRouterProps;

  static contextTypes = {
    store: React.PropTypes.object
  }

  render() {
    const { basename, getUserConfirmation, store, ...props } = this.props;

    return (
      <History
        createHistory={createHashHistory}
        historyOptions={{
          basename,
          getUserConfirmation
        }}
      >
        {({ history, action, location }) => (
          <DispatchingRouter
            store={this.context.store || store}
            history={history}
            action={action}
            location={location}
            basename={basename}
            {...props}
          />
        )}
      </History>
    );
  }
}

export default CustomRouter;
