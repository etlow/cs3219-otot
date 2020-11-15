'use strict'

const url = 'https://cors-anywhere.herokuapp.com/https://us-central1-task-b06db.cloudfunctions.net/quote'

const e = React.createElement

class SubmitButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { submitted: false }
  }

  render() {
    return e(
      'button',
      { onClick: () => fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ item: document.querySelector('#item').value })
      }).then(() => this.setState({ submitted: true }))
      },
      this.state.submitted ? 'Submitted' : 'Submit'
    )
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }
  componentDidMount() {
    fetch(url).then(res => res.json()).then(res => this.setState({
      items: res.items,
      loaded: true
    }))
  }
  render() {
    if (!this.state.loaded) {
      return 'Loading...'
    } else {
      console.log(this.state.items)
      return e('ul',
        {},
        this.state.items.map(item => e('li', {}, item))
      )
    }
  }
}

const domContainer = document.querySelector('#container')
const buttonContainer = document.querySelector('#button-container')
ReactDOM.render(e(ItemList), domContainer)
ReactDOM.render(e(SubmitButton), buttonContainer)