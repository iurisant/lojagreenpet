export const loadPosts = async () => {
  const url = fetch('https://greenpet-2022.herokuapp.com/getCards');

  const posts = await (url);

  const postsAndPhotos = await posts.json();
  
  return postsAndPhotos;
}
 

