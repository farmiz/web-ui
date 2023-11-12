import { FC} from "react";
import { Checkbox } from "../ui/checkbox";

interface PermissionProps {}

const Permission: FC<PermissionProps> = () => {
  // State to store the selected permissions for each resource
  // const [permissions, setPermissions] = useState<{ [resource: string]: string[] }>({
  //   users: [],
  //   // Add other resources as needed, e.g., wallet: []
  // });

  // Function to handle checkbox changes
  // const handleCheckboxChange = (resource: string, value: string) => {
  //   console.log("BOM")
  //   setPermissions((prevPermissions) => {
  //     const newPermissions = { ...prevPermissions };
  //     const resourcePermissions = newPermissions[resource] || [];

  //   //   // Toggle the value in the array
  //   //   if (resourcePermissions.includes(value)) {
  //   //     newPermissions[resource] = resourcePermissions.filter((item) => item !== value);
  //   //   } else {
  //   //     newPermissions[resource] = [...resourcePermissions, value];
  //   //   }
  //   console.log({newPermissions, value, resource});
    

  //     return newPermissions;
  //   });
  // };

  // Define the resources and permissions
  const resources = ["users", "wallet"]; // Add more resources as needed
  const permissionTypes = ["create", "read", "update", "delete"]; // Add more permission types as needed

  return (
    <div>
      <div className="flex justify-between gap-4 mb-10">
        <h1 className="w-[20%]">Permissions</h1>
        <div className="flex items-center justify-between w-[80%]">
          {permissionTypes.map((type) => (
            <p key={type} className="flex-1 flex items-center justify-center">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          ))}
        </div>
      </div>

      {resources.map((resource) => (
        <div key={resource} className="flex items-center justify-between my-2">
          <p className="w-[20%]">{resource.charAt(0).toUpperCase() + resource.slice(1)}</p>
          <div className="w-[80%] flex items-center justify-between">
            {permissionTypes.map((type) => (
              <p key={type} className="flex-1 flex items-center justify-center">
                <Checkbox
                  value={type}
                  onChange={(e) =>{
                    console.log({e});
                    
                    // handleCheckboxChange(resource, type)
                  }}
                //   checked={permissions[resource] ? permissions[resource].includes(type): false}
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
