import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
}
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { passwordOne } = this.state
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { passwordOne, passwordTwo, error } = this.state
    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''
    return (
      <div class="form">
        <div class="form-panel one ">
          <div class="form-content">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="passwordOne">Password One</label>
                <input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="New Password"
                />
              </div>
              <div class="form-group">
                <label for="passwordTwo">Password Two</label>
                <input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm New Password"
                />
              </div>
              <div class="form-group">
                <button id="disabl" disabled={isInvalid} type="submit">
                  Reset My Password
                </button>
                {error && <p>{error.message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withFirebase(PasswordChangeForm)
