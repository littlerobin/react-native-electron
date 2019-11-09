// @flow

import React, { Component } from 'react';
import { HeaderBackButton, Text } from '../common';
import ProfileStudent from './ProfileStudent';
import ProfileTeacher from './ProfileTeacher';
import Colors from '../../utils/colors';

type Props = { isStudent: boolean, isTeacher: boolean, user: Object };

class ProfileView extends Component<Props> {
  render() {
    const { isStudent, isTeacher, user } = this.props;
    let Content = null;

    if (isStudent) {
      Content = <ProfileStudent user={user} />
    } else if (isTeacher) {
      Content = <ProfileTeacher user={user} />
    }

    return (
      <React.Fragment>
        <HeaderBackButton
          isStudent={isStudent}
          ComponentRightButton={
            <Text
              style={{
                color: isStudent ? Colors.yellowBackground : Colors.primary,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              UBAH PROFILE
            </Text>
          }
          onRightMenuClick={(history) => {
            history.transitionTo('/edit-profile');
          }}
        />
        {Content}
      </React.Fragment>
    );
  }
}

export default ProfileView;
