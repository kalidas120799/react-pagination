import React, { Component } from 'react'
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      currentPage: 1,
      postsPerPage: 10
    }
  }
  componentDidMount = async () => {
    const allPosts = await axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => res.data)
    if (allPosts.length !== 0) {
      this.setState({ posts: allPosts })
    }
  }
  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }
  render() {
    const { posts, currentPage, postsPerPage } = this.state
    var currentPosts = []
    if (posts.length !== 0) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    }
    return (
      <div className='container mt-3' >
        <h4>React Pagination</h4>
        <ul className='list-group mb-4'>
          {
            currentPosts.length !== 0 ? currentPosts.map((post, index) => (
              <li key={post.id} className='list-group-item'>
                 {post.title}
              </li>
            )) : <div>Loading...</div>
          }          
        </ul>
        <div className="mt-4 mr-3 d-flex justify-content-end" >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              currentPage={currentPage}
              paginate={this.paginate}
            />
          </div>
      </div>
    )
  }
}
