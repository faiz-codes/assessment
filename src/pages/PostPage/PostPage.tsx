import React from 'react';
import { getPost } from '../../api/post';
import Post from '../../components/Post/Post';
import styles from './PostPage.module.scss';

export default class PostPage extends React.Component {
  allCategoriesOption = 'All categories'
  postPerLoad = 5;
  state = {
    posts: [],
    categories: [],
    selectedCategory: this.allCategoriesOption,
    pagination: this.postPerLoad
  }

  componentDidMount() {
    getPost((res: { data: any; }) => {
      // success
      const posts = res.data.posts;
      this.setState({ posts });

      // get list of unique category
      const categories: Array<String> = [this.allCategoriesOption];
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
    return categories.some(category => category.name === this.state.selectedCategory);
  }

  // pagination function
  paginate = () => {
    if(this.state.selectedCategory === this.allCategoriesOption)
      return (
        this.state.pagination < this.state.posts.length ?
        <div className={styles.AlignCenter}>
          <button className={styles.ButtonLoadMore} onClick={() => this.setState({pagination: this.state.pagination + this.postPerLoad})}>Load more</button>
        </div>
      :
      null
      )
    else
      return (
        this.state.pagination < this.state.posts.filter((post) => this.isSelectedCategory(post['categories'])).length ?
        <div className={styles.AlignCenter}>
          <button className={styles.ButtonLoadMore} onClick={() => this.setState({pagination: this.state.pagination + this.postPerLoad})}>Load more</button>
        </div>
      :
      null
      )
  }

  render() {
    return (
      <div className={styles.Container}>
        <h1 className={styles.AlignCenter}>Posts Lists</h1>
        <div className={styles.AlignCenter}>
          Filter 
          <select onChange={(event) => this.setState({ selectedCategory: event.target.value, pagination: this.postPerLoad })} value={this.state.selectedCategory}>
            {
              this.state.categories
                .map(category =>
                  <option key={category}>{category}</option>
                )
            }
          </select>
        </div>
        {this.state.selectedCategory === this.allCategoriesOption ? 
            this.state.posts.slice(0, this.state.pagination).map(post =>
                <Post key={post['id']} {...{post}}/>
              )
        : 
          this.state.posts.filter((post) => this.isSelectedCategory(post['categories'])).slice(0, this.state.pagination).map(
            function(post: any){
              return <Post key={post['id']} {...{post}}/>
            }
          )
        }
        {this.paginate()}
      </div>
    )
  }

}