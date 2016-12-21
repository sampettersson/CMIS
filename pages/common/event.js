const subscribers = {}

export const attach = (type, subscriber) => {
  let container = subscribers[type]

  if (!container) {
    container = subscribers[type] = []
  }

  container.push(subscriber)
}

export const dispatch = (type, payload) => {
  subscribers[type] && subscribers[type].forEach(subscriber => subscriber(payload))
}

export const detach = (type, subscriber) => {
  const index = subscribers[type].indexOf(subscriber)
  subscribers[type].splice(index, 1)
}
