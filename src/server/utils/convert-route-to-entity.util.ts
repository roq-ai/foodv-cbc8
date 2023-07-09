const mapping: Record<string, string> = {
  'delivery-zones': 'delivery_zone',
  'menu-items': 'menu_item',
  orders: 'order',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
