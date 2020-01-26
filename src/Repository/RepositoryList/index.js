import React, { Fragment, useContext, useEffect } from "react";

import { Button, Card, List } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import { ReposContext } from "../../App/App";
import UpdatedTimeText from "../../UpdatedTimeText/UpdatedTimeText";

const RepositoryList = ({ repositories, loading, fetchMore, entry }) => {
  const { setRepos } = useContext(ReposContext);
  const usableReposArr = arr =>
    arr.map(edge => ({
      id: edge.node.id,
      name: edge.node.name
    }));
  useEffect(() => {
    const repos = usableReposArr(repositories.edges);
    setRepos(repos);
  }, [repositories, setRepos]);
  const getUpdateQuery = entry => (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    return {
      ...previousResult,
      [entry]: {
        ...previousResult[entry],
        repositories: {
          ...previousResult[entry].repositories,
          ...fetchMoreResult[entry].repositories,
          edges: [
            ...previousResult[entry].repositories.edges,
            ...fetchMoreResult[entry].repositories.edges
          ]
        }
      }
    };
  };
  const onFetchMoreClick = () =>
    fetchMore({
      variables: { cursor: repositories.pageInfo.endCursor },
      updateQuery: getUpdateQuery(entry)
    });

  const loadMore =
    repositories.pageInfo.hasNextPage && !loading ? (
      <Button
        onClick={onFetchMoreClick}
        loading={loading}
        className="FetchMoreButton"
      >
        More Repositories
      </Button>
    ) : null;

  const renderNode = ({ node }) => {
    return (
      <Link key={node.id} to={`/repo/${node.id}`}>
        <Card
          size="small"
          title={node.name}
          hoverable={true}
          className="RepoCard"
        >
          <UpdatedTimeText time={node.updatedAt} />
        </Card>
      </Link>
    );
  };
  return (
    <Fragment>
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={repositories.edges}
        className="RepoList"
        renderItem={renderNode}
      />
    </Fragment>
  );
};

export default RepositoryList;
