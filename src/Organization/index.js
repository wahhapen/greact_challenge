import React from "react";
import gql from "graphql-tag";

import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import Loading from "../Loading";
import ErrorMessage from "../Error";
import { useQuery } from "@apollo/react-hooks";

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
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

const Organization = ({ organizationName }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES_OF_ORGANIZATION, {
    variables: { organizationName },
    skip: organizationName === "",
    notifyOnNetworkStatusChange: true
  });
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return null


  const { organization } = data;

  if (loading && !organization) {
    return <Loading isCenter={true} />;
  }

  return (
    <RepositoryList
      loading={loading}
      repositories={organization.repositories}
      fetchMore={fetchMore}
      entry={"organization"}
    />
  );
};

export default Organization;
