import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1s',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});
export function fromNow(date) {
  return dayjs(date * 1000).fromNow();
}

export function fromNowUTC(date) {
  return dayjs(date).fromNow();
}
export function formatDate(date, lang = 'en') {
  if (lang != 'en') {
    return dayjs(date * 1000).format('YYYY-MM-DD');
  }
  return dayjs(date * 1000).format('MMM DD, YYYY');
}
