export interface IDefaultPlugin {
    _id?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
    deleted?: boolean;
    deletedAt?: Date;
    deletedBy?: string;
    createdBy?: string;
  }

  export interface PhoneProps {
    prefix: string;
    number: string;
    country?: string;
  }
  
  export interface AddressProps {
    houseNumber?: string;
    zipCode?: string;
    country: string;
    city: string;
    street: string;
    state: string;
  }

  export interface RequestStateProps {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  }