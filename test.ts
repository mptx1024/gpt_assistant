fetch('https://api.openai.com/v1/models/GPT-3.5-turbo', {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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',
    },
    method: 'GET',
})
    .then((res) => console.log(res))
    .catch((error) => console.log(error.message));
