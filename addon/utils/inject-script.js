import { Promise } from 'rsvp';

export default async function injectScript(url, options = {}) {
  await new Promise((resolve) => {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('type', 'text/javascript');
    Object.entries(options).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });
    script.addEventListener('load', () => {
      resolve();
    });
    document.head.appendChild(script);
  });
}
