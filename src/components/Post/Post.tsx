import React from "react";
import styles from './Post.module.scss';

interface PostProps {
    post: any;
}

const Post: React.FC<PostProps> = ({post}: PostProps) => {
    return(
      <div className={styles.Card}>
          <div className={styles.PostAuthorHeader}>
            <img src={post.author.avatar} alt="avatar" />
            <span className={styles.PostAuthorName}>{post.author.name}</span>
            <span className={styles.PostAuthorPublishDate}>{post.publishDate}</span>
          </div>
          <p className={styles.PostTitle}>{post.title}</p>
          <div className={styles.FlexWrap}>
              {post.categories.map(function(category:any){
                return <span className={styles.PostCategory} key={category.id}>{category.name}</span>
              }
            )}
          </div>
          <p className={styles.PostSummary}>
              {post.summary}
          </p>
      </div>
    );
}

export default Post