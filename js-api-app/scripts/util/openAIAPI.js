import { OPENAI_KEY } from './apiKeys.js';

const OpenAI = {
  async getCompletion(prompt) {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 60
        })
      });

      if (!response.ok) throw new Error('Request failed.');

      const json = await response.json();

      return json.choices[0].text;

    } catch (e) {
      console.log(e);
    }
  }
}