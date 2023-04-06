// this file allow us to add general structure of the page

import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Liyu market</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Liyu Market" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* // for add Portal */}
          <div id="backdrop--root" />
          <div id="modal--overlay--root" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
