import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { OwnerContext } from "../App";
import { PageHeader, Input, Row, Col } from "antd";
const { Search } = Input;

const Navigation = () => {
  let history = useHistory();
  const { owner, setOwner } = useContext(OwnerContext);

  const onOrganizationSearch = value => {
    if (history.location.pathname !== "/") {
      history.push("/");
    }
    setOwner(value);
  };
  const HeaderExtra = () => (
    <Row type="flex" align="middle">
      <Col span={6}>
        <Link to="/profile">Profile</Link>
      </Col>
      <Col span={18}>
        <Search
          key="search-input"
          placeholder="search organization"
          enterButton="Search"
          onSearch={onOrganizationSearch}
        />
      </Col>
    </Row>
  );
  return (
    <PageHeader
      onBack={() => window.history.back()}
      title={owner}
      subTitle="Information about Github Repos"
      extra={[<HeaderExtra key="extra" />]}
    />
  );
};

export default Navigation;
