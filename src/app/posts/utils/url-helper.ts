import { Post, PostPreview } from '../data-access/post';

export class UrlHelper {
  public static populatePostUrl(post: PostPreview) {
    const publishedDate = new Date(post.publish);

    const year = publishedDate.getFullYear();
    const month = publishedDate.getMonth() + 1;
    const day = publishedDate.getDate();

    return `/posts/${year}/${month}/${day}/${post.slug}`;
  }
}
