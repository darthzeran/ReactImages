import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Heading = styled.div`
  background: #fff;
  padding: 16px;
`;

const Ul = styled.ul`
  display: flex;
  list-style-type: none;
`;

const Li = styled.li`
  position: relative;
  padding-left: 32px;

  &:not(:first-child)::before {
    content: "→";
    position: absolute;
    left: 5px;
    width: 10px;
    height: 10px;
  }
`;

export default function Header() {
  let { curAlbumId: albumId, photoId } = useParams();

  return (
    <Heading>
      <header className="header">
        <h1>Welcome to your iImages</h1>
      </header>
      {albumId && (
        <nav className="nav">
          <Ul>
            <Li>
              <Link to="/">Home</Link>
            </Li>
            {albumId && (
              <Li>
                <Link to={"/" + albumId}>{"Album " + albumId}</Link>
              </Li>
            )}
            {photoId && (
              <Li>
                <Link to={"/" + albumId + "/" + photoId}>
                  {"Photo " + photoId}
                </Link>
              </Li>
            )}
          </Ul>
        </nav>
      )}

      <hr />
    </Heading>
  );
}
