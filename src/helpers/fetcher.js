const fetchPhotos = async ({ queryOptions, isAlbums }) => {
  let path = isAlbums ? "albums" : "photos";
  let query = "";
  
  if (queryOptions && queryOptions.length > 0) {
    query += "?";
    queryOptions.forEach((queryOption, i) => {
      if (i !== 0) {
        query += "&";
      }
      query += queryOption.param + "=" + queryOption.value;
    });
  }
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/" + path + query
  );
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }
  return response.json();
};

export { fetchPhotos };
