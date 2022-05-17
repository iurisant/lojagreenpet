export const loadPosts = async () => {
  const url = fetch('https://624b2f9744505084bc4dd4da.mockapi.io/api/petgreen/ProdutosGP');

  const posts = await (url);

  const postsAndPhotos = await posts.json();

  return postsAndPhotos;
}
 

