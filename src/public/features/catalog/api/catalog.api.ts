import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const catalogAPI = {
  list: (params?: any) => http.get(ENDPOINTS.phones.base, { params }),
  getById: (id: string) => http.get(ENDPOINTS.phones.byId(id)),
  brands: (params?: any) => http.get(ENDPOINTS.brands.base, { params }),
};
