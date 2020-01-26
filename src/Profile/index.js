import React, { useContext } from "react";
import gql from "graphql-tag";

import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import { OwnerContext } from "../App/App";
import Loading from "../Loading";
import ErrorMessage from "../Error";
import { useQuery } from "@apollo/react-hooks";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      login
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

const Profile = () => {
  const { owner, setOwner } = useContext(OwnerContext);

  const { loading, error, data, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_CURRENT_USER,
    {
      notifyOnNetworkStatusChange: true
    }
  );
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return null;

  const { viewer } = data;
  if (owner !== viewer.login) {
    setOwner(viewer.login);
  }

  if (loading && !viewer) {
    return <Loading isCenter={true} />;
  }

  return (
    <RepositoryList
      loading={loading}
      repositories={viewer.repositories}
      fetchMore={fetchMore}
      entry={"viewer"}
    />
  );
};

export default Profile;
