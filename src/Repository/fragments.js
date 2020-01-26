import gql from "graphql-tag";

const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    updatedAt
  }
`;

export default REPOSITORY_FRAGMENT;
