import React, { useContext } from "react";

import { gql } from "apollo-boost";
import "./style.css";
import ErrorMessage from "../../Error";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { OwnerContext, ReposContext } from "../../App/App";
import Loading from "../../Loading";
import { Row, Col, Statistic } from "antd";

const GET_REPOSITORY = gql`
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      url
      descriptionHTML
      updatedAt
      primaryLanguage {
        name
      }
      owner {
        login
        url
      }
      stargazers {
        totalCount
      }
      watchers {
        totalCount
      }
    }
  }
`;

const RepositoryItemDumb = ({
  id,
  name,
  url,
  descriptionHTML,
  updatedAt,
  primaryLanguage,
  stargazers,
  watchers,
  owner
}) => (
  <div className="RepositoryItem">
    <h2>
      <a href={url} rel="noopener noreferrer" target="_blank">
        <span>{name}</span>
      </a>
    </h2>

    <div
      className="RepositoryItem-description-info"
      dangerouslySetInnerHTML={{ __html: descriptionHTML }}
    />
    <Row gutter={16}>
      <Col span={24}>
        {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
      </Col>
      {stargazers && (
        <Col span={12}>
          <Statistic title="Stars" value={stargazers.totalCount} />
        </Col>
      )}
      {watchers && (
        <Col span={12}>
          <Statistic title="Watching" value={watchers.totalCount} />
        </Col>
      )}
      {owner && (
        <Col span={24}>
          <span>
            Owner: <a href={owner.url}>{owner.login}</a>
          </span>
        </Col>
      )}
    </Row>
  </div>
);

const RepositoryItem = () => {
  const { owner } = useContext(OwnerContext);
  const { repositories } = useContext(ReposContext);

  if (!repositories.length) {
    window.location = "/";
  }

  let { id } = useParams();
  const name = repositories.find(repo => repo.id === id).name;

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { owner, name },
    skip: owner === "",
    notifyOnNetworkStatusChange: true
  });
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return null;
  if (loading) {
    return <Loading isCenter={true} />;
  }
  return <RepositoryItemDumb {...data.repository} />;
};

export default RepositoryItem;
