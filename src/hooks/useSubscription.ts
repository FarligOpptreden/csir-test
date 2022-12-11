import { useEffect } from "react";

type Subscription = {
  [key: string | number]: Array<Function>;
};

type ConfigSettings = {
  persistInLocalStorage?: boolean;
};

const subscriptions: Subscription = {};
const currentData: any = {};
const settings: ConfigSettings = {};

const publish = <T>(topic: string, data: T): void => {
  // Set the current data for the topic in the global store
  if (settings.persistInLocalStorage)
    localStorage.setItem(`$ss_${topic}`, JSON.stringify(data));
  else currentData[topic] = data;

  // If no subscriptions exist for the topic, exit
  if (!subscriptions[topic]?.length) return;

  // Publish the data to each subscription handler
  for (let handler of subscriptions[topic]) handler?.(data);
};

const getCurrentData = <T>(topic: string): T => {
  if (settings.persistInLocalStorage) {
    let item = localStorage.getItem(`$ss_${topic}`);

    return item ? (JSON.parse(item) as T) : currentData[topic];
  } else return currentData[topic];
};

const subscribe = <T>(topic: string, handler: (data: T) => void): void => {
  let topicHandlers = subscriptions[topic];

  // If no handlers exist for the topic yet, initialize the topic
  if (!topicHandlers) {
    topicHandlers = [];
    subscriptions[topic] = topicHandlers;
  }

  // If the handler has already been registered for the topic,
  // exit to prevent duplicate regstrations
  if (topicHandlers.filter((h) => h === handler)[0]) return;

  // Register the handler for the topic
  topicHandlers.push(handler);
};

const unsubscribe = <T>(topic: string, handler: (data: T) => void): void => {
  let topicHandlers = subscriptions[topic];

  // If no subscriptions exist for the topic, exit
  if (!topicHandlers?.length) return;

  const index = topicHandlers.indexOf((h: Function) => h === handler);

  // If the handler isn't registered for the topic, exit
  if (index < 0) return;

  // Remove the handler from the topic
  topicHandlers.splice(index, 1);
};

const useSubscription = <T>(
  topic: string,
  handler: (data: T) => void
): void => {
  useEffect(() => {
    subscribe(topic, handler);

    return () => {
      unsubscribe(topic, handler);
    };
  }, []);
};

const configureUseSubscription = ({
  persistInLocalStorage,
}: {
  persistInLocalStorage?: boolean;
}): void => {
  if (persistInLocalStorage != null)
    settings.persistInLocalStorage = persistInLocalStorage;
};

export { useSubscription, publish, getCurrentData, configureUseSubscription };
