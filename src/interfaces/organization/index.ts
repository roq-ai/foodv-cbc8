import { DeliveryZoneInterface } from 'interfaces/delivery-zone';
import { MenuItemInterface } from 'interfaces/menu-item';
import { OrderInterface } from 'interfaces/order';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  delivery_zone?: DeliveryZoneInterface[];
  menu_item?: MenuItemInterface[];
  order?: OrderInterface[];
  user?: UserInterface;
  _count?: {
    delivery_zone?: number;
    menu_item?: number;
    order?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
