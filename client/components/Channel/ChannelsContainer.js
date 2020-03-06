import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChannelSearch from './SearchForm';
import MyChannelSubscriptions from './MyChannels';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

//CAN DELETE THIS ENTIRE FILE. Leaving this here temporarily
const ChannelContainer = () => (
  <Tabs>
    <TabList>
      <Tab>Subscribed Channels</Tab>
      <Tab>Search</Tab>
    </TabList>

    <TabPanel>
      <MyChannelSubscriptions />
    </TabPanel>
    <TabPanel>
      <ChannelSearch />
    </TabPanel>
  </Tabs>
);

export default ChannelContainer;
