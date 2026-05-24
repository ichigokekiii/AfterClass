type PendingRegistration = {
  email?: string;
  password?: string;
};

let pendingRegistration: PendingRegistration | null = null;

export function setPendingRegistration(data: PendingRegistration) {
  pendingRegistration = data;
}

export function getPendingRegistration(): PendingRegistration | null {
  return pendingRegistration;
}

export function clearPendingRegistration() {
  pendingRegistration = null;
}
