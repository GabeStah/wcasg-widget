import store from 'store2';
import config from 'config';
import findIndex from 'lodash/findIndex';
import LZString from 'lz-string';
import fromBase64 from 'atob';
import toBase64 from 'btoa';

enum CompressionType {
  LZString,
  Base64
}

export enum StorageDataType {
  Plugin,
  All
}

export const Store = {
  compress: ({
    value,
    compressionType = CompressionType.Base64
  }: {
    value: any;
    compressionType: CompressionType;
  }): any => {
    if (!value) {
      return;
    }
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    if (compressionType === CompressionType.LZString) {
      return LZString.compress(value);
    } else if (compressionType === CompressionType.Base64) {
      return toBase64(JSON.stringify(value));
    }
  },
  decompress: ({
    value,
    compressionType = CompressionType.Base64
  }: {
    value: any;
    compressionType: CompressionType;
  }): any => {
    if (!value) {
      return;
    }

    if (compressionType === CompressionType.LZString) {
      const decompressed = LZString.decompress(value);
      if (decompressed) {
        return JSON.parse(decompressed);
      }
    } else if (compressionType === CompressionType.Base64) {
      console.log(`decompress base64`);
      console.log(value);
      console.log(fromBase64(value));
      const decompressed = fromBase64(value);
      if (decompressed) {
        return JSON.parse(decompressed);
      }
    }
  },
  getFromLocalStorage: ({
    id,
    type,
    withCompression = false
  }: {
    id?: string;
    type: StorageDataType;
    withCompression?: boolean;
  }): any => {
    let completeStore = store(config.widgetId);
    if (!completeStore) {
      return;
    }
    if (withCompression) {
      completeStore = Store.decompress({
        value: completeStore,
        compressionType: config.localCompressionType
      });
    }
    if (type === StorageDataType.All) {
      return completeStore;
    }
    if (type === StorageDataType.Plugin) {
      if (!completeStore.plugins) {
        return;
      }
      if (!id) {
        // Get all plugins;
        return completeStore.plugins;
      }
      return completeStore.plugins.find(
        (plugin: { id: string }) => plugin.id === id
      );
    }
  },
  saveToLocalStorage: ({
    value,
    type,
    withCompression = false
  }: {
    value: any;
    type: StorageDataType;
    withCompression?: boolean;
  }) => {
    if (type === StorageDataType.All) {
      if (withCompression) {
        value = Store.compress({
          value,
          compressionType: config.localCompressionType
        });
      }
      store.set(config.widgetId, value);
    } else if (type === StorageDataType.Plugin) {
      if (!value.id) {
        return;
      }
      let completeStore = Store.getFromLocalStorage({
        type: StorageDataType.All,
        withCompression
      });
      if (!completeStore) {
        completeStore = {};
      }
      if (!completeStore.plugins) {
        completeStore.plugins = [];
      }
      // Find plugin
      const pluginIndex = findIndex(
        completeStore.plugins,
        (plugin: any) => plugin.id === value.id
      );

      // If value is a full plugin instance, get just the state data
      if (
        value.getInstanceState &&
        typeof value.getInstanceState === 'function'
      ) {
        value = value.getInstanceState();
      }

      if (pluginIndex === -1) {
        // Add plugin value.
        completeStore.plugins.push(value);
      } else {
        // Update plugin value.
        completeStore.plugins[pluginIndex] = value;
      }

      // Save
      store.set(
        config.widgetId,
        withCompression
          ? Store.compress({
              value: completeStore,
              compressionType: config.localCompressionType
            })
          : completeStore
      );
    }
  }
};

export default Store;
