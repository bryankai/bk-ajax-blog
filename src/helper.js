function request(path, method = 'get', body = null) {
  return axios(`http://localhost:3000${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: body
  })
}

// function get
