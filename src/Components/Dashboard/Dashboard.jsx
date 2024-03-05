import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";

import Client from "./Tabs/Client";
import Symbol from "./Tabs/Symbol";
import Strategy from "./Tabs/Strategy";
import Configuration from "./Tabs/Configration";
import WebhookLog from "./Tabs/WebhookLog";
import TradeLog from "./Tabs/OrderLogs";

import AddClient from "./Modals/AddClient";
import AddSymbol from "./Modals/AddSymbol";
import AddStrategy from "./Modals/AddStrategy";
import AddConfiguration from "./Modals/AddConfigration";

import CommonSearchBar from "./CommonComponents/CommonSearchBar";
import Header from "./Header/Header";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("clients");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  // const [showAddSymbolModal, setShowAddSymbolModal] = useState(false);
  const [showAddStrategyModal, setShowAddStrategyModal] = useState(false);
  const [showAddConfigModal, setShowAddConfigModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (key) => {
    setSelectedTab(key);
  };

  const handleAddUser = () => {
    switch (selectedTab) {
      case "clients":
        setShowAddUserModal(true);
        break;
      case "strategy":
        setShowAddStrategyModal(true);
        break;
      case "configuration":
        setShowAddConfigModal(true);
        break;
      default:
    }
  };
  const getButtonLabel = () => {
    if (selectedTab === "webhookLog" || selectedTab === "orderLog") {
      return "Download CSV";
    }
    return "Add New";
  };
  const getButtonIcon = () => {
    if (selectedTab === "webhookLog" || selectedTab === "orderLog") {
      return <LuDownload color="white" className="mb-1 mx-1" />;
    }
    return <FaPlus color="white" className="mb-1 mx-1" />;
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    console.log(searchValue, "searchValue");
  };

  return (
    <>
      <Header />
      <p className="clash-text admin-text px-md-4 px-3 py-3">ATS dashboard</p>
      <div className="dashboard-tabs">
        <Tabs
          defaultActiveKey="client"
          id="responsive-tab-example"
          className="mb-3 px-0 px-md-4"
          activeKey={selectedTab}
          onSelect={handleSelect}
        >
          <Tab eventKey="clients" title="Clients">
            <Client />
          </Tab>
          {/* <Tab eventKey="symbol" title="Symbol">
            <Symbol />
          </Tab> */}
          <Tab eventKey="strategy" title="Strategy">
            <Strategy />
          </Tab>
          <Tab eventKey="configuration" title="Configuration">
            <Configuration />
          </Tab>
          <Tab eventKey="webhookLog" title="Webhook Logs">
            <WebhookLog />
          </Tab>
          <Tab eventKey="orderLog" title="Order Logs">
            <TradeLog />
          </Tab>
        </Tabs>
        <div className="align-items-end d-flex flex-column-reverse justify-content-end tab-buttons">
          <div>
            {/* <CommonSearchBar onSearch={handleSearch} /> */}
            <Button
              className="add-user-button mx-3 px-4"
              onClick={handleAddUser}
            >
              {getButtonIcon()} {getButtonLabel()}
            </Button>
          </div>
        </div>
      </div>

      <AddClient
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
      />
      {/* <AddSymbol
        show={showAddSymbolModal}
        onHide={() => setShowAddSymbolModal(false)}
      /> */}
      <AddStrategy
        show={showAddStrategyModal}
        onHide={() => setShowAddStrategyModal(false)}
      />
      <AddConfiguration
        show={showAddConfigModal}
        onHide={() => setShowAddConfigModal(false)}
      />
    </>
  );
};

export default Dashboard;
