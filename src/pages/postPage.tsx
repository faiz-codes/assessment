import React from 'react';
import { getPost } from '../api/post';

export default class PostPage extends React.Component {
  state = {
    posts: [],
    categories: []
  }

  componentDidMount() {
    getPost((res: { data: any; }) => {
      // success
      const posts = res.data.posts;
      this.setState({ posts });

      // get list of unique category
      const categories: Array<String> = [];
      posts.forEach(post => {
        post.categories.forEach(category => {
          // if category not exist, push into categories array
          if(!categories.includes(category['name'])){
            categories.push(category['name'])
          }
        });
      });
      this.setState({ categories });
      console.log(categories)

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