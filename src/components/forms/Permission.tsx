import { FC, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  PermissionOperation,
  PermissionString
} from "@/utils/permissions";

interface PermissionProps {
  fieldKey: string;
  resources: PermissionString[];
  actions: PermissionOperation[];
  onChange: any;
  // value: Record<string, any>;
}

const Permission: FC<PermissionProps> = ({
  actions,
  fieldKey,
  resources,
  onChange
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

    if (!updatedPermissions[resource].length){
      delete updatedPermissions[resource];
    }
    console.log((updatedPermissions));
    
    setSelectedPermissions(updatedPermissions);
  };

  useEffect(() => {
    onChange({ target: { name: fieldKey, value: selectedPermissions } });
  }, [selectedPermissions]);
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
                <Checkbox
                  name={fieldKey}
                  value={action}
                  onCheckedChange={() => {
                    handleCheckboxChange(resource, action);
                  }}
                  aria-checked="mixed"
                  defaultChecked={false}
                />
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Permission;
