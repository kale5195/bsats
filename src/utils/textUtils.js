import URL from 'url';
import _ from 'lodash';

export function getSourceNameFromUrl(url) {
  if (_.isEmpty(url)) {
    return null;
  }
  try {
    const urlObject = URL.parse(url);
    return urlObject.hostname + urlObject.pathname;
  } catch (err) {
    console.log(err);
    return null;
  }
}
