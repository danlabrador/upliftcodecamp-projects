import RetryUtil from './RetryUtil.js';

class OpenAI {
  async getCompletion(prompt, userId, instructions = 'You are a helpful assistant.', model = 'gpt-3.5-turbo') {
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

    const temperature = 1.5;

    const user = `aurorabeats/spotify:${userId}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({ model, messages, temperature, user })
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
    return json.choices[0].text;
  }

}

export default OpenAI;