import axios from 'axios';
import _ from 'lodash';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export async function request({
  url,
  apiVersion,
  method = 'GET',
  data,
  isFormData,
  authRequired,
  ...rest,
}) {
  let token = (rest && rest.token) || null;
  let submitData = data;

  if (authRequired) {
    const res = await fetch('/api/v2/authentication/m1ZLlLmpp7iKDb2988Vv0aMsitKcUlarMrsirH8qGok')
    //const token = await res.json()

    if (!token) {
      // eslint-disable-next-line prefer-destructuring
      token = await res.json()
    }

    submitData = {
      //uid: (rest && rest.uid) || (user && user.uid),
      uid: (rest && rest.uid),
      ...data,
    };
  }

  if (isFormData) {
    const formData = new FormData();
    _.forEach(submitData, (value, key) => {
      if (key === 'uploadFiles') {
        _.forEach(value, v => {
          formData.append(key, v);
        });
      } else {
        formData.append(key, value);
      }
    });
    submitData = formData;
  }

  const response = await axios({
    baseURL: baseUrl,
    url,
    method,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
    data: submitData,
    ...rest,
  });

  return response && response.data;
}
