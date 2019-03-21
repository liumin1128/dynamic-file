function getTypeFromUrl(url) {
  const _type = /\.[^\.]+$/.exec(url)[0];
  if (_type === '.js') {
    return 'text/javascript';
  } if (_type === '.css') {
    return 'text/css';
  }
}

function formatFileList(arg) {
  let args0;
  if (typeof arg === 'string') {
    args0 = [ arg ];
  } else if (Array.isArray(arg)) {
    args0 = arg;
  } else {
    const error = { error: 'The dynamicFile parameter must be a string or an array' };
    throw error;
  }
  let args1;
  args1 = args0.map((i) => {
    let url;
    let type;
    if (typeof i === 'string') {
      url = i;
      type = getTypeFromUrl(url);
    } else if (Array.isArray(i)) {
      [ url ] = i;
      type = (i[1] && i[1].type) ? i[1].type : getTypeFromUrl(url);
    } else {
      const error = { error: 'The dynamicFile parameter must be a string or an array' };
      throw error;
    }

    return { url, type };
  });

  return args1;
}

function createElement({ type, url, ...other }) {
  switch (type) {
    case 'text/javascript': {
      const element = document.createElement('script');
      element.setAttribute('type', 'text/javascript');
      element.src = url;
      return element;
    }
    case 'text/css': {
      const element = document.createElement('link');
      element.href = url;
      element.setAttribute('rel', 'stylesheet');
      element.setAttribute('media', 'all');
      element.setAttribute('type', 'text/css');
      return element;
    }
    default: break;
  }
}

/* eslint-disable no-param-reassign */
const loadElement = element => new Promise((resolve) => {
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(element);
  if (element.readyState) {
    element.onreadystatechange = () => {
      if (element.readyState === 'loaded' || element.readyState === 'complete') {
        element.onreadystatechange = null;
        resolve();
      }
    };
  } else {
    element.onload = resolve;
  }
});

async function dynamicFile(file, options) {
  try {
    const list = formatFileList(file);
    const elementList = list.map(createElement);
    await Promise.all(elementList.map((i) => {
      return loadElement(i);
    }));
  } catch (error) {
    console.log(error);
  }
}


export default dynamicFile;
