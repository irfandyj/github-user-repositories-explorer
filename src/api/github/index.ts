import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import { createApis, withConfigType, mountApis } from './createApis';
import ReactHook from 'alova/react';

export const alovaInstance = createAlova({
  baseURL: 'https://api.github.com',
  statesHook: ReactHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: method => {},
  responded: res => {
    return res.json();
  }
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

mountApis(Apis);

export default Apis;
