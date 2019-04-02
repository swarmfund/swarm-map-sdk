export const STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

export interface Associator {
  id?: string;
  name: string;
  publicKey: string;
}

export interface AssociatorConnection {
  uid?: string;
  assetUid: string;
  associatorId: string;
}


