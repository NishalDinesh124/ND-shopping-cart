export const host = process.env.REACT_APP_API_URL;

/// === USER ROUTE ===///
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const getItemsRoute = `${host}/api/auth/get-items`;
export const addToCartRoute = `${host}/api/auth/add-to-cart`;
export const getCartRoute = `${host}/api/auth/get-cart-items`;
export const updateCartRoute = `${host}/api/auth/update-cart`;
export const deleteCartRoute = `${host}/api/auth/delete-cart`;
export const placeOrderRoute = `${host}/api/auth/place-order`;
export const paymentRoute = `${host}/api/payment/create-order`;



/// ==== ADMIN ROUTES === ////
export const adminLoginRoute = `${host}/api/admin/login`;
export const addProductsRoute = `${host}/api/admin/add-products`;
export const getProductsRoute= `${host}/api/admin/get-products`;
export const getOrdersRoute = `${host}/api/admin/get-orders`;
export const getAllUsersRoute = `${host}/api/admin/get-users`;
export const deleteUserRoute = `${host}/api/admin/delete-user`;

