import React from 'react'

const ConfigContext = React.createContext({});
export default ConfigContext;

export const ConfigProvider = ConfigContext.Provider;
export const ConfigConsumer = ConfigContext.Consumer;
