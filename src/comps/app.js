import React,{ Component } from 'react'
import AppEditer from './app-edit'
import AppsTable from './app-list'

export default React.createClass({
  render: () => {
    return (
      <div>
        <AppEditer />
        <AppsTable />
      </div>
    );
  }
});
