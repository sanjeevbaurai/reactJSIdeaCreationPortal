import { DirectLine } from 'botframework-directlinejs';
import React from 'react';
import ReactWebChat from 'botframework-webchat';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.directLine = new DirectLine({ token: 'JEnaRLoDLps.-dmOlrPXwVojdpnRrM7COlR-R5Qtr1wue8mb6zLe6LE' });
  }

  render() {
    return (
      <ReactWebChat directLine={this.directLine} user={{ id: 'user_id', name: 'sanjeev' }} />
    );
  }
}