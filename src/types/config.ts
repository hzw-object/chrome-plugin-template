export enum ProviderType {
  ChatGPT = 'chatgpt',
  GPT3 = 'gpt3',
}

export interface ProviderConfigs {
  provider: ProviderType;
  configs: {
    [ProviderType.GPT3]: GPT3ProviderConfig | undefined;
  };
}
export interface GPT3ProviderConfig {
  model: string;
  apiKey: string;
}
