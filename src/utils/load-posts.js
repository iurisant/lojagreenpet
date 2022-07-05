export const loadPosts = async () => {
  const url = fetch('https://greenpet-2022.herokuapp.com/getCards');
  /* const url = fetch('http://localhost:3001/getCards'); */

  const posts = await (url);

  const postsAndPhotos = await posts.json();
  
  return postsAndPhotos;
}
 

