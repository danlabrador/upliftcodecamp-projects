/**
 * OpenAI API class
 * 
 * @method getCompletion - Retrieves a completion from the OpenAI API
 *   @param {string} prompt - Prompt for the AI
 *   @param {string} userId - User ID
 *   @param {string} [instructions='You are a helpful assistant.'] - Instructions for the AI
 *   @param {string} [model='gpt-3.5-turbo'] - Model to use for the completion
 *   @returns {Object} - Completion object
 */

import RetryUtil from './RetryUtil.js';

class OpenAI {
  static async getCompletion({
    prompt,
    userId,
    instructions = 'You are a helpful assistant.',
    max_tokens = 256,
    model = 'gpt-3.5-turbo',
    temperature = 0.8,
    top_p = 1
  } = {}) {
    if (!prompt) throw new Error('Prompt is required.');

    const validModels = [
      'gpt-4',
      'gpt-4-turbo-preview',
      'gpt-4-vision-preview',
      'gpt-4-32k',
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-16k'
    ];

    const isModelValid = validModels.includes(model);
    if (!isModelValid) throw new Error('Invalid model.');

    const messages = [
      {
        role: 'system',
        content: instructions
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const user = `aurora_beats/${userId}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AURORA_BEATS_OPENAI_KEY}`
      },
      body: JSON.stringify({ messages, max_tokens, model, top_p, temperature, user })
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', options)

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.getCompletion(prompt), delay);
      }
    }

    const json = await response.json();
    return json;
  }

}

export default OpenAI;
