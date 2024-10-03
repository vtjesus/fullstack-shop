import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Product: a.model({
    name: a.string().required(),
    description: a.string(),
    price: a.string().required(),
    category: a.string(),
    inStock: a.boolean().required(),
    imageUrl: a.string(),
  
  }) .authorization((allow) => [allow.publicApiKey()])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});