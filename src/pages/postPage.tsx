import React from 'react';
import { getPost } from '../api/post';

export default class PostPage extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    getPost((res: { data: any; }) => {
      // success
      const posts = res.data.posts;
      this.setState({ posts });
    },(err: any) => {
      // error
      alert(err);
    });
  }

  render() {
    return (
      <ul>
        {
          this.state.posts
            .map(post =>
              <li key={post['id']}>{post['title']}</li>
            )
        }
      </ul>
    )
  }

}