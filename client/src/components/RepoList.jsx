import React from 'react';
import { Link } from 'react-router-dom';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>owner_login</th>
            <th>owner_url</th>
            <th>owner_repos_url</th>
            <th>created_at</th>
            <th>stargazers_count</th>
            <th>watchers_count</th>
            <th>forks_count</th>
            <th>svn_url</th>
          </tr>
        </thead>
        <tbody>
          {gitMapper(props)}
        </tbody>
      </table>
    </div>
  </div>
)

const gitMapper = (props) => {
  //console.log(props.repos);
  return props.repos.map(currentGit => {
    return gitTable(currentGit)
  })
}

const gitTable = (props) => {
  return(
    <tr>
    <td>{props.id}</td>
    <td>{props.name}</td>
    <td>{props.owner.login}</td>
    <td>{props.owner.url}</td>
    <td>{props.owner.repos_url}</td>
    <td>{props.created_at.substring(0,10)}</td>
    <td>{props.stargazers_count}</td>
    <td>{props.watchers_count}</td>
    <td>{props.forks_count}</td>
    <td>
      <a href= {props.svn_url}>{props.svn_url}</a>
    </td>
  </tr>
  )

}

export default RepoList;