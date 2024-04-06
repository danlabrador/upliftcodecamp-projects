/**
 * @class RetryUtil - Utility class for retrying a function after an error
 * 
 * @method retryAfterError - Retry a function after an error
 *   @param {number} retries - Number of retries
 *   @param {function} fn - Function to retry
 *   @param {number} delay - Delay between retries
 *   @returns {void}
 * 
 * @property {number} TOO_MANY_REQUESTS - HTTP status code for too many requests
 * @property {number} SERVICE_UNAVAILABLE - HTTP status code for service unavailable
 */
  
class RetryUtil {
  static TOO_MANY_REQUESTS = 429;
  static SERVICE_UNAVAILABLE = 503;

  static async retryAfterError(retries, fn, delay = 500) {
    try {
      return await fn();
    } catch (error) {
      if (retries > 1) {
        await new Promise(res => setTimeout(res, delay));
        return this.retryAfterError(retries - 1, fn, delay * 2);
      } else {
        throw error;
      }
    }
  }
}

export default RetryUtil;
