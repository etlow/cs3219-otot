const quotes = {}

exports.quote = (req, res) => {
  if (req.url == '/') {
    if (req.method == 'GET') {
      res.json(listItems())
    } else if (req.method == 'POST') {
      res.json(addItem(req.body.item))
    }
  } else {
    const item = decodeURIComponent(req.url.slice(1))
    if (req.method == 'GET') {
      res.json(getQuotes(item))
    } else if (req.method == 'PUT') {
      if (req.body.remove) {
        res.json(removeQuote(item, req.body.company))
      } else {
        res.json(setQuote(item, req.body.company, req.body.price))
      }
    } else if (req.method == 'DELETE') {
      res.json(removeItem(item))
    }
  }
}

function listItems() {
  return { success: true, items: Object.keys(quotes) }
}

function addItem(item) {
  if (!item) {
    return { success: false, message: 'Item not provided' }
  } else if (quotes[item]) {
    return { success: false, message: 'Item already exists' }
  } else {
    quotes[item] = {}
    return { success: true }
  }
}

function getQuotes(item) {
  if (!quotes[item]) {
    return { success: false, message: `Item ${item} does not exist` }
  } else {
    return { success: true, quotes: quotes[item] }
  }
}

function setQuote(item, company, price) {
  if (!quotes[item]) {
    return { success: false, message: `Item ${item} does not exist` }
  } else if (!company) {
    return { success: false, message: 'Item not provided' }
  } else if (price === undefined) {
    return { success: false, message: 'Price not provided' }
  } else {
    quotes[item][company] = price
    return { success: true }
  }
}

function removeQuote(item, company) {
  if (!quotes[item]) {
    return { success: false, message: `Item ${item} does not exist` }
  } else if (!quotes[item][company]) {
    return { success: false, message: 'Company does not exist' }
  } else {
    delete quotes[item][company]
    return { success: true }
  }
}

function removeItem(item) {
  if (!quotes[item]) {
    return { success: false, message: `Item ${item} does not exist` }
  } else {
    delete quotes[item]
    return { success: true }
  }
}
