import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  customer_name: string;
  address: string;
  total_price: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_name?: string;
  address?: string;
  organization_id?: string;
}
