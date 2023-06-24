import { fetchPhotos } from "../helpers/fetcher";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "react-query";

const PhotoFrame = styled.div`
  div {
    padding: 16px;
  }
  display: flex;
  justify-items: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;

  img {
    max-height: 30em;
  }
`;
const DataHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: center;
  justify-content: center;
  margin-left: 32px;
`;
const Title = styled.div`
  width: 50%;
`;
const Item = styled.div`
  border-radius: 4px;
  margin: 8px;
  display: flex;
  text-align: center;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  border: 1px solid black;
  cursor: pointer;
  background: #bdaaa7;
  color: black;
`;

const StyledLink = styled(Link)`
  width: 20em;
  max-width: 23%;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function makeQueryOptions(albumId, photoId) {
  let arr = [];
  if (albumId) {
    arr.push({ param: "albumId", value: albumId });
  }
  if (photoId) {
    arr.push({ param: "id", value: photoId });
  }
  return arr;
}

export default function Display() {
  let { curAlbumId, photoId } = useParams();

  let queryString = photoId
    ? curAlbumId + "-" + photoId
    : curAlbumId || "albumView";
  let queryOptions = makeQueryOptions(curAlbumId, photoId);
  const { data, error } = useQuery(
    queryString,
    () => fetchPhotos({ queryOptions, isAlbums: !curAlbumId }),
    { keepPreviousData: true }
  );

  if (error || data?.length === 0) {
    return "We're sorry, but this photo can't come to the phone right now.  Please hang up, and try again";
  }

  if (photoId) {
    let { title, url } = data?.[0] || {};
    if (!url) {
      return "We're sorry, but this photo can't come to the phone right now.  Please hang up, and try again";
    }
    return (
      <PhotoFrame>
        <div>{title}</div>
        <img src={url} alt={title} />
      </PhotoFrame>
    );
  }

  return (
    <DataHolder>
      {(data || []).map(({ albumId, id, thumbnailUrl, title, url }, index) => {
        let linkHref = albumId ? `/${albumId}/${id}` : `/${id}`;
        return (
          <StyledLink to={linkHref} key={index}>
            <Item>
              <Title>{title}</Title>
              {curAlbumId ? (
                <img src={thumbnailUrl} alt={title} />
              ) : (
                <>{"Album " + id}</>
              )}
            </Item>
          </StyledLink>
        );
      })}
    </DataHolder>
  );
}
