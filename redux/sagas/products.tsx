import { productAction } from '../../store/products-slice';
import { productActions } from '../../store/product';
import { featuredProductsAction } from '../../store/featured-products-slice';

import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_FEATURED,
  GET_PRODUCT,
  FILTER_PRODUCT_BY_REGION
} from '../../types';
import {
  getProductsAPI,
  getProductsByFeaturedAPI,
  getProductAPI,
} from '../../apis/product';
import { put, takeEvery} from 'redux-saga/effects';
export function* getProducts(): any {
  try {
    yield put(productAction.setIsLoading(true));
    const response = yield getProductsAPI();
    yield put(productAction.setProducts(response.data));
    yield put(productAction.setIsLoading(false));
  } catch (error: any) {
    yield put(productAction.setError(error.response.data.error));
    yield put(productAction.setIsLoading(false));
  }
}
export function* getProduct(actions:any): any {
  try {
    yield put(productActions.setIsLoading(true));
    const response = yield getProductAPI(actions.id);
    yield put(productActions.setProduct(response.data));
    localStorage.setItem("productDetail",JSON.stringify(response.data.data.product))
    yield put(productActions.setIsLoading(false));
  } catch (error: any) {
    yield put(productActions.setError(error.response.data.error));
    yield put(productActions.setIsLoading(false));
  }
}
export function* getFeaturedProducts(actions: any): any {
  try {
    yield put(productAction.setIsLoading(true));
    const response = yield getProductsByFeaturedAPI(actions.featured);
    yield put(featuredProductsAction.setProducts(response.data));
    yield put(productAction.setIsLoading(false));
  } catch (error: any) {
    yield put(productAction.setError(error.response.data.error));
    yield put(productAction.setIsLoading(false));
  }
}
export function* watchProductsAsync() {
  yield takeEvery(GET_PRODUCTS, getProducts);
  yield takeEvery(GET_PRODUCT, getProduct);
  yield takeEvery(GET_PRODUCTS_BY_FEATURED, getFeaturedProducts);
}
