// Safe wrapper around @notifee/react-native to avoid crashes if the native module isn't available
// This allows the app to start even when iOS linking/pods are not set up yet.

import type { TimestampTrigger } from '@notifee/react-native';

type MinimalNotifee = {
  requestPermission: () => Promise<void>;
  createTriggerNotification: (
    notification: any,
    trigger: TimestampTrigger
  ) => Promise<any>;
  cancelNotification: (id: string) => Promise<void>;
};

let notifeeModule: MinimalNotifee | null = null;
let triggerType: any = { TIMESTAMP: 1 };

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('@notifee/react-native');
  notifeeModule = mod.default ?? mod;
  if (mod.TriggerType) {
    triggerType = mod.TriggerType;
  }
  // Ensure a default Android channel exists for scheduled notifications
  if (typeof mod.createChannel === 'function') {
    mod.createChannel({ id: 'default', name: 'Default' }).catch(() => {});
  }
} catch {
  // Fallback to no-op implementation
  notifeeModule = {
    async requestPermission() {
      return;
    },
    async createTriggerNotification() {
      return;
    },
    async cancelNotification() {
      return;
    },
  };
}

export const TriggerType = triggerType as { TIMESTAMP: number };
export type { TimestampTrigger };
export default notifeeModule as MinimalNotifee;


