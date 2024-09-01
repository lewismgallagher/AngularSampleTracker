// TODO add endpoints here instead of hard coded thoughout project
import { isDevMode } from '@angular/core';

const SERVER_BASE_URL_DEVELOPMENT = 'https://localhost:7200';
const SERVER_BASE_URL_PRODUCTION = '';

const BASE_ENDPOINTS = {
  GET_ALL_RACKS: 'Configuration/Racks',
  GET_RACK_BY_ID: 'Configuration/Racks/:id',
  CREATE_RACK: '',
  UPDATE_RACK: '',
  DELETE_RACK: '',
};

const DEVELOPMENT_ENDPOINTS = {
  GET_ALL_RACKS: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_ALL_RACKS}`,
  /**
   * Append /{id}. Example: \`${API_ENDPOINTS.GET_RACK_BY_ID}/1\`
   */
  GET_RACK_BY_ID: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_RACK_BY_ID}`,
  /**
   * Send the rack to create as an object of type rackdto in the HTTP body.
   */
  CREATE_RACK: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.CREATE_RACK}`,
  /**
   * Append /{id}. Example: \`${API_ENDPOINTS.UPDATE_RACK}/1\`.
   * Send the rack to update as an object of type rackdto in the HTTP body.
   */
  UPDATE_RACK: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.UPDATE_RACK}`,
  /**
   * Append /{id}. Example: \`${API_ENDPOINTS.DELETE_RACK}/1\`
   */
  DELETE_RACK: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.DELETE_RACK}`,
};

const PRODUCTION_ENDPOINTS = {
  GET_ALL_RACKS: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.GET_ALL_RACKS}`,
  GET_RACK_BY_ID: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.GET_RACK_BY_ID}`,
  CREATE_RACK: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.CREATE_RACK}`,
};

const ENDPOINTS_TO_EXPORT = isDevMode()
  ? DEVELOPMENT_ENDPOINTS
  : PRODUCTION_ENDPOINTS;

export default ENDPOINTS_TO_EXPORT;
