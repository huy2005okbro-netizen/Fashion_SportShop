export type UserStatus = "Hoạt động" | "Khóa";

export type UserRole = "User" | "Staff" | "Admin";

export type AppUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type UserInput = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

type StoredCustomerAccount = {
  id: number;
  name: string;
  email: string;
  role: "User";
  status: "Hoạt động";
};

const CUSTOMER_STORAGE_KEY = "fashion-store-customers";
const USER_STORAGE_KEY = "fashion-store-users";

export const defaultAdminUsers: AppUser[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    role: "User",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    role: "Staff",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    role: "Admin",
    status: "Hoạt động",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    role: "User",
    status: "Khóa",
  },
];

const isBrowser = () => typeof window !== "undefined";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const findUserByEmail = (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  return getManagedUsers().find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );
};

const getNextUserId = (users: AppUser[]) =>
  users.reduce((currentMax, user) => Math.max(currentMax, user.id), 0) + 1;

const parseUsers = (rawValue: string | null): AppUser[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as AppUser[];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

export const createCustomerNameFromEmail = (email: string) => {
  const [prefix] = normalizeEmail(email).split("@");

  return (
    prefix
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Khách hàng"
  );
};

export const getStoredCustomerAccounts = (): StoredCustomerAccount[] => {
  if (!isBrowser()) {
    return [];
  }

  return parseUsers(
    window.localStorage.getItem(CUSTOMER_STORAGE_KEY),
  ) as StoredCustomerAccount[];
};

const saveStoredCustomerAccounts = (accounts: StoredCustomerAccount[]) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(accounts));
};

export const getManagedUsers = (): AppUser[] => {
  if (!isBrowser()) {
    return [...defaultAdminUsers];
  }

  const storedUsers = parseUsers(window.localStorage.getItem(USER_STORAGE_KEY));

  if (storedUsers.length > 0) {
    return storedUsers;
  }

  const migratedUsers = [...defaultAdminUsers, ...getStoredCustomerAccounts()];
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(migratedUsers));

  return migratedUsers;
};

export const saveManagedUsers = (users: AppUser[]) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));

  const customerUsers = users.filter(
    (user): user is StoredCustomerAccount => user.role === "User",
  );
  saveStoredCustomerAccounts(
    customerUsers.filter(
      (user) => !defaultAdminUsers.some((item) => item.id === user.id),
    ),
  );
};

export const addUser = (userInput: UserInput) => {
  const users = getManagedUsers();
  const normalizedEmail = normalizeEmail(userInput.email);

  const isDuplicate = users.some(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (isDuplicate) {
    throw new Error("Email đã tồn tại trong hệ thống.");
  }

  const nextUsers = [
    ...users,
    {
      id: getNextUserId(users),
      name: userInput.name.trim(),
      email: normalizedEmail,
      role: userInput.role,
      status: userInput.status,
    },
  ];

  saveManagedUsers(nextUsers);
  return nextUsers;
};

export const updateUser = (userId: number, userInput: UserInput) => {
  const users = getManagedUsers();
  const normalizedEmail = normalizeEmail(userInput.email);

  const isDuplicate = users.some(
    (user) =>
      user.id !== userId && normalizeEmail(user.email) === normalizedEmail,
  );

  if (isDuplicate) {
    throw new Error("Email đã tồn tại trong hệ thống.");
  }

  const nextUsers = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          name: userInput.name.trim(),
          email: normalizedEmail,
          role: userInput.role,
          status: userInput.status,
        }
      : user,
  );

  saveManagedUsers(nextUsers);
  return nextUsers;
};

export const deleteUser = (userId: number) => {
  const nextUsers = getManagedUsers().filter((user) => user.id !== userId);
  saveManagedUsers(nextUsers);
  return nextUsers;
};

export const toggleUserStatus = (userId: number) => {
  const nextUsers = getManagedUsers().map((user) =>
    user.id === userId
      ? {
          ...user,
          status: user.status === "Hoạt động" ? "Khóa" : "Hoạt động",
        }
      : user,
  );

  saveManagedUsers(nextUsers);
  return nextUsers;
};

export const upsertCustomerAccount = (email: string, name?: string) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return;
  }

  const users = getManagedUsers();
  const existingAccount = users.find(
    (account) => normalizeEmail(account.email) === normalizedEmail,
  );

  if (existingAccount) {
    const updatedAccounts = users.map((account) =>
      normalizeEmail(account.email) === normalizedEmail
        ? {
            ...account,
            name: name?.trim() || account.name,
            role: "User",
            status: account.status,
          }
        : account,
    );

    saveManagedUsers(updatedAccounts);
    return;
  }

  saveManagedUsers([
    ...users,
    {
      id: getNextUserId(users),
      name: name?.trim() || createCustomerNameFromEmail(normalizedEmail),
      email: normalizedEmail,
      role: "User",
      status: "Hoạt động",
    },
  ]);
};

export const getAllUsers = (): AppUser[] => [...getManagedUsers()];
