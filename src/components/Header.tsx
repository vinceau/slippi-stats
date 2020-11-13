import styled from "@emotion/styled";

export const Header = styled.h1`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 5.5rem;
  margin: 2rem;
  padding-bottom: 1rem;
  position: relative;
  text-align: center;

  &::before {
    z-index: -1;
    content: "";
    display: block;
    background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
    height: 0.1rem;
    position: absolute;
    width: 80%;
    margin-left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
`;
