import React,{ Component } from 'react'
import { AppEditer } from './edit'
import { AppList } from './list'

export default React.createClass({
  render: () => {
    return (
      <div>
        <AppEditer />
        <AppList />
      </div>
    );
  }
});
