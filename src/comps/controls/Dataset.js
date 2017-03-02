import React,{ Component } from 'react'



class LoadingDataRow extends Component {
  render ()  {
    return (<tr className="warning"><td className="text-center" colSpan={this.props.cols}><i className="fa fa-circle-o-notch fa-spin"></i> Loading.</td></tr>);
  }
}

class SearchBar extends Component {
  render() {
    return (
      <div className={this.props.direction}>
        <div className="input-field">
          <i className="teal-text fa fa-search prefix"></i>
          <input id="icon_prefix" type="text" className="validate" />
          <label htmlFor="icon_prefix">Search</label>
        </div>
      </div>
    )
  }
}

export {LoadingDataRow, SearchBar}