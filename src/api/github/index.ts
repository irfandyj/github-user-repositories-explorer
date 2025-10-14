import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import { createApis, withConfigType, mountApis } from './createApis';
import ReactHook from 'alova/react';
import { toast } from 'sonner';

export const alovaInstance = createAlova({
  baseURL: 'https://api.github.com',
  statesHook: ReactHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: () => {},
  responded: {
    onSuccess: async (res: Response) => {
      if (res.ok) {
        return res.json();
      }

      // Try to extract an error message from the response body
      let errorMessage = `HTTP ${res.status} ${res.statusText}`;
      try {
        const body = await res.clone().json();
        if (body && typeof body === 'object' && 'message' in body && body.message) {
          errorMessage = String((body as any).message);
        }
      } catch {
        try {
          const text = await res.clone().text();
          if (text) errorMessage = text;
        } catch {}
      }

      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
    onError: (error: any) => {
      const message = error?.message || 'Network error';
      toast.error(message);
    },
  }
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

mountApis(Apis);

export default Apis;
