import { Post } from '../data-access/post';

export class UrlHelper {
  public static populatePostUrl(post: Post) {
    const publishedDate = new Date(post.publish);

    const year = publishedDate.getFullYear();
    const month = publishedDate.getMonth() + 1;
    const day = publishedDate.getDate();

    return `/posts/${year}/${month}/${day}/${post.slug}`;
  }

  public static populateTagUrl(tag: string) {
    const tagSlug = tag.replaceAll(' ', '-');
    return `/tags/${tagSlug}`;
  }
}
