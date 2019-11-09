// @flow

import React from 'react';
import { Page, PageConsumer } from '../common/Page';
import MenuListView from './MenuListView';

type Props = {};

const MenuPage = (props: Props) =>
(
  <Page
    testID="menu-page"
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading }) => (
        <MenuListView
          isStudent={currentUser.isStudent}
          isTeacher={currentUser.isTeacher}
          loading={loading}
          props={props}
        />
      )}
    </PageConsumer>
  </Page>
);

export default MenuPage;
