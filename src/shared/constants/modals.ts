// Modal keys - also used as the Redux store name; never hardcode the string elsewhere
export const MODAL = Object.freeze({
  // Auth / guest gate
  AUTH_REQUIRED: "auth:required",

  // Storefront / account
  CATALOG_FILTERS: "catalog:filters",
  PHONE_DELETE: "phone:delete",
  COMMENT_CREATE: "comment:create",
  PROFILE_EDIT: "profile:edit",
});
