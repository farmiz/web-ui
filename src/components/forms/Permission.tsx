import { FC, memo, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  PermissionOperation,
  PermissionString,
  hasPermission,
} from "@/utils/permissions";
import { cloneDeep } from "lodash";

interface PermissionProps {
  fieldKey: string;
  dynamicFieldKey: string;
  resources: PermissionString[];
  actions: PermissionOperation[];
  onChange: any;
  value: Record<string, any>;
}

const Permission: FC<PermissionProps> = ({
  actions,
  fieldKey,
  resources,
  onChange,
  dynamicFieldKey,
  value,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<PermissionString, PermissionOperation[]>
  >({} as Record<PermissionString, PermissionOperation[]>);

  const handleCheckboxChange = (
    resource: PermissionString,
    action: PermissionOperation
  ) => {
    const updatedPermissions = { ...selectedPermissions };

    if (!updatedPermissions[resource]) {
      updatedPermissions[resource] = [];
    }

    const index = updatedPermissions[resource].indexOf(action);

    if (index === -1) {
      updatedPermissions[resource].push(action);
    } else {
      updatedPermissions[resource].splice(index, 1);
    }

    if (!updatedPermissions[resource].length) {
      delete updatedPermissions[resource];
    }
    setSelectedPermissions(updatedPermissions);
  };

  useEffect(() => {
    const clonedObj = cloneDeep(selectedPermissions);
    onChange({
      target: {
        name: dynamicFieldKey ? dynamicFieldKey : fieldKey,
        value: clonedObj,
      },
    });
  }, [selectedPermissions]);
  console.log(value);
  
  return (
    <div>
      <div className="flex justify-between gap-4 mb-10">
        <h1 className="w-[20%]">Permissions</h1>
        <div className="flex items-center justify-between w-[80%]">
          {actions.map((action) => (
            <p key={action} className="flex-1 flex items-center justify-center">
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </p>
          ))}
        </div>
      </div>

      {resources.map((resource) => (
        <div key={resource} className="flex items-center justify-between my-2">
          <label
            className="w-[20%] font-semibold text-sm my-1"
            htmlFor={resource}
          >
            {resource.charAt(0).toUpperCase() + resource.slice(1)}
          </label>
          <div className="w-[80%] flex items-center justify-between">
            {actions.map((action) => (
              <p
                key={action}
                className="flex-1 flex items-center justify-center"
              >
                <input
                type="checkbox"
                value={action}
                  name={fieldKey}
                  onChange={(e) => {
                    console.log(e);
                    handleCheckboxChange(resource, action);
                  }}
                  // defaultChecked={hasPermission(value.access, [resource, action])}
                  checked={hasPermission(value.access, [resource, action])}
                />
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Permission);
