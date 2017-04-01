import React,{ Component } from 'react'
import { Link, IndexLink } from 'react-router'
import Nav from './nav'

class Header extends Component{

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <header>
        <Nav />
      </header>
    )
  }
}

export default Header
