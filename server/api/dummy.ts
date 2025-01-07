const setupTime = new Date().toISOString()

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method Not Allowed',
    })
  }

  // Read the request body
  const body = await readBody(event)

  // Validate that message exists in body
  if (!body.message) {
    throw createError({
      statusCode: 400,
      message: 'Message is required',
    })
  }

  // Return the message back to the user
  return {
    message: body.message,
    serverTime: setupTime,
    currentTime: new Date().toISOString(),
  }
})
