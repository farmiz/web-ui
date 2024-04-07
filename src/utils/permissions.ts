export type PermissionOperation = "create" | "read" | "update" | "delete";
export type PermissionString =
  | "users"
  | "wallet"
  | "discovery"
  | "sponsorship"
  | "settings"
  | "transaction"
  | "products"
  | "tags";
export type IPermission = Record<
  PermissionString,
  Record<PermissionOperation, number>
>;
export const hasPermission = (
  userPermission: string,
  permissions: [PermissionString, PermissionOperation]
): boolean => {
  if (!userPermission || !permissions) return false;

  const [permissionService, permissionOperation] = permissions;
  return userPermission.includes(
    String.fromCharCode(PERMISSIONS[permissionService][permissionOperation])
  );
};
export const PERMISSIONS_LIST: PermissionString[] = [
  "users",
  "wallet",
  "discovery",
  "sponsorship",
  "settings",
  "transaction",
  "products",
  "tags",
];

export const PERMISSIONS = structurePermissionsObject(PERMISSIONS_LIST);

function structurePermissionsObject(
  permissionsArray: PermissionString[]
): IPermission {
  const permissions: any = {};
  for (let i = 0; i < permissionsArray.length; i++) {
    const resource = permissionsArray[i];
    permissions[resource] = {
      create: 32 + (i * 4 + 1),
      read: 32 + (i * 4 + 2),
      update: 32 + (i * 4 + 3),
      delete: 32 + (i * 4 + 4),
    };
  }
  return permissions;
}
