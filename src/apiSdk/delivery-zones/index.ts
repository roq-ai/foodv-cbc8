import axios from 'axios';
import queryString from 'query-string';
import { DeliveryZoneInterface, DeliveryZoneGetQueryInterface } from 'interfaces/delivery-zone';
import { GetQueryInterface } from '../../interfaces';

export const getDeliveryZones = async (query?: DeliveryZoneGetQueryInterface) => {
  const response = await axios.get(`/api/delivery-zones${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDeliveryZone = async (deliveryZone: DeliveryZoneInterface) => {
  const response = await axios.post('/api/delivery-zones', deliveryZone);
  return response.data;
};

export const updateDeliveryZoneById = async (id: string, deliveryZone: DeliveryZoneInterface) => {
  const response = await axios.put(`/api/delivery-zones/${id}`, deliveryZone);
  return response.data;
};

export const getDeliveryZoneById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/delivery-zones/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDeliveryZoneById = async (id: string) => {
  const response = await axios.delete(`/api/delivery-zones/${id}`);
  return response.data;
};
