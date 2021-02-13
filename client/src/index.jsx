import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    $.get('http://localhost:1128/repos', (data) => {
      console.log('got response from server', data)
      this.setState({
        repos: data
      })
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    //ajax post to /repos
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      data: {username: term},
      success: () => console.log('successfully made a post')
    })

    $.get('http://localhost:1128/repos', (data) => {
      console.log('got response from server', data)
      this.setState({
        repos: data
      })
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));