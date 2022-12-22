// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.

import { createConsumer } from "@rails/actioncable";

import { getFromLocalStorage } from "utils/storage";

const buildWebsocketURL = () => {
  const userId = getFromLocalStorage("user_id");

  return encodeURI(`/cable?user_id=${userId}`);
};

export default () => createConsumer(buildWebsocketURL());
