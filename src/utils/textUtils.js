import _ from 'lodash';
import URL from 'url';
export function getSourceNameFromUrl(url) {
  if (_.isEmpty(url)) {
    return null;
  }
  try {
    const urlObject = URL.parse(url);
    return urlObject.hostname + urlObject.pathname?.slice(0, 5) + '...';
  } catch (err) {
    console.log(err);
    return null;
  }
}
