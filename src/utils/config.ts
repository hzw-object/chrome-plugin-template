import { ProviderType, ProviderConfigs } from '../types/config';
import Browser from 'webextension-polyfill';

export async function saveProviderConfigs(
  provider: ProviderType,
  configs: ProviderConfigs['configs'],
) {
  return Browser.storage.local.set({
    provider,
    [`provider:${ProviderType.GPT3}`]: configs[ProviderType.GPT3],
  });
}
