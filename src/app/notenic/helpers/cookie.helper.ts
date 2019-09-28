
export class CookieHelper {
  public static set(name: string, value: string, expires?: number | Date, domain?: string, secure?: boolean): void {

    let cookieString: string = encodeURIComponent( name ) + '=' + encodeURIComponent( value ) + ';';

    if ( expires ) {
      if ( typeof expires === 'number' ) {
        const dateExpires: Date = new Date( new Date().getTime() + expires * 1000 * 60 * 60 * 24 );

        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }

    if ( domain ) {
      cookieString += 'domain=' + domain + ';';
    }

    if ( secure ) {
      cookieString += 'secure;';
    }

    document.cookie = cookieString;
  }

  public static delete(name: string, domain?: string): void {
    this.set(name, '-1', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), domain);
  }
}
