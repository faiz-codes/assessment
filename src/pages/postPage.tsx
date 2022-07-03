import React from 'react';
import { getPost } from '../api/post';

export default class PostPage extends React.Component {
  state = {
    posts: [],
    categories: [],
    selectedCategory: 'All categories'
  }


  componentDidMount() {
    getPost((res: { data: any; }) => {
      // success
      const posts = res.data.posts;
      this.setState({ posts });

      // get list of unique category
      const categories: Array<String> = ['All categories'];
      posts.forEach(post => {
        post.categories.forEach(category => {
          // if category not exist, push into categories array
          if(!categories.includes(category['name'])){
            categories.push(category['name'])
          }
        });
      });
      this.setState({ categories });
    },(err: any) => {
      // error
      alert(err);
    });
  }

  // check if selectedCategory exist in post.categories
  isSelectedCategory = categories => {
    return categories.some(category => category.name === this.state.selectedCategory)
  }

  render() {
    return (
      <div>
        <h1>Posts Lists</h1>
        {/* Category picker */}
        Filter
        <select onChange={(event) => this.setState({ selectedCategory: event.target.value })} value={this.state.selectedCategory}>
          {
            this.state.categories
              .map(category =>
                <option key={category}>{category}</option>
              )
          }
        </select>
        <ul>
          {this.state.selectedCategory === 'All categories'? 
              this.state.posts.map(post =>
                  <li key={post['id']}>{post['title']}</li>
                )
          : 
            this.state.posts.filter((post) => this.isSelectedCategory(post['categories'])).map(
              function(post: any){
                return <li key={post['id']}>{post['title']}</li>
              }
            )
          }
        </ul>
      </div>

    )
  }

}